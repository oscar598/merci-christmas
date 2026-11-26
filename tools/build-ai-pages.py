#!/usr/bin/env python3
"""Build the HTML pages for the AI-readable layer from their Markdown sources.

Markdown is the source of truth and is published as-is next to the HTML, so people
and AI crawlers get the same content:

  ai-info.md                -> ai-info/index.html
  compare/<slug>.md         -> compare/<slug>/index.html
  (all compare/*.md)        -> compare/index.html   (hub)
  everything                -> sitemap.xml

Run from the repo root after editing any of those .md files:

  python3 tools/build-ai-pages.py

Standard library only. Prints a warning for every [CONFIRM] placeholder left in the
sources; fill those in before deploying.
"""
import html, re, sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://merci.cards"


def inline(s):
    s = html.escape(s, quote=False)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", s)
    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>', s)
    s = re.sub(r"(?<![\"=>])(https?://[^\s<]+[^\s<.,)])", r'<a href="\1">\1</a>', s)
    return s


def md_to_html(md):
    """Small Markdown subset: headings, paragraphs, lists, tables, comments."""
    lines = md.splitlines()
    out, meta, i = [], {}, 0
    while i < len(lines):
        ln = lines[i]
        st = ln.strip()
        if not st:
            i += 1; continue
        if st.startswith("<!--"):
            buf = [ln]
            while "-->" not in lines[i] and i + 1 < len(lines):
                i += 1; buf.append(lines[i])
            out.append("\n".join(buf)); i += 1; continue
        m = re.match(r"(Canonical URL|Last updated):\s*(.+)", st)
        if m:
            meta[m.group(1)] = m.group(2); i += 1; continue
        m = re.match(r"(#{1,3})\s+(.*)", st)
        if m:
            n = len(m.group(1)); out.append(f"<h{n}>{inline(m.group(2))}</h{n}>"); i += 1; continue
        if st.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")]); i += 1
            head, body = rows[0], [r for r in rows[1:] if not all(re.fullmatch(r":?-+:?", c) for c in r)]
            t = ["<div class=\"tbl\"><table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr></thead><tbody>"]
            for r in body:
                t.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
            out.append("".join(t) + "</tbody></table></div>"); continue
        if re.match(r"([-*]|\d+\.)\s", st):
            tag = "ol" if st[0].isdigit() else "ul"
            items = []
            while i < len(lines) and re.match(r"\s*([-*]|\d+\.)\s", lines[i]):
                items.append(re.sub(r"^\s*([-*]|\d+\.)\s+", "", lines[i])); i += 1
            out.append(f"<{tag}>" + "".join(f"<li>{inline(x)}</li>" for x in items) + f"</{tag}>"); continue
        buf = []
        while i < len(lines) and lines[i].strip() and not re.match(r"(#{1,3}\s|\||<!--|([-*]|\d+\.)\s)", lines[i].strip()):
            buf.append(lines[i].strip()); i += 1
        out.append("<p>" + "<br>".join(inline(b) for b in buf) + "</p>")
    return "\n".join(out), meta


def page(title, desc, body, meta, md_href, depth):
    up = "../" * depth
    updated = meta.get("Last updated", "")
    canon = meta.get("Canonical URL", "")
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#07060A">
  <title>{html.escape(title)} | merci.</title>
  <meta name="description" content="{html.escape(desc)}">
  {f'<link rel="canonical" href="{canon}">' if canon else ''}
  <link rel="alternate" type="text/markdown" href="{md_href}">
  <link rel="icon" href="{up}assets/img/icon.svg">
  <link rel="stylesheet" href="{up}assets/css/landing.css">
  <link rel="stylesheet" href="{up}assets/css/doc.css">
</head>
<body class="doc-page">
<nav class="nav wrap">
  <a class="brand" href="{up}" aria-label="merci. home"><img src="{up}assets/img/app-icon.png" alt=""><span>merci.</span></a>
  <div class="links"><a href="{up}">Christmas</a><a href="{up}thanksgiving/">Thanksgiving</a><a href="{up}compare/">Compare</a><a href="{up}ai-info/">About</a></div>
</nav>
<main class="doc wrap">
{f'<p class="doc-meta">Last updated {html.escape(updated)} · <a href="{md_href}">Markdown version</a></p>' if updated else ''}
{body}
</main>
<footer class="foot wrap">
  <a class="brand" href="{up}"><img src="{up}assets/img/app-icon.png" alt=""><span>merci.</span></a>
  <nav><a href="{up}">Christmas cards</a><a href="{up}thanksgiving/">Thanksgiving cards</a><a href="{up}compare/">Compare</a><a href="{up}ai-info/">About merci.</a></nav>
  <small>© 2026 merci.</small>
</footer>
</body>
</html>
"""


def first(pattern, md, default=""):
    m = re.search(pattern, md, re.M)
    return m.group(1).strip() if m else default


def plain(s):
    return re.sub(r"[*`]|\[([^\]]+)\]\([^)]+\)", lambda m: m.group(1) or "", s)


def build(src, dst, depth):
    md = src.read_text()
    body, meta = md_to_html(md)
    title = plain(first(r"^#\s+(.+)", md, src.stem))
    desc = plain(first(r"^\*\*Short answer:\*\*\s*(.+)", md) or first(r"^(?!#|<!--|Canonical|Last updated|\*\*)(\w.+)$", md))[:300]
    dst.parent.mkdir(parents=True, exist_ok=True)
    md_href = "../" * depth + str(src.relative_to(ROOT))
    dst.write_text(page(title, desc, body, meta, md_href, depth))
    return title, desc, meta


def main():
    built = []
    t, d, m = build(ROOT / "ai-info.md", ROOT / "ai-info" / "index.html", 1)
    built.append(("ai-info/", m))
    hub = []
    for src in sorted((ROOT / "compare").glob("*.md")):
        t, d, m = build(src, ROOT / "compare" / src.stem / "index.html", 2)
        hub.append((src.stem, t, d)); built.append((f"compare/{src.stem}/", m))

    hub_md = ROOT / "compare" / "_hub.md.tmp"
    lines = ["Canonical URL: https://merci.cards/compare/", f"Last updated: {date.today().isoformat()}", "",
             "# Compare digital Christmas card apps", "",
             "Side-by-side guides to sending holiday cards by iMessage, text and email. Published by merci.; each page says where other apps are the better pick.", ""]
    lines += [f"- [{t}]({s}/): {plain(d)}" for s, t, d in hub]
    hub_md.write_text("\n".join(lines))
    body, meta = md_to_html(hub_md.read_text())
    (ROOT / "compare" / "index.html").write_text(
        page("Compare digital Christmas card apps", "Guides comparing merci. with Paperless Post, Jacquie Lawson and other ecard apps.", body, meta, "../llms.txt", 1))
    hub_md.unlink()

    urls = ["", "thanksgiving/", "compare/", *[u for u, _ in built], "index.md", "thanksgiving.md", "ai-info.md", "llms.txt",
            *[f"compare/{s}.md" for s, _, _ in hub]]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"  <url><loc>{SITE}/{u}</loc></url>" for u in dict.fromkeys(urls)]
    (ROOT / "sitemap.xml").write_text("\n".join(sm + ["</urlset>", ""]))

    print(f"Built ai-info/, compare/ (+{len(hub)} pages) and sitemap.xml")
    todo = 0
    for f in [ROOT / "llms.txt", ROOT / "index.md", ROOT / "thanksgiving.md", ROOT / "ai-info.md", *sorted((ROOT / "compare").glob("*.md"))]:
        for n, ln in enumerate(f.read_text().splitlines(), 1):
            if "CONFIRM" in ln:
                todo += 1; print(f"  CONFIRM  {f.relative_to(ROOT)}:{n}  {ln.strip()[:110]}", file=sys.stderr)
    if todo:
        print(f"{todo} [CONFIRM] placeholder(s) left. Fill them in before deploying.", file=sys.stderr)


if __name__ == "__main__":
    main()
