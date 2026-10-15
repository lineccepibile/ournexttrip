# Two Worlds. One Escape.

A tiny, cinematic, fully static travel microsite: Mauritius vs Shenzhen, 1–5 December 2026.
React + Vite + TypeScript + Tailwind CSS + Motion + Lucide. Hosted free on GitHub Pages.

## Edit the content

| What | File |
| --- | --- |
| WhatsApp number, partner name, vote messages | `src/config.ts` |
| Destinations, stats, experiences, links, itinerary, comparison | `src/data/destinations.ts` |
| Photos (and backups) | `src/data/photos.ts` |
| Instagram Reels | `src/data/reels.ts` |

Your own photos and Reel thumbnails go in `public/photos/` and `public/reels/`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173/our-next-escape/
npm run build      # production build in dist/
```

## Publish free on GitHub Pages

1. Create an **empty public repository** on GitHub named `our-next-escape`. Don't add a README.
   (If you use a different name, change `base` in `vite.config.ts` to match.)
2. Push this folder:
   ```bash
   git remote add origin https://github.com/USERNAME/our-next-escape.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to go green (about 1 minute).
   If it ran before step 3 and failed, click **Re-run all jobs**.
5. Your site is live at `https://USERNAME.github.io/our-next-escape/`.

Every later push to `main` redeploys automatically.

## Privacy

- The site sends `noindex` meta tags and a `robots.txt` that disallows crawlers. The URL is still public to anyone who has it.
- Leave `whatsappNumber` empty to keep your phone number out of the public code. WhatsApp will then ask which chat to send the vote to.
- No analytics, cookies, backend or database. Votes are never recorded on a server.
