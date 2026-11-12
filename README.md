# Project Link

A beautiful, **100% static** Company Resource Hub. No server needed — open `index.html` directly in your browser or upload to any static hosting or VPS.

## How It Works (No Server / No Node.js Needed)

Data lives in `data.js` as a global JavaScript array. The browser loads it with a plain `<script src="./data.js">` tag — which **bypasses CORS restrictions entirely** and works everywhere:
- Directly via double-click (`file://`)
- Any VPS folder (`/var/www/html`)
- GitHub Pages, Netlify Drop, Cloudflare Pages, S3, etc.
- No `npm`, no `npx serve`, no backend of any kind

## Files to Upload / Serve

```
project-link/
├── index.html        ← Double-click to open, or upload to VPS
├── data.js           ← Edit this to add/remove your links
├── app.js            ← Renders cards, handles search & logo fallback
└── dist/
    └── output.css    ← Pre-compiled Tailwind CSS
```

> **To deploy:** Just upload those 4 files to your VPS `public_html` or web root. That's it!

## Editing Your Links

Open `data.js` in any text editor. Format:

```js
window.LINKS_DATA = [
  {
    "company": "Company Name",
    "logo": "https://logo.clearbit.com/company.com", // optional
    "links": [
      { "title": "Dashboard",  "url": "https://dashboard.example.com" },
      { "title": "Docs Wiki",  "url": "https://docs.example.com" }
    ]
  }
];
```

- **Logo**: Public image URL or `https://logo.clearbit.com/<domain>`. If empty or broken, an auto-colored initials avatar is shown automatically.
- Save `data.js` and reload your browser — changes appear immediately!

## Features

- 🃏 **Card grid** — one card per company with all its links
- 🔍 **Real-time search** — instant filter by company name or link title (debounced 150ms, press `Escape` to clear)
- 🖼️ **Logo with fallback** — pastel initials circle if logo fails to load
- 🖱️ **Hover-only animations** — smooth card lift + link slide on hover
- 📱 **Responsive** — 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- ⚡ **Zero build step to use** — compiled CSS is included

## Dev / Rebuilding CSS (Optional)

Only needed if you edit Tailwind utility classes in `index.html` or `app.js`:

```bash
npm install
npm run build   # compiles src/input.css -> dist/output.css
```
