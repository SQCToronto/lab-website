# Chen Wang Lab Website Modernization

## Purpose

Replace the temporary Astro homepage at `https://sqctoronto.github.io/lab-website/` with a modern, low-maintenance website for the Chen Wang Lab's 2026 move from UMass Amherst to the University of Toronto. The site should preserve useful material from the UMass website, clearly establish the Toronto chapter, and make paper highlights and occasional group updates easy to publish.

## Audience and Tone

The primary audiences are prospective graduate students and postdoctoral researchers, scientific collaborators, current group members, and readers looking for publications or an accessible overview of the lab's work.

The voice is concise, technically accurate, and academic. It should explain experimental quantum information research without corporate marketing language or exaggerated claims.

## Information Architecture

The main navigation contains six destinations:

1. **Home**: research-led hero, Toronto launch notice, three research themes, recent work, and latest group news.
2. **Research**: quantum error correction and bosonic encodings; high-coherence superconducting qubits and gates; engineered open-system dynamics and nonreciprocity.
3. **People**: Chen Wang, all current students and postdoctoral associates from the UMass site carried forward as active members, undergraduate students, alumni, and selected group-history photographs.
4. **Publications**: the complete publication record migrated from the UMass site and grouped by year.
5. **News**: a chronological feed combining paper highlights, the Toronto move, group activities, arrivals, awards, and related updates.
6. **Join**: Toronto-focused opportunities for postdoctoral researchers, graduate students, and undergraduates, with links to University of Toronto admissions and CQIQC.

The footer includes University of Toronto affiliation and public contact information, key institutional links, and repository ownership/copyright information.

## Visual Direction

The selected direction is **Frontier dark**: immersive, high-contrast, and led by experimental quantum research.

- Use a graphite first viewport and occasional dark research bands.
- Switch reading-heavy sections to white or very light neutral backgrounds.
- Use teal for orientation, research metadata, and recruitment cues.
- Use a restrained coral accent for news types and active states so the palette is not one-note.
- Use compact modern typography with normal letter spacing and strong hierarchy.
- Use authentic scientific figures, device imagery, portraits, and group photographs migrated from the UMass site. Do not use generic stock imagery.
- Keep motion subtle and functional: navigation state, mobile menu, and hover/focus feedback only.
- Keep cards square or lightly rounded and avoid decorative cards inside cards.

The homepage first viewport identifies the lab immediately, states the experimental superconducting-circuit focus, and leaves part of the Toronto transition band visible. Mobile layouts preserve the same hierarchy without oversized text or overlapping controls.

## Initial Editorial Content

The Toronto transition is described as the lab launching at the University of Toronto in 2026 after its UMass Amherst chapter. The site uses the public University of Toronto contact information for Chen Wang and links to the Department of Physics and CQIQC.

The initial recent-work highlights are:

- **Passive Quantum Error Correction of Photon Loss at Breakeven**, *Physical Review X* 16, 021042 (2026).
- **Non-Markovian Relaxation Spectroscopy of Fluxonium Qubits**, *Nature Communications* 17, 3209 (2026).
- **Hardware-Efficient Erasure Qubits With Superconducting Transmon Qutrits**, arXiv:2604.08672 (2026).

The complete publication list and people roster are migrated from the current UMass site. Existing UMass funding or recruiting statements are not presented as current Toronto commitments unless they remain explicitly relevant.

## Content Model

Astro content collections provide the low-maintenance editing surface:

- `src/content/news/`: one Markdown file per paper highlight or group update.
- `src/content/people/`: one Markdown file per active member or alumnus.
- `src/data/publications.ts`: structured publication records grouped by year.
- `src/data/research.ts`: the three research themes and selected project highlights.

Each news entry requires a title, date, category, summary, and link when applicable. Images are required for featured paper highlights and optional for ordinary updates. Schemas reject incomplete or malformed entries at build time.

## Components and Pages

Shared components include the site header, mobile navigation, footer, page introduction, research-theme band, person entry, publication row, news card, and transition/recruitment notice. A shared base layout owns metadata, canonical URLs, responsive behavior, focus styles, and the GitHub Pages base path.

Astro pages remain statically generated. No database, login, external CMS, client-side framework, analytics dashboard, or publication-search subsystem is added.

## Assets

Suitable portraits, group photos, and research figures are copied into `public/images/` so the new site does not depend on permanent hotlinks to the UMass WordPress installation. Images receive descriptive alternative text, consistent crops, and responsive dimensions. Low-resolution source figures are not enlarged into inspection-critical hero imagery; the layout must respect their available resolution.

## Error Handling and Accessibility

Content schema failures stop the production build. Missing optional images render a deliberate text-led layout rather than a broken image box. External links are clearly indicated and open normally without forcing a new window.

All pages use semantic landmarks, logical heading order, keyboard-visible focus states, sufficient contrast, descriptive link text, and meaningful image alternative text. Navigation supports keyboard and touch use. The mobile menu must not obscure page content or leave background controls interactive while open.

## Verification

Verification includes:

- A clean dependency installation and Astro production build.
- Automated checks for required page routes, content metadata, and internal links.
- Desktop and mobile browser inspection of every route.
- Screenshot checks for blank content, overlapping text, broken images, navigation behavior, and GitHub Pages base-path errors.
- A successful GitHub Actions deployment followed by direct checks of the public URL and all six routes.

## Deployment

The existing GitHub Actions and GitHub Pages setup remains in place. Changes are committed to the default branch, the workflow builds the Astro project, and the public site remains `https://sqctoronto.github.io/lab-website/` until a custom domain is chosen.

## Out of Scope

This release does not add a custom domain, a CMS, authenticated editing, a database, complex animation, analytics, multilingual content, or substantive new scientific claims beyond the verified source material.

