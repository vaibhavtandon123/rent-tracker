# Rent Tracker

Rent and tenant manager for Lodhi Para, Om Shanti Bhawan and Hanumat Dera. Front end hosted on **Cloudflare Pages**; back end runs on **Google Apps Script** (data stays in Google Drive).

## How it fits together
- `index.html` — the whole app (served by Cloudflare Pages). The same file also works inside Apps Script.
- `functions/api.js` — Pages Function at `/api` that passes the app's calls to Apps Script. The Apps Script `/exec` link is the `APPS_SCRIPT_URL` environment variable in the Cloudflare Pages project (not in this repo).
- The Apps Script back end (`Code.gs`) is not kept in this public repo because it holds account details. Its `doPost` only allows the app's own functions.
- `favicon.svg`, `icon-*.png`, `apple-touch-icon.png`, `manifest.webmanifest` — app logo and home-screen icon.

## Updating
Push to `main` → Cloudflare Pages deploys the new front end automatically. No copy-paste.
Back-end changes (rare) are pasted into the Apps Script editor, then Deploy → Manage deployments → New version.
