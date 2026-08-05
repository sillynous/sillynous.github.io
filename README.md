# Personal academic website

Plain HTML and CSS — no build step, no dependencies. The only
JavaScript is `theme.js` (~1 KB), which powers the light/dark toggle
(the site is dark by default; without the script it is simply dark),
and `runner.js`, a decorative flourish described below.

## Files

- `index.html` — About / bio (the home page)
- `writing.html` — published work and work in progress
- `ancient-cynics.html` — a standalone essay page (linked from Writing),
  converted from a 2022 draft; footnotes are two-way links
- `teaching.html` — courses
- `miscellaneous.html` — the personal page
- `style.css` — all styling; colors are defined in the `:root` block at the top
  (the dark palette appears twice — media query and manual override — keep both in sync)
- `theme.js` — the light/dark toggle (choice remembered in localStorage),
  plus the scroll niceties: the header hides while you read and returns
  when you scroll up, and a back-to-top button appears on long pages
- `runner.js` — the "outfield philosopher": a pixel-art Greek philosopher who
  chases a fly ball across the bottom of the page, once per visit (clicking
  the green dot in the wordmark replays him; reduced-motion visitors get a
  quiet corner appearance instead). Purely decorative — to remove him, delete
  this file, its `<script>` line in each page, and the marked section plus
  `--spr-*` variables in `style.css`
- `fonts/` — self-hosted EB Garamond (regular + italic, ~92 KB total)
- `favicon.svg` — the browser-tab icon (a baseball, matching the footer)
- `sitemap.xml` / `robots.txt` — for search engines; add new pages to the
  sitemap when they're created

## Editing

Open any `.html` file in a text editor. Everything in `[square brackets]`
is placeholder text waiting for the real thing. To add a paper or course,
copy an existing `<article class="entry">` block and edit it.

The home-page photo is `photo.jpg`, a web-sized (480px, ~60 KB) copy of
the full-resolution original `TA.jpeg`. To change the photo, replace
`TA.jpeg` and regenerate the web copy with:

```bash
sips -Z 480 -s format jpeg -s formatOptions 82 TA.jpeg --out photo.jpg
```

The nav bar is repeated at the top of each page, so if you add a page,
add the link in all four files.

## Previewing locally

From this folder:

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000>. (Simply double-clicking `index.html`
also works.)

## Publishing

Any static host works, free:

- **GitHub Pages** — put this folder in a repo named `<username>.github.io`
- **Netlify / Cloudflare Pages** — drag-and-drop the folder in their dashboard

No build configuration needed anywhere; it's just files.
