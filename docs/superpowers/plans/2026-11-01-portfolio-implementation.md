# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Mashup “Game Developer” site with a single-page graphite-and-teal systems/backend portfolio centered on the Smart X notification case study.

**Architecture:** Static GitHub Pages site: one semantic `index.html`, one stylesheet, one small JS module for motion/nav. Content correctness is gated by Node `node:test` assertions against the built HTML (no React/build toolchain).

**Tech Stack:** HTML5, CSS (custom properties), vanilla JS, Node.js built-in `node:test` + `assert` for content/regression checks.

**Spec:** [docs/superpowers/specs/2026-11-01-portfolio-design.md](../specs/2026-11-01-portfolio-design.md)

## Global Constraints

- Positioning: backends & distributed systems; adaptation via evidence (SMPP, providers, SaaS scale) — never a game-developer first read.
- Anti-goals: must not read as path-undecided (games) or junior/stuck-in-known-stack.
- Layout: case study first + one quiet hero arc line; no metric dashboard in the hero; no large hero photo.
- Visual: graphite & teal; no purple-indigo theme, cream+terracotta, broadsheet, neon glow, or emoji.
- Typography: expressive webfonts — not Inter/Roboto/Arial/system as the whole identity.
- Contact only: `jafari.mehrdad.2001@gmail.com`, LinkedIn `https://www.linkedin.com/in/mehrdad-jafari-developer/`, GitHub `https://github.com/MEHRDADsmj` — no phone/address.
- No homepage links to `Pages/*` game pages; no Cafe Bazaar gallery; no Mashup footer as brand.
- Degree: Computer Engineering; roles/dates per spec table (Smart X Aug 2025–Present, Lucid Dream Aug 2024–Aug 2025, Medrick Dec 2022–Jul 2024).
- Disclosure cleared: Smart X name + 35M+/day, ~50% cost, SMPP, ~22M users, ~5s→300ms.
- Do **not** git commit unless the user explicitly asks (user rule overrides frequent-commit habit).
- Keep `.superpowers/` gitignored.

## Review Focus

- Homepage still contains “Game Developer” or primary game-project CTAs → stranger reads games path — Task 1 + Task 5 tests.
- Hero viewport includes metric strip, game art, or large photo → violates locked layout — Task 2 test.
- Case study omits SMPP / cost / volume / AI-quality line → adaptation + scale story weak — Task 3 test.
- Experience lists Free State/CyberSoul as featured sections or game-store deep links — Task 4 test.
- Viewport under ~400px width: horizontal overflow or unreadable hero — Task 5 manual + CSS smoke check.

## File structure

| File | Responsibility |
|------|----------------|
| `index.html` | Sole public page: nav, hero, case study, systems work, experience, skills, education, contact |
| `assets/css/portfolio.css` | Tokens, layout, responsive, motion keyframes |
| `assets/js/portfolio.js` | Nav affordance + 2–3 entrance motions |
| `tests/portfolio.test.mjs` | Content/anti-goal regression suite |
| Legacy `main.*.css/js`, `Pages/*`, game images | Unlinked; delete or leave orphan (Task 5 prefers delete unused page links; may delete `Pages/*` if unreferenced) |

---

### Task 1: Content contract tests + page shell + design tokens

**Files:**
- Create: `tests/portfolio.test.mjs`
- Create: `assets/css/portfolio.css`
- Create: `assets/js/portfolio.js` (empty export / stub `init()` ok)
- Modify: `index.html` (full replace of Mashup document)

**Interfaces:**
- Consumes: none
- Produces: `index.html` document with `#work`, `#case-study`, `#contact` anchors reserved; CSS variables `--bg`, `--bg-elevated`, `--text`, `--text-muted`, `--accent` (graphite/teal); `tests/portfolio.test.mjs` runnable via `node --test tests/portfolio.test.mjs`

- [ ] **Step 1: Write failing content contract tests**

In `tests/portfolio.test.mjs`, use `node:test` + `node:assert/strict` + `fs.readFileSync('index.html','utf8')`. Assert at least:

- `title` / meta description match `/backend|distributed|systems/i` and do **not** match `/Game Developer/i`
- Body does **not** match `/Game Developer/i`
- Body does **not** match `/Pages\/(mafia|pirate|herostrike|voxelcraft|shed)/`
- Body does **not** match `/mashup-template/i`
- Contains `Mehrdad Jafari`, `Smart X`, `35M`, `SMPP`, `jafari.mehrdad.2001@gmail.com`
- Contains `id="case-study"` and `id="contact"`

- [ ] **Step 2: Run tests — expect FAIL**

Run: `node --test tests/portfolio.test.mjs`  
Expected: FAIL (old Mashup index still present / missing strings)

- [ ] **Step 3: Replace `index.html` shell + wire CSS/JS**

Minimal valid page: `<!DOCTYPE html>`, lang=en, new meta title/description (systems/backend), link `assets/css/portfolio.css`, stub sections with the required ids and placeholder headings including the required strings above so tests can start passing once copy lands — prefer putting **real** required strings in placeholders now. Remove links to Mashup CSS/JS and game pages. Stub `assets/js/portfolio.js` with `export function init(){}` or IIFE `init` called on DOMContentLoaded. In `portfolio.css`, define graphite/teal tokens and base `body` styles (dark bg, light text, accent teal).

- [ ] **Step 4: Run tests — expect PASS for Task 1 assertions**

Run: `node --test tests/portfolio.test.mjs`  
Expected: PASS (extend tests in later tasks; keep these green)

---

### Task 2: Nav + hero (first viewport)

**Files:**
- Modify: `index.html` (header/nav + hero)
- Modify: `assets/css/portfolio.css`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: `#case-study`, `#contact`, `#work` from Task 1
- Produces: sticky/minimal nav (Name · Work · Contact); hero with brand name, role line, one supporting sentence, quiet arc line, one CTA linking to `#case-study`

- [ ] **Step 1: Extend failing/new tests for hero contract**

Add assertions:

- Nav contains anchors to `#work` and `#contact`
- Hero region (e.g. `<header>` or `[data-section="hero"]`) contains `Mehrdad Jafari` and `/backends|distributed systems/i`
- Hero contains quiet arc text matching `/→/` or explicit progression wording
- Hero CTA `href="#case-study"`
- Hero HTML does **not** include `<img` (no large photo)
- Entire `index.html` does **not** place three metric tiles as the first content block (no `/35M[\s\S]{0,80}22M[\s\S]{0,80}300ms/` inside the hero element — assert via extracting hero substring)

- [ ] **Step 2: Run tests — FAIL on new assertions if hero incomplete**

Run: `node --test tests/portfolio.test.mjs`

- [ ] **Step 3: Implement nav + hero markup and styles**

Copy locked to positioning: complex/high-scale + adapts to new protocols/stacks; arc like real-time → multiplayer backends → SaaS at tens of millions of messages/day. Graphite/teal atmosphere on hero full-bleed background. No game art.

- [ ] **Step 4: Run tests — PASS**

Run: `node --test tests/portfolio.test.mjs`

---

### Task 3: Notification case study

**Files:**
- Modify: `index.html` (`#case-study`)
- Modify: `assets/css/portfolio.css`
- Modify: `tests/portfolio.test.mjs`
- Optional: inline SVG in case study only

**Interfaces:**
- Consumes: `#case-study` target from Tasks 1–2
- Produces: Problem → approach → outcome write-up with required proof points

- [ ] **Step 1: Write/extend tests for case study facts**

Within `#case-study` (extract by id), assert presence of: `Smart X`, `35M`, `50%` or `50`, `SMPP`, multi-channel (or `multi-channel` / `multichannel`), provider/flexibility language, and AI mentioned with quality/speed framing (`/AI/i` near quality or speed). Structure: at least three subsections or labeled blocks (problem / approach / outcome — class or heading text).

- [ ] **Step 2: Run — FAIL if missing**

Run: `node --test tests/portfolio.test.mjs`

- [ ] **Step 3: Implement case study section**

Use cleared metrics; one professional AI line; optional simple SVG diagram. No decorative card grid as the main pattern.

- [ ] **Step 4: Run — PASS**

Run: `node --test tests/portfolio.test.mjs`

---

### Task 4: Systems work, experience, skills, education, contact

**Files:**
- Modify: `index.html` (`#work` and remaining sections)
- Modify: `assets/css/portfolio.css`
- Modify: `tests/portfolio.test.mjs`

**Interfaces:**
- Consumes: page shell + hero + case study
- Produces: complete single-page content per spec IA items 4–8

- [ ] **Step 1: Write tests for remaining content**

Assert:

- `22M` and `300ms` (or `5s`) appear under systems/work content
- Experience mentions `Smart X`, `Lucid Dream`, `Medrick` with systems-oriented surrounding text (e.g. concurrent / backend / latency / players-as-scale ok)
- Does **not** match `/Free State/` or `/CyberSoul/` as section headings (allow total absence)
- Skills area mentions `.NET` or `ASP` and `Redis` or `RabbitMQ`
- Education: `Computer Engineering`, `Science and Culture`, `18.87`
- Contact links: `mailto:jafari.mehrdad.2001@gmail.com`, LinkedIn URL above, GitHub URL above
- Optional: `voice` server one-liner allowed; must not be framed as a game demo gallery

- [ ] **Step 2: Run — FAIL until filled**

Run: `node --test tests/portfolio.test.mjs`

- [ ] **Step 3: Implement sections**

Smart X fullest; Lucid Dream systems bullets; Medrick short; omit Free State/CyberSoul sections; skills grouped; education tight; contact footer without Mashup credit.

- [ ] **Step 4: Run — PASS**

Run: `node --test tests/portfolio.test.mjs`

---

### Task 5: Motion, responsive polish, legacy cleanup

**Files:**
- Modify: `assets/js/portfolio.js`
- Modify: `assets/css/portfolio.css`
- Modify: `index.html` (script type/module as needed)
- Delete or orphan: `Pages/*.html`, unused Mashup `main.*` assets if unreferenced
- Modify: `tests/portfolio.test.mjs` (final anti-goal locks)

**Interfaces:**
- Consumes: finished DOM structure
- Produces: `init()` enabling ≥2 motions (hero reveal, case-study entrance, and/or CTA/nav affordance); no leftover homepage game/Mashup references; site openable as static files

- [ ] **Step 1: Final regression assertions**

Keep all prior tests; add: no `main.d8e0d294.css` / `main.bc58148c.js` references; no `assets/images/mafia` (etc.) on homepage.

- [ ] **Step 2: Run — FAIL if legacy refs remain**

Run: `node --test tests/portfolio.test.mjs`

- [ ] **Step 3: Implement motion + responsive + cleanup**

CSS: readable ≤400px width (stack nav, fluid type). JS: 2–3 intentional motions with `prefers-reduced-motion` respected. Remove unreferenced Mashup bundles and game page links; prefer deleting `Pages/*` if nothing links them.

- [ ] **Step 4: Verify**

Run: `node --test tests/portfolio.test.mjs` → PASS  
Manual: open `index.html` in browser (or live server), check first viewport reads systems-not-games, case study visible, mobile width ok.

---

## Self-review notes

- Spec IA 1–8 mapped to Tasks 2–4; visual/motion/tech cleanup → Task 5; anti-goals → tests in 1, 2, 5.
- No commit steps (user rule).
- Fonts/SVG/exact spacing left to builder within Global Constraints.
