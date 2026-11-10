# BibliotekaPlus — Privacy Policy Site

This is a small **public-facing Privacy Policy website** for the **BibliotekaPlus** (Ukrainian name: **Бібліотека+**) mobile app.

It is designed to be deployed on **Vercel** (including from a **private GitHub repo**) and used as the **Privacy Policy URL** in Google Play / App Store.

## Routes

- `/privacy` — privacy policy (UA + EN on one page)
- `/` — redirects to `/privacy`

Language:

- Ukrainian (default): `/privacy`
- English: `/privacy?lang=en`

## Local development

```bash
cd LibraryPlusPrivacy
npm install
npm run dev
```

Open `http://localhost:3000/privacy`.

## Environment variables (optional)

Set in Vercel (Project → Settings → Environment Variables) or locally via `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — canonical base URL (e.g. `https://privacy.bibliotekaplus.com`)
- `NEXT_PUBLIC_PRIVACY_EMAIL` — privacy contact email (default: `support@libraryplus.app`)
- `NEXT_PUBLIC_FROM_EMAIL` — service “from” email (default: `noreply@libraryplus.app`)

## Deploy to Vercel (monorepo)

1. Import the `LibraryPlus` repo into Vercel
2. In Vercel project setup set:
   - **Root Directory**: `LibraryPlusPrivacy`
   - Framework: Next.js (auto-detected)
3. Deploy

After deploy, use the production URL for Google Play, e.g.:

- `https://<your-project>.vercel.app/privacy`
