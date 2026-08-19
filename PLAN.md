# Turning Pages — Claude Code Execution Plan

You are building the production website for **Turning Pages**, a student-run education initiative in Cape Town. A finished single-file design prototype exists at `turning-pages-website.html` in the repo root. **It is the design source of truth — extend it, never redesign it.**

Execute tasks in order. Each task has acceptance criteria. Verify before moving on. Commit after each task with the message format `T<n>: <summary>`.

---

## Context (read once, don't re-litigate)

**The project:** Founded by Carys Morkel (18, final-year student, American International School of Cape Town). Three programme pillars:

1. **Paper supply** — collecting clean surplus paper from businesses (off-cuts, overruns, single-sided misprints, end-of-roll, office surplus) and delivering it to under-resourced schools. Currently: **Constantia Primary** (Grades 1–7). Goal: fortnightly collections.
2. **WorksheetCloud sponsorship** — funding WorksheetCloud subscriptions (~R400 per grade per year) for the Foundation Phase (Grades 1–3). The Dept of Education does not fund this; affluent schools self-fund it. It bridges school and homework: practice sheets plus memos so parents — many of whom couldn't finish school themselves — can check their children's work, and teachers can spot gaps. Carys used WorksheetCloud herself in primary school; this is personal.
3. **Arts & crafts from off-cuts** — creativity packs made from scrap paper (weaving, coasters, placemats, painting, drawing) to build hand-eye coordination. Working goal: **an activity book**.

**Long-term:** publish a school reader / arts-and-crafts book for underprivileged schools; register as an NPO; expand to schools in **Elsies River and Bonteheuwel**.

**For corporate donors (important for copy):** participating schools provide **Section 18A donation certificates**, and donations count toward **B-BBEE scorecard** ratings. This turns a goodwill ask into a business case — surface it prominently in the business-facing section.

**Audience:** businesses with surplus paper (especially print companies) + general public, weighted equally.
**Primary conversion:** email `carysmorkel@gmail.com`. No forms, payments, or backend in v1.
**Voice:** first person ("I") in the story section — it's Carys's voice, from her original outreach letter. Project voice ("we") elsewhere. Warm, direct, no NGO jargon.

**Hard constraints:**
- Static HTML/CSS/JS only. **No frameworks, no build step, no npm.** Post-handover maintainer is a non-developer.
- One page until there are ≥2 partner schools.
- Never include learner photos or school-internal details — no permission exists yet. Build photo slots with graceful text-only fallback.
- All CTAs resolve to the same mailto action.
- Mobile-first: most SA traffic is mobile. Test at 360px.

**Design tokens (already in the prototype — reuse, don't reinvent):**
```css
--paper:#FBFAF4; --paper-deep:#F3F1E6; --ink:#20242E; --ink-soft:#4A5060;
--rule-blue:#B9CFE8; --margin-red:#D95B4E; --school-blue:#2E5FA3;
--school-blue-deep:#1F4478; --line-gap:34px;
```
Fonts: Bricolage Grotesque (display), Instrument Sans (body).
Signature elements to preserve: ruled exercise-book background with red margin line (hero + contact card), hard offset shadows (`Npx Npx 0 <color>`, never blurred), mini-page logo mark, IntersectionObserver scroll reveals with `prefers-reduced-motion` respected.

---

## T1 — Restructure into a static site project

Split the prototype into:
```
/
├── index.html
├── css/style.css
├── js/main.js
├── assets/           (empty for now; fonts/ and img/ subdirs)
├── PLAN.md
└── README.md
```

**Accept when:**
- [ ] `index.html` renders identically to the prototype (visual diff by eye at 360/768/1440px).
- [ ] Zero inline `<style>`/`<script>` blocks remain except tiny critical bits if justified.
- [ ] README stub exists (fill properly in T8).

## T2 — Content expansion: three-pillar structure

The prototype covers only the paper pillar. Restructure the page to present all three pillars without breaking the existing design language.

**New page flow:**
1. Nav (update links to match new sections)
2. Hero — keep headline concept; lede should now hint at more than paper ("paper, worksheets and creativity to under-resourced classrooms")
3. Story (`#story`) — keep Carys's first-person text and pull-quote as-is; add one sentence bridging to WorksheetCloud ("Paper was only the beginning…")
4. **What we do (`#programmes`) — NEW, replaces/absorbs the current Impact section.** Three programme cards in the blue section style:
   - **Paper supply** — surplus paper collected fortnightly, delivered directly to classrooms for worksheets, assessments and daily lessons.
   - **WorksheetCloud sponsorship** — copy must include: ~R400/grade/year, Grades 1–3 Foundation Phase, not government-funded, memos let parents check homework even where parents' own schooling was cut short, helps teachers spot gaps. Include one first-person line from Carys ("WorksheetCloud helped me through primary school — every child deserves the same head start.")
   - **Creativity from off-cuts** — art supply packs from scrap paper: weaving, coasters, placemats, painting, drawing; building fine motor skills; working toward a Turning Pages activity book.
5. Impact strip — condense the original three impact points (aiding teachers / relieving families / sustaining education) into a compact band, keeping the framing around Constantia Primary Grades 1–7 at no cost to parents.
6. What we accept (`#accept`) — keep checklist; **extend the "For print businesses" call-out** with the business case: Section 18A donation certificates provided by participating schools + donations count toward B-BBEE scorecards. Keep it factual and brief — two sentences max, no tax advice.
7. How it works — keep 3 steps.
8. **The road ahead — NEW, small section.** Future plans as a short list in exercise-book style: expanding to schools in Elsies River and Bonteheuwel · publishing a school reader and arts-and-crafts activity book · registering as an NPO. Frame as ambitions, not promises.
9. Contact (`#contact`) — unchanged mechanics; broaden copy so it invites paper donations AND businesses interested in sponsoring WorksheetCloud subscriptions.
10. Footer.

**Accept when:**
- [ ] All three pillars present with the specified facts (R400/grade/year, Gr 1–3, 18A, B-BBEE, Elsies River, Bonteheuwel all appear).
- [ ] Carys's story section still reads in first person and her original quote is intact.
- [ ] No new colours/fonts introduced; new sections use existing tokens and patterns.
- [ ] Section 18A / B-BBEE copy is descriptive only ("participating schools provide Section 18A certificates") — no claims like "tax-deductible for you".

## T3 — Photo slots with graceful fallback

Add image placements that look complete when empty:
- Story section: one portrait slot (Carys / a collection run).
- Programmes section: one landscape slot per card OR a single strip beneath — your judgment.
- Implement as `<figure>` with a styled empty state (paper-texture placeholder using existing tokens, small caption "Photo coming soon"), swapped by simply dropping a file into `assets/img/` with a documented filename.

**Accept when:**
- [ ] Site looks intentional with zero images present.
- [ ] README documents exact filenames/dimensions to drop in.
- [ ] `loading="lazy"` + explicit width/height attributes to prevent layout shift.

## T4 — Favicon + social meta

- SVG favicon from the logo mark (white page, three ruled lines, red offset shadow) + 180px PNG apple-touch-icon.
- Open Graph + Twitter card tags. Generate `assets/img/og.png` (1200×630): exercise-book ruled background, red margin line, "Turning Pages" display type, one-line tagline. Build it with a small self-contained HTML file rendered via headless screenshot, or hand-write an SVG and convert — your choice, but commit the source.

**Accept when:**
- [ ] Favicon renders in-browser; OG tags validate (correct absolute URL placeholder noted in README for post-deploy).

## T5 — Accessibility pass

- Semantic landmarks (`header/nav/main/section/footer`), single `h1`, logical heading order.
- Skip-to-content link.
- Check `--ink-soft` (#4A5060) on `--paper-deep` (#F3F1E6) and on `--paper`; also `#CFDDF2` on `--school-blue`. Fix any AA failures for body text by darkening text, not changing backgrounds.
- Focus-visible styles already exist — verify on all interactive elements including nav pills.
- Emoji icons in cards: `aria-hidden="true"` with text carrying the meaning.

**Accept when:**
- [ ] Lighthouse a11y ≥ 95 mobile; keyboard-only walkthrough hits every link in a sane order.

## T6 — SEO + structured data

- JSON-LD: `Organization` (or `NGO`) — name Turning Pages, founder Carys Morkel, areaServed Cape Town, foundingDate 2026, email. Do NOT claim NPO/nonprofit legal status — it isn't registered yet; `Organization` type, description mentions "student-run community initiative".
- Canonical tag (placeholder domain, noted in README), `sitemap.xml`, `robots.txt`.
- Meta description ≤ 155 chars mentioning surplus paper, Cape Town schools, WorksheetCloud.

**Accept when:**
- [ ] JSON-LD passes validator; Lighthouse SEO ≥ 95.

## T7 — Performance

- Self-host both fonts: download woff2 subsets (latin), `font-display:swap`, preload the display face's main weight only.
- Remove Google Fonts `<link>`s entirely (no third-party requests at all).
- Inline critical above-the-fold CSS only if Lighthouse says render-blocking is a real problem — don't prematurely optimise a tiny site.

**Accept when:**
- [ ] Zero third-party network requests.
- [ ] Lighthouse mobile: Performance ≥ 95, all categories ≥ 95.

## T8 — README + handover docs

README must let a non-developer:
1. Edit copy (which file, find the section comments — add HTML comments like `<!-- SECTION: story -->` throughout index.html in this task).
2. Add photos (filenames from T3).
3. Update the future "collected so far" number (see T9 stub).
4. Deploy (T9 steps).

**Accept when:**
- [ ] A reader with zero dev experience could follow it. Short sentences, no jargon.

## T9 — Deploy scaffolding (do the prep; human does the click-ops)

- Target: **Cloudflare Pages** (free, fast SA edge, custom domain ready). Document exact steps: create Pages project → connect repo → no build command → output dir `/`.
- Document domain plan: check `turningpages.co.za` availability (fallback `turningpages.org.za`); DNS steps for Pages; Cloudflare Email Routing note for a future `hello@` address.
- Add Cloudflare Web Analytics snippet **commented out** with a README note to paste the token after signup (privacy-friendly, no cookie banner needed).
- Add a `collected-tally` stub: a single JS constant in `js/main.js` (`const KG_COLLECTED = null;`) — when set to a number, a small counter band appears between Story and Programmes with a count-up animation (reduced-motion: no animation). While `null`, the band doesn't render at all.

**Accept when:**
- [ ] Repo is deploy-ready with zero config; tally band verified in both states by toggling the constant.

## Out of scope for v1 — do not build
- Contact forms / form services (mailto is the launch decision).
- Per-school subpages, blog, CMS.
- Donation payment processing.
- Anything requiring a backend, database, or build pipeline.

## Final verification checklist (run before declaring done)
- [ ] Renders correctly at 360, 768, 1440px.
- [ ] All internal anchors work; mailto opens with subject "Paper donation — Turning Pages".
- [ ] `prefers-reduced-motion` disables reveals and count-up.
- [ ] No console errors/warnings.
- [ ] Lighthouse mobile ≥ 95 across all four categories.
- [ ] Grep check: "R400", "Section 18A", "B-BBEE", "Elsies River", "Bonteheuwel", "WorksheetCloud", "Constantia Primary" all present exactly once minimum.
- [ ] Grep check: no occurrence of "The Paper Project" (old working title).
