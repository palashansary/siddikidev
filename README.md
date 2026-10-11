# siddikiansary.web.app

Personal portfolio + blog with a built-in admin panel. React (Vite) + Tailwind, hosted on Firebase.

## How it works

| Piece | Where | Cost |
| --- | --- | --- |
| Site | Firebase Hosting | free (Spark) |
| Content, blog, contact messages | Firebase Realtime Database | free (Spark: 1 GB stored, 10 GB/month downloaded) |
| Admin login | Firebase Auth (Google) | free |
| Image / PDF uploads | Cloudinary free plan (default) or Firebase Storage (needs Blaze) | free |

- **Visitors never load the Firebase SDK.** Content is read with a plain `fetch` from the database's REST API.
- **The site never breaks.** It renders `src/config/siteContent.js` immediately, then swaps in database content when it arrives (cached in the browser for the next visit). If the database is down, slow (>5s), empty or returns junk, the static content stays. Each section and list item is validated on its own, so one bad entry can't take down a page.
- **Admin panel** at `/admin`: edit hero/about text, projects, skills (with live tile previews), resume PDF, social links, blog posts (markdown, drafts, image upload), read contact messages, export/import a JSON backup.

### Database layout

```
content/            site sections (public read, admin write)
posts/{slug}        published post metadata (public)
postBodies/{slug}   published post markdown (public)
drafts/{slug}       unpublished posts (admin only)
messages/{id}       contact form (anyone can create, admin reads)
adminSettings/      upload settings (admin only)
```

## One-time setup

1. **Database rules**: `npx firebase login`, then `npx firebase deploy --only database` (re-run whenever `database.rules.json` changes). The admin email is hard-coded in the rules.
2. **Google sign-in**: Firebase console → Authentication → **Get started** → Sign-in method → Google → Enable.
3. **Cloudinary (free)**: uploads use the unsigned preset `portfolio_admin_unsigned` (images + PDF only). To serve PDFs, enable Settings → Security → **Allow delivery of PDF and ZIP files**.
   The cloud name and preset are stored in the database at `adminSettings/upload` (admin-only), so they never appear in this repo or the public bundle. Edit them in Admin → Settings.
   **Never commit the Cloudinary API secret or put it in a `VITE_` variable**; the site doesn't need it.

*Firebase Storage instead of Cloudinary:* upgrade to Blaze, add `"storage": { "rules": "storage.rules" }` to `firebase.json`, run `npx firebase deploy --only storage`, and pick "Firebase Storage" in Admin → Settings.

## Development

```bash
npm install
npm run dev      # admin works locally too: /__/firebase/init.json is proxied to the live site
npm run lint
npm run build
```

Optional overrides live in `.env.development.local` (see `.env.example`); all `.env*` files are git-ignored. Set `VITE_REMOTE_CONTENT=false` to preview only the static config.

Pushes to `main` deploy Hosting via GitHub Actions. Database rules are deployed manually (step 1).

## Keeping the fallback in sync

After big content changes: Admin → Settings & data → **Export JSON**, and paste it over the `siteContent` object in `src/config/siteContent.js`. First-time visitors then see current content even before the database responds.
