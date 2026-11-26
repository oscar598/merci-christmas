// Where the page's buttons go. Fill these in before you deploy.
export const LINKS = {
  // The merci. web app (the editor). Example: 'https://app.merci.cards/'
  webApp: 'http://localhost:5173/',
  // App Store listing, or the app's /get page until the listing is live.
  getApp: 'http://localhost:5173/get',
};

// Early-access signups on the Christmas page. Any endpoint that accepts a JSON POST
// of { email, source } works (Formspree, Supabase edge function, your own server...).
// Leave empty and the form is hidden; the page shows the "Get the app" button instead.
export const SIGNUP_ENDPOINT = '';
