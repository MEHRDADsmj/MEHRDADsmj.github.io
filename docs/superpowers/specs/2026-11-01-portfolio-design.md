# Portfolio Website Design — Mehrdad Jafari

**Date:** 2026-11-01  
**Status:** Approved — implemented on branch `portfolio-redesign`  
**Repo:** GitHub Pages site (`MEHRDADsmj.github.io`)  
**Disclosure:** User cleared public use of employer name **Smart X** and CV/resume metrics (35M+/day, ~50% cost cut, SMPP/provider layer, ~22M users, ~5s→300ms).

## Intent and why

Replace the current Mashup-template “Game Developer” portfolio with a resume-grade site that hiring managers can open from a CV and leave believing:

1. Mehrdad is a software engineer who handles **complex, scalable systems**.
2. He **adapts** — new protocols, stacks, and approaches — without losing quality.

The site is a professional artifact for job applications, not a personal blog or game showcase.

## Goals

- Single coherent first impression: backend / distributed systems engineer.
- One deep proof: the Smart X multi-channel notification subsystem.
- Secondary systems proof: loyalty/segmentation, performance wins, earlier high-concurrency backends — framed as systems work, not games.
- Clear contact path: email, LinkedIn, GitHub.
- Fast load on GitHub Pages; works on desktop and mobile.
- Distinctive, intentional visual design (graphite & teal) that still reads as serious engineering.

## Non-goals

- Blog, CMS, contact form backend, analytics productization.
- Multi-language site.
- Recreating every past game project page or screenshot gallery.
- Perfect pixel recreation of mockups; mockups define structure and tone, not CSS pixel parity.
- Publishing phone number or postal address (CV has them; public site should stay lean).

## Anti-goals (explicit failures)

Even if the site “works,” it fails if a hiring manager thinks:

- “He’s still thinking about games and doesn’t know his path.”
- “He’s inexperienced and tightly coupled to what he already knows.”

Design and copy must actively prevent those readings.

## Audience

Primary: technical hiring managers and engineers reviewing a resume link.  
Secondary: recruiters who skim for role fit and credibility signals (title, scale numbers, current employer domain).

## Content sources (authoritative)

Extracted in-session from uploaded PDFs (not committed to the repo):

- `Mehrdad_Jafari_-_Backend.pdf` — skills, Smart X / Lucid Dream / Medrick backend framing.
- `CV-Mehrdad_Jafari.pdf` — full history, education, projects (voice server, etc.).

Also: user statements (notification as best example; SMPP; flexibility; AI as speed/quality multiplier).

Existing live site is outdated (still “Game Developer,” stops at Medrick) — treat as legacy UI only.

**Canonical facts for build (from those PDFs):**

| Role | Employer | Dates |
|------|----------|-------|
| Software Engineer | Smart X | Aug 2025 – Present |
| Software Engineer | Lucid Dream Games | Aug 2024 – Aug 2025 |
| C#/.NET Developer (Multiplayer Games) | Medrick Games | Dec 2022 – Jul 2024 |

Education: B.Sc. **Computer Engineering**, University of Science and Culture (Sep 2019 – Jul 2023), cohort 1st / GPA 18.87/20. English: C1, IELTS Academic 8.0.

Photo: default **omit large personal photo from hero** (brand = name + systems claim).

**Success-criteria note:** “Resume link” means this site is the deeper dive *from* the CV — not that the site must host a PDF. Contact = email, LinkedIn, GitHub only unless later requested.

## Information architecture

**Single-page site** (one `index.html` plus CSS/JS). No game project subpages in primary nav. Existing `Pages/*.html` game pages may remain as orphan files or be removed in implementation — they must not be linked from the new homepage or nav (**builder call: remove from nav and homepage; prefer deleting or leaving unlinked orphans rather than featuring them**).

### Page structure (locked layout: case study first + quiet arc line)

1. **Sticky/minimal nav** — Name · Work (anchor) · Contact (anchor). No “Projects” game menu.
2. **Hero (first viewport)** — One composition:
   - Brand: **Mehrdad Jafari** (hero-level).
   - Role line: Software Engineer — backends & distributed systems (or equivalent).
   - One supporting sentence: complex/high-scale systems + adapts to new protocols/stacks/approaches.
   - Quiet arc line (not a section): e.g. real-time systems → multiplayer backends → SaaS at tens of millions of messages/day — phrased to show progression into systems/SaaS, not “game career.”
   - One CTA: jump to notification case study.
   - Atmosphere: graphite & teal gradient/pattern; **no** inset hero game art, **no** metric dashboard strip, **no** floating badges on media.
3. **Featured case study — Notification subsystem (Smart X)**  
   Problem → approach → outcome. Must include: multi-channel; ~35M+ messages/day; in-house approach cutting provider cost ~50%; extensible provider layer (incl. SMPP / new protocols); flexibility as design goal; AI used to accelerate delivery without quality loss. Architecture sketch optional if it clarifies (diagram as simple HTML/CSS/SVG, not a game screenshot).
4. **More systems work** — Short entries (not cards-as-decoration): loyalty & segmentation (~22M users, brokers/cache/jobs); critical API latency ~5s → ~300ms; Lucid Dream / voice-chat or multiplayer backend scale only as **systems** bullets. No Cafe Bazaar game store gallery.
5. **Experience** — Compact timeline. Smart X fullest; Lucid Dream systems-framed; Medrick and earlier as brief systems/concurrency evidence. Job titles may remain factual; copy emphasizes backends, networking, scale, mentoring — not “I make games.”
6. **Skills** — Grouped: backend, data, messaging/realtime, quality/DevOps. Drawn from backend resume. Avoid a giant unrelated game-engine laundry list as the visual center.
7. **Education** — One tight block: B.Sc. Computer Engineering, University of Science and Culture, top of cohort / GPA as on CV; English C1 / IELTS 8.0 optional one-liner.
8. **Contact** — Email `jafari.mehrdad.2001@gmail.com`, LinkedIn, GitHub. No Mashup Template footer credit as primary brand.

## Visual direction (locked)

- **Graphite & teal** (user preference + builder decision for hiring fit).
- Dark graphite base, muted teal accent, high contrast body text.
- No purple-indigo AI gradient theme; no warm cream + terracotta editorial cliché; no broadsheet hairline-newspaper layout; no neon glow stacks; no emoji.
- Expressive, purposeful fonts (not Inter/Roboto/Arial/system default stack as the whole identity). Pair a distinctive display/name treatment with a clean readable body face (builder chooses specific webfonts).
- Motion: 2–3 intentional motions (e.g. hero reveal, case study entrance, nav/CTA affordance) — presence, not noise.
- Cards: avoid decorative cards; use structured sections. Interactive containers only if needed.
- Photo: default omit from hero; if used at all, small and secondary in About/experience — never competing with the systems claim.

## Technical approach (builder defaults)

- Stay on **GitHub Pages**: static HTML + CSS (+ minimal JS). No React/build pipeline required unless it clearly helps; prefer simple maintainable static site replacing the Mashup template.
- Replace `index.html` and styling; drop dependency on `main.d8e0d294.css` / Mashup JS where possible.
- Semantic HTML, accessible contrast, responsive breakpoints.
- Meta title/description oriented to systems/backend engineer, not Game Developer.
- `.superpowers/` already gitignored for brainstorm artifacts.

## Copy principles

- Lead with present identity (Smart X / notifications), not origin story.
- Numbers with context (volume, latency, cost, coverage) beat adjectives.
- Adaptation shown through **evidence** (SMPP, provider abstraction, domain shift to SaaS), not slogans alone.
- AI mention: one clear, professional line — force multiplier for speed/quality, not “AI-built portfolio” vibe.
- Never center game titles, store badges, or gameplay screenshots on the homepage.

## Success criteria

- A stranger reading only the first viewport would not guess “game developer portfolio.”
- Notification case study is impossible to miss.
- Resume link feels like a credible deeper dive for backend/systems roles.
- Mobile readable; Lighthouse-level performance reasonable for a static page.

## Builder calls (content selection)

Settled without further user input unless they override:

- **Earlier roles on the page:** Smart X (full case study + bullets) → Lucid Dream (systems/backend bullets only) → Medrick (short concurrency/shipping evidence) → omit Free State and CyberSoul as sections (optional single timeline footnote at most). Voice server may appear as one systems side project under “More systems work,” not as a game demo.
- **Degree wording:** Computer Engineering (CV), not “Software Engineering” from the old site.
- **No resume PDF** on the site for v1.

## Left to the builder

- Exact CSS tokens, font pairing, spacing scale.
- Whether to delete vs orphan old `Pages/*` and unused game images.
- Exact wording polish within the locked positioning.
- Optional simple SVG architecture diagram for notifications.
- Favicon / apple-touch-icon refresh if needed.
- Whether a tiny “About” line is merged into hero vs separate micro-section.

## Disclosure (resolved)

User confirmed all of the above may appear on the public site as written in the CV/resume.

## Out of scope until asked

- Blog posts, downloadable PDF hosting automation, CMS, i18n, contact form API.
