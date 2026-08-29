# Chen Wang Lab Website Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder Astro page with a six-route, content-driven Chen Wang Lab website that migrates the UMass material, announces the University of Toronto launch, highlights recent research, and deploys cleanly through GitHub Pages.

**Architecture:** Astro statically generates all pages from focused data modules and schema-validated Markdown collections. Shared layout and presentation components own navigation, metadata, page framing, and the selected Frontier dark visual system; content files remain the editing surface for future paper and group updates.

**Tech Stack:** Astro 6+, TypeScript where Astro requires it, JavaScript data modules, Markdown content collections, CSS, Node's built-in test runner, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-29-lab-website-modernization-design.md`

## Global Constraints

- Keep `site: 'https://sqctoronto.github.io'` and `base: '/lab-website'` in `astro.config.mjs`.
- The public URL remains `https://sqctoronto.github.io/lab-website/`.
- Use the six approved routes: Home, Research, People, Publications, News, and Join.
- Use the four approved research themes and their exact public-facing title/summary pairs from the spec.
- Carry the current UMass roster forward as active members; preserve former members as alumni.
- Use authentic migrated figures, portraits, and group photographs; do not use generic stock imagery or permanent UMass hotlinks.
- Use graphite, white, teal, and restrained coral; use dark surfaces selectively and white for reading-heavy sections.
- Use normal letter spacing and stable responsive dimensions; do not use viewport-width font scaling.
- Keep the site static: no CMS, database, login, analytics dashboard, client-side framework, or publication search.
- All internal links and asset URLs must work under Astro's `/lab-website` base path.
- Run each task's failing test before implementing that task, then rerun the full test and build suite before committing.

## File Map

- `src/content.config.ts`: schemas and loaders for `news` entries.
- `src/data/news/*.md`: future-friendly paper and lab-update content files.
- `src/data/research.mjs`: four research themes and selected project highlights.
- `src/data/people.mjs`: PI, active members, undergraduates, and alumni.
- `src/data/publications.mjs`: complete publication list grouped by year.
- `src/lib/paths.mjs`: one `withBase(path)` helper for GitHub Pages-safe internal and asset URLs.
- `src/layouts/BaseLayout.astro`: document metadata and shared page frame.
- `src/components/SiteHeader.astro`, `SiteFooter.astro`: global navigation and affiliation/contact framing.
- `src/components/ResearchTheme.astro`, `NewsCard.astro`, `PersonEntry.astro`, `PublicationList.astro`, `PageIntro.astro`: focused reusable views.
- `src/styles/global.css`: visual tokens, layout primitives, typography, responsive behavior, and interaction states.
- `src/pages/index.astro`, `research.astro`, `people.astro`, `publications.astro`, `news.astro`, `join.astro`: six static routes.
- `public/images/`: locally owned copies of the selected UMass figures, portraits, and group photographs.
- `tests/content.test.mjs`: content completeness and approved-copy checks.
- `tests/routes.test.mjs`: built-route, navigation, and key-copy checks.
- `tests/links.test.mjs`: internal-link and local-asset checks against `dist/`.

---

### Task 1: Content Contracts and Source Material

**Files:**
- Modify: `package.json`
- Create: `src/content.config.ts`
- Create: `src/data/research.mjs`
- Create: `src/data/people.mjs`
- Create: `src/data/publications.mjs`
- Create: `src/data/news/2026-toronto-launch.md`
- Create: `src/data/news/2026-passive-qec-breakeven.md`
- Create: `src/data/news/2026-fluxonium-relaxation.md`
- Create: `src/data/news/2026-erasure-qutrits.md`
- Create: `tests/content.test.mjs`

**Interfaces:**
- Produces: `researchThemes: ResearchTheme[]`, `people: Person[]`, `publications: Publication[]`, and Astro collection `news`.
- `ResearchTheme`: `{ id, title, summary, eyebrow, image, projects }`.
- `Person`: `{ id, name, role, group, image?, detail?, destination? }`.
- `Publication`: `{ year, authors, title, venue, url? }`.
- `news` frontmatter: `{ title, date, category, summary, image?, imageAlt?, externalUrl? }`.

- [ ] **Step 1: Add the failing content contract test**

```js
// tests/content.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { researchThemes } from '../src/data/research.mjs';
import { people } from '../src/data/people.mjs';
import { publications } from '../src/data/publications.mjs';

test('publishes the four approved research themes', () => {
  assert.deepEqual(researchThemes.map(({ title }) => title), [
    'Autonomous Quantum Protection',
    'Decoherence in New Regimes',
    'Hardware-Efficient Quantum Error Correction',
    'Directional Open-System Dynamics',
  ]);
});

test('carries the current roster forward', () => {
  for (const name of ['Chen Wang', 'Yingying Wang', 'Sean van Geldern', 'Shruti Shirol', 'Tanvir Masum', 'Hanzhe Xi', 'Zetong Zhuang', 'Manthan Badbaria', 'Baojie Liu']) {
    assert.ok(people.some((person) => person.name === name && person.group !== 'alumni'), name);
  }
});

test('includes the complete migrated publication eras', () => {
  for (const year of [2026, 2025, 2024, 2023, 2022, 2021, 2019, 2018, 2016]) {
    assert.ok(publications.some((publication) => publication.year === year), String(year));
  }
});
```

- [ ] **Step 2: Add `"test": "node --test tests/*.test.mjs"` to `package.json`, create temporary empty exports, and run the test**

Run: `npm test`

Expected: FAIL because the approved themes, roster, and publication years are absent.

- [ ] **Step 3: Populate the data modules and news entries**

Use the exact four theme descriptions from the spec. Migrate the full UMass people roster and publication list, retaining published citation URLs. Write 70-110 word accessible summaries for the three 2026 research highlights from the verified APS, Nature Communications, and arXiv source material. Add the Toronto launch as a `move` category entry.

- [ ] **Step 4: Define and validate the news collection**

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['paper', 'move', 'group', 'award', 'people']),
    summary: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    externalUrl: z.string().url().optional(),
  }).refine((entry) => entry.category !== 'paper' || Boolean(entry.image && entry.imageAlt && entry.externalUrl), {
    message: 'Paper highlights require image, imageAlt, and externalUrl',
  }),
});

export const collections = { news };
```

- [ ] **Step 5: Run the content tests and Astro sync/build**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS with all collection entries accepted by the schema.

- [ ] **Step 6: Commit**

```bash
git add package.json src/content.config.ts src/data tests/content.test.mjs
git commit -m "feat: add lab website content model"
```

### Task 2: Migrated Scientific and People Imagery

**Files:**
- Modify: `tests/content.test.mjs`
- Create: `public/images/research/*`
- Create: `public/images/people/*`
- Create: `public/images/group/*`

**Interfaces:**
- Consumes: image paths declared by `researchThemes`, `people`, and news frontmatter.
- Produces: local image files under `/images/` with stable descriptive names.

- [ ] **Step 1: Add a failing local-asset test**

```js
import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

test('all declared images are stored locally', async () => {
  const paths = [
    ...researchThemes.map(({ image }) => image),
    ...people.flatMap(({ image }) => image ? [image] : []),
  ];
  for (const image of paths) {
    assert.match(image, /^\/images\//);
    await access(fileURLToPath(new URL(`../public${image}`, import.meta.url)));
  }
});
```

- [ ] **Step 2: Run the test and verify the images are missing**

Run: `npm test -- --test-name-pattern="stored locally"`

Expected: FAIL with `ENOENT` for the first declared image.

- [ ] **Step 3: Download the selected original-resolution UMass assets**

Migrate the Chen Wang headshot; available current-member portraits; a recent group photograph; and full-resolution research figures for pair-coherent states, autonomous QEC, fluxonium/decoherence, and nonreciprocity. Use descriptive filenames such as `public/images/research/passive-qec-wigner.png`; do not preserve WordPress thumbnail suffixes when an original is available.

- [ ] **Step 4: Verify image dimensions and optimize only when lossless/reasonable**

Reject zero-byte downloads and avoid enlarging low-resolution figures. Keep JPEG photographs at useful source resolution and PNG diagrams sharp.

- [ ] **Step 5: Run the complete content test**

Run: `npm test`

Expected: PASS with every declared local asset present.

- [ ] **Step 6: Commit**

```bash
git add public/images tests/content.test.mjs
git commit -m "feat: migrate lab imagery"
```

### Task 3: Shared Page Frame and Frontier Dark System

**Files:**
- Create: `src/lib/paths.mjs`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/PageIntro.astro`
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro`
- Create: `tests/routes.test.mjs`

**Interfaces:**
- Produces: `withBase(path: string): string`; layout props `{ title, description, theme? }`; navigation shared by every page.
- Consumes: `import.meta.env.BASE_URL` and public University of Toronto contact/affiliation details.

- [ ] **Step 1: Write the failing home-shell test**

```js
// tests/routes.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('home build includes the shared identity and six base-safe destinations', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  assert.match(html, /Wang Lab/);
  for (const route of ['research', 'people', 'publications', 'news', 'join']) {
    assert.match(html, new RegExp(`href="/lab-website/${route}/?"`));
  }
});
```

- [ ] **Step 2: Build and run the route test**

Run: `npm run build && npm test -- --test-name-pattern="shared identity"`

Expected: FAIL because the placeholder home does not include the shared navigation.

- [ ] **Step 3: Implement the base-path helper and shared layout**

```js
// src/lib/paths.mjs
const base = import.meta.env?.BASE_URL ?? '/lab-website/';
export function withBase(path = '/') {
  const clean = path.replace(/^\/+/, '');
  return clean ? `${base}${clean}`.replace(/\/{2,}/g, '/') : base;
}
```

Build the header with desktop links and a semantic `<details>` mobile menu. Build the footer with University of Toronto Physics, CQIQC, `chen.wang@utoronto.ca`, MP1023B, and the public department link.

- [ ] **Step 4: Implement the visual tokens and responsive primitives**

Define graphite, surface white, teal, coral, border, and muted-text custom properties. Keep navigation controls at stable dimensions, cards at no more than 6px radius, headings container-scaled rather than viewport-scaled, and focus states visible on every dark/light surface.

- [ ] **Step 5: Replace the placeholder home with the shared frame and rerun**

Run: `npm run build && npm test`

Expected: PASS for content and shared identity tests.

- [ ] **Step 6: Commit**

```bash
git add src/lib src/layouts src/components src/styles src/pages/index.astro tests/routes.test.mjs
git commit -m "feat: add shared lab site frame"
```

### Task 4: Home and Research Experiences

**Files:**
- Create: `src/components/ResearchTheme.astro`
- Create: `src/components/NewsCard.astro`
- Modify: `src/pages/index.astro`
- Create: `src/pages/research.astro`
- Modify: `tests/routes.test.mjs`

**Interfaces:**
- Consumes: `researchThemes`, `getCollection('news')`, `withBase()`.
- Produces: home at `/`; research at `/research/`; `ResearchTheme` and `NewsCard` views reusable by other pages.

- [ ] **Step 1: Write failing home/research content tests**

```js
for (const [file, required] of [
  ['dist/index.html', ['Launching in Toronto', 'Autonomous Quantum Protection', 'Passive Quantum Error Correction']],
  ['dist/research/index.html', ['Decoherence in New Regimes', 'Hardware-Efficient Quantum Error Correction', 'Directional Open-System Dynamics']],
]) {
  test(`${file} contains its approved content`, async () => {
    const html = await readFile(file, 'utf8');
    for (const text of required) assert.match(html, new RegExp(text));
  });
}
```

- [ ] **Step 2: Run build/tests and observe the missing research route**

Run: `npm run build && npm test -- --test-name-pattern="approved content"`

Expected: FAIL because `dist/research/index.html` is absent and the home content is incomplete.

- [ ] **Step 3: Build the full homepage**

Create an unframed dark hero with the lab name as the first-viewport identity, experimental research statement, authentic figure imagery, and a visible hint of the Toronto transition band. Follow with four themes, three recent 2026 highlights, and a group/history band.

- [ ] **Step 4: Build the research page**

Give each theme a distinct full-width section with one-sentence overview, selected legacy/new project text, an authentic figure, and relevant publication links. Avoid claims beyond the migrated and verified source material.

- [ ] **Step 5: Run tests and build**

Run: `npm run build && npm test`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ResearchTheme.astro src/components/NewsCard.astro src/pages/index.astro src/pages/research.astro tests/routes.test.mjs
git commit -m "feat: build home and research pages"
```

### Task 5: People and Publications

**Files:**
- Create: `src/components/PersonEntry.astro`
- Create: `src/components/PublicationList.astro`
- Create: `src/pages/people.astro`
- Create: `src/pages/publications.astro`
- Modify: `tests/routes.test.mjs`

**Interfaces:**
- Consumes: `people`, `publications`, `withBase()`.
- Produces: people at `/people/`; publications at `/publications/`.

- [ ] **Step 1: Write failing people/publications tests**

```js
test('people page carries the active roster and alumni', async () => {
  const html = await readFile('dist/people/index.html', 'utf8');
  for (const name of ['Chen Wang', 'Yingying Wang', 'Baojie Liu', 'Jeffrey Gertler']) assert.match(html, new RegExp(name));
});

test('publications page preserves recent and landmark work', async () => {
  const html = await readFile('dist/publications/index.html', 'utf8');
  for (const title of ['Hardware-Efficient Erasure Qubits', 'Passive Quantum Error Correction', 'A Schrodinger cat living in two boxes']) assert.match(html, new RegExp(title));
});
```

- [ ] **Step 2: Run build/tests and verify both routes are missing**

Run: `npm run build && npm test -- --test-name-pattern="people page|publications page"`

Expected: FAIL with missing `dist/people/index.html` and `dist/publications/index.html`.

- [ ] **Step 3: Implement the people page**

Use an unframed PI introduction, compact portrait grid for current members, deliberate initials treatment when no portrait exists, alumni grouped by role, and a horizontal group-history gallery. Do not invent biographies for members whose source page contains only names.

- [ ] **Step 4: Implement the publications page**

Group records by descending year with readable citations and linked venues. Keep the full selected pre-2016 section and distinguish the 2026 preprint from peer-reviewed papers.

- [ ] **Step 5: Run tests and build**

Run: `npm run build && npm test`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/PersonEntry.astro src/components/PublicationList.astro src/pages/people.astro src/pages/publications.astro tests/routes.test.mjs
git commit -m "feat: add people and publications pages"
```

### Task 6: News and Toronto Recruitment

**Files:**
- Create: `src/pages/news.astro`
- Create: `src/pages/join.astro`
- Modify: `tests/routes.test.mjs`

**Interfaces:**
- Consumes: `getCollection('news')`, `NewsCard`, `withBase()`.
- Produces: news at `/news/`; join at `/join/`.

- [ ] **Step 1: Write failing route-content tests**

```js
test('news page leads with the 2026 move and recent work', async () => {
  const html = await readFile('dist/news/index.html', 'utf8');
  for (const text of ['University of Toronto', 'Passive Quantum Error Correction', 'Hardware-Efficient Erasure Qubits']) assert.match(html, new RegExp(text));
});

test('join page points applicants to Toronto', async () => {
  const html = await readFile('dist/join/index.html', 'utf8');
  assert.match(html, /postdoctoral/i);
  assert.match(html, /graduate/i);
  assert.match(html, /physics\.utoronto\.ca/);
  assert.doesNotMatch(html, /apply.*UMass/i);
});
```

- [ ] **Step 2: Run build/tests and verify both routes are missing**

Run: `npm run build && npm test -- --test-name-pattern="news page|join page"`

Expected: FAIL with missing route output.

- [ ] **Step 3: Implement the news page**

Sort entries by descending date, show category/date metadata, give paper highlights an image, and allow text-led move/group entries. Keep the feed useful with only a few updates per year.

- [ ] **Step 4: Implement the join page**

Publish the verified Toronto transition, open postdoctoral research direction, graduate training breadth, undergraduate opportunities, CQIQC link, and University of Toronto graduate admissions link. Use U of T contact information and remove UMass application directions.

- [ ] **Step 5: Run tests and build**

Run: `npm run build && npm test`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/news.astro src/pages/join.astro tests/routes.test.mjs
git commit -m "feat: add news and Toronto recruitment pages"
```

### Task 7: Link Integrity, Responsive QA, and Deployment

**Files:**
- Create: `tests/links.test.mjs`
- Modify: `src/styles/global.css`
- Modify: `.github/workflows/deploy.yml` only if the verified runtime requires it
- Create: `package-lock.json`

**Interfaces:**
- Consumes: all generated `dist/**/*.html` and public assets.
- Produces: a reproducible build, verified responsive site, and successful GitHub Pages deployment.

- [ ] **Step 1: Write the failing internal-link and local-asset test**

```js
import { glob } from 'node:fs/promises';
import { stat, readFile } from 'node:fs/promises';

test('all generated internal links and local assets resolve under the base path', async () => {
  for await (const file of glob('dist/**/*.html')) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(/(?:href|src)="(\/lab-website\/[^"#?]*)/g)) {
      const relative = match[1].replace(/^\/lab-website\/?/, '');
      const candidate = relative.endsWith('/') ? `dist/${relative}index.html` : `dist/${relative}`;
      await stat(candidate);
    }
  }
});
```

- [ ] **Step 2: Run the test and repair any initial base-path failures**

Run: `npm run build && npm test -- --test-name-pattern="internal links"`

Expected before fixes: FAIL for any hard-coded root-relative route or asset path.

- [ ] **Step 3: Run the full clean verification suite**

Run: `npm install`

Run: `npm test`

Run: `npm run build`

Expected: all tests PASS and build exits 0 without collection or route errors.

- [ ] **Step 4: Start the local Astro server and inspect every route at desktop width**

Run: `npm run dev -- --host 127.0.0.1`

Use browser screenshots and DOM checks on Home, Research, People, Publications, News, and Join. Verify imagery is nonblank, navigation works, and all copy is visible.

- [ ] **Step 5: Repeat browser inspection at a mobile viewport**

Verify the mobile navigation opens/closes, long publication titles wrap, people entries remain aligned, no text overlaps, and the hero leaves a hint of the transition section visible.

- [ ] **Step 6: Commit the final verified build inputs**

```bash
git add package-lock.json tests/links.test.mjs src/styles/global.css .github/workflows/deploy.yml
git commit -m "test: verify responsive GitHub Pages build"
```

- [ ] **Step 7: Push the completed commits to `main` and watch the Pages workflow**

Expected: the `Deploy to GitHub Pages` workflow completes with conclusion `success` for the new head SHA.

- [ ] **Step 8: Verify the public site**

Open `https://sqctoronto.github.io/lab-website/` and each of the five subpage routes. Confirm the deployed title, navigation, images, and content match the local build and no request drops the `/lab-website` base path.

- [ ] **Step 9: Mark implementation complete only after fresh public verification**

Record the final commit SHA, successful workflow run, public URL, six verified routes, and any remaining content uncertainty that needs a future editorial update.

