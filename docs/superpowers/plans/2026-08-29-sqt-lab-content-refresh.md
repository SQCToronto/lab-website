# SQT Lab Content Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the published SQT Lab site with corrected Toronto contact information, supplied research and construction imagery, clearer public-facing home content, and an improved people/news presentation.

**Architecture:** Preserve Astro's existing data-module and Markdown-news model. Make editorial data changes where possible; add only two focused presentation capabilities: optional text-only people entries and per-portrait image positioning. Keep all images local under `public/images/` and preserve GitHub Pages base-path handling through `withBase()`.

**Tech Stack:** Astro, JavaScript data modules, Markdown content collection, CSS, Node built-in test runner, GitHub Pages Actions.

**Spec:** User instructions in this task, approved 2026-08-29.

## Global Constraints

- Publish to `https://sqctoronto.github.io/lab-website/` only after local build, automated tests, and desktop/mobile browser review.
- Use supplied local assets for Themes 1 and 3, news imagery, construction, and historical group photos.
- Use Figure 1a of arXiv:2401.12183 as a localized adapted research asset with source attribution in its alternative text/caption context.
- Represent the lab address as Department of Physics, 60 St George St, MP337; list MP1023B only as Chen Wang's office.
- Keep the site accessible, responsive, and free of oversized page titles or placeholder portraits for alumni.

---

### Task 1: Content and Asset Contracts

**Files:**
- Modify: `tests/content.test.mjs`, `tests/routes.test.mjs`
- Modify: `src/data/research.mjs`, `src/data/news/*.md`, `src/content.config.ts`
- Create: `src/data/news/2026-lab-construction.md`, `public/images/research/tls-charge-states-figure-1a.png`

- [ ] Add a failing test that expects the three requested research-image paths, the corrected paper-news image paths, and the construction update.
- [ ] Run the named test and confirm it fails because the pre-refresh data uses the prior images and no construction entry exists.
- [ ] Download/localize the approved Figure 1a asset, update research and paper-news entries, add the construction entry, and extend the category schema for a standard lab update.
- [ ] Rerun the named test and full content suite until both pass.

### Task 2: Home, Shared Typography, and Contact Framing

**Files:**
- Modify: `tests/routes.test.mjs`, `src/pages/index.astro`, `src/styles/global.css`, `src/components/SiteFooter.astro`, `src/pages/join.astro`

- [ ] Add a failing built-route test for the revised home statement and the new MP337 address.
- [ ] Build and run that test to confirm the expected new text is absent.
- [ ] Fold the separate superconducting-circuits band into a fuller Research Themes introduction, tighten tiles, adjust type tokens, and correct general versus personal address use.
- [ ] Rebuild and rerun the full automated suite.

### Task 3: People Information and Gallery

**Files:**
- Modify: `tests/routes.test.mjs`, `src/pages/people.astro`, `src/components/PersonEntry.astro`, `src/data/people.mjs`

- [ ] Add a failing built-route test for combined research staff ordering, text-only alumni, and every historical photo.
- [ ] Build and run the test to confirm the old two-group/one-photo presentation fails it.
- [ ] Add optional portrait suppression and person-specific cropping, group Baojie and Sean in that order, group alumni by role, and render the complete image gallery.
- [ ] Rebuild and rerun the full automated suite.

### Task 4: Local Review, Commit, and Publication

**Files:**
- Verify: all modified source, data, asset, and test files

- [ ] Run a fresh production build and all automated tests serially.
- [ ] Start an Astro local preview; inspect Home, Research, People, News, and mobile navigation using browser screenshots and DOM checks.
- [ ] Commit only the content-refresh source files and the localized Figure 1a asset with a descriptive commit message.
- [ ] Merge the verified branch to `main`, push, wait for the GitHub Pages workflow success, and inspect the public site.
