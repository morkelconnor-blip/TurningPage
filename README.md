# Turning Page — website

This is the website for **Turning Page**, a student-run education initiative in Cape Town.

It is a simple website: no installations, no build tools, no coding software needed. Every change is made by editing a text file and saving it.

---

## The files

| File | What it is |
|---|---|
| `index.html` | The whole page — all the words live here |
| `css/style.css` | Colours, fonts and layout (rarely needs touching) |
| `js/main.js` | Small animations + the "collected so far" counter |
| `assets/img/` | Pictures (photos, favicon, sharing image) |
| `assets/fonts/` | The two fonts the site uses (leave alone) |

---

## 1. How to change the words on the page

1. Open `index.html` in any text editor (TextEdit, Notepad, VS Code).
2. Every part of the page is marked with a comment like this:
   `<!-- SECTION: story -->`
   Search for the section you want: `nav`, `hero`, `story`, `programmes`, `impact strip`, `accept`, `how it works`, `road ahead`, `contact`, `footer`.
3. Change only the text between tags. For example, in
   `<p>Email us with roughly what you have.</p>`
   change the words, but keep the `<p>` and `</p>`.
4. Save the file. Refresh the page in your browser to check it.

**Tip:** don't delete anything that starts with `<` unless you're sure. If something breaks, undo (Cmd+Z) and save again.

## 2. How to add photos

Photos are optional — the site looks complete without them. To add one, just drop a file into `assets/img/` with **exactly** this name:

| Where it appears | Filename | Best size |
|---|---|---|
| Our story section (portrait) | `assets/img/story.jpg` | 800 × 1000 pixels |
| Under the three programme cards (wide) | `assets/img/programmes.jpg` | 1600 × 640 pixels |

That's it — no code changes. The "Photo coming soon" placeholder disappears automatically once the file is there.

**Important:** never use photos of learners or anything showing school-internal details without written permission.

*(Small technical note: while a photo file is missing, the browser's developer console logs a "404 not found" line for it. This is expected and harmless — visitors never see it.)*

## 3. How to update the "collected so far" counter

1. Open `js/main.js`.
2. Near the top, find:
   ```js
   const KG_COLLECTED = null;
   ```
3. Replace `null` with the number of kilograms collected, e.g.
   ```js
   const KG_COLLECTED = 250;
   ```
4. Save. A counter band now appears between the Story and What-we-do sections. Set it back to `null` to hide the band again.

## 4. How to put the site online (Cloudflare Pages)

The site is designed for **Cloudflare Pages** — free, fast in South Africa, and works with a custom domain.

1. Push this folder to a GitHub repository (or ask someone to help do this once).
2. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com) (free).
3. Click **Create a project → Connect to Git** and pick the repository.
4. Settings:
   - **Build command:** leave empty (there is none)
   - **Build output directory:** `/`
5. Click **Deploy**. The site goes live at `<project-name>.pages.dev` within a minute. Every time you push a change to GitHub, the site updates itself.

### Custom domain

1. Check if `turningpage.co.za` is available (any .za registrar, e.g. domains.co.za). Fallback: `turningpage.org.za`.
2. Add the domain to Cloudflare (free plan), then in your Pages project go to **Custom domains → Set up a custom domain** and follow the prompts — Cloudflare fills in the DNS records for you.
3. Later, Cloudflare **Email Routing** (free) can forward a `hello@turningpage.co.za` address to the Gmail inbox — set it up under Email → Email Routing.

### After the site is live — one small find-and-replace

`index.html`, `robots.txt` and `sitemap.xml` contain the placeholder address `https://turningpage.co.za`. Once the real domain is confirmed, find-and-replace it with the live address in those three files.

### Visitor stats (optional)

The bottom of `index.html` has a commented-out **Cloudflare Web Analytics** snippet (privacy-friendly, no cookie banner needed). After signing up in the Cloudflare dashboard (Analytics → Web Analytics), copy your token into the snippet and remove the `<!--` and `-->` around it.

---

## Rebuilding the sharing/icon images (rarely needed)

- `assets/img/og.png` (the picture shown when the site is shared on WhatsApp/social media) is a screenshot of `assets/img/og-source.html` at 1200 × 630.
- `assets/img/apple-touch-icon.png` is a screenshot of `assets/img/icon-source.html` at 180 × 180.

If the tagline ever changes, edit the source file and re-screenshot it (any developer can do this in a minute with a headless browser).
