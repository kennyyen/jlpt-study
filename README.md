# JLPT Study

A web app to practice Japanese for JLPT exams — flashcards, grammar reference, and quiz engine covering N5 to N1.

**Live site:** https://kennyyen.github.io/jlpt-study/

## Features
- **Flashcards** — vocabulary with spaced repetition (SM-2 style Again/Hard/Good/Easy grading)
- **Grammar** — browse and search grammar points by JLPT level, with formation and examples
- **Quiz** — 10-question multiple-choice vocabulary rounds

Content currently covers N5 and N4; N3–N1 are planned. Progress is stored in the browser's `localStorage`, so there's no account or backend.

## Stack
- Next.js (App Router, static export) + TypeScript
- Tailwind CSS

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Adding content
- Vocabulary: `src/data/vocab.ts` (`[written form, reading, meaning]` per level)
- Grammar: `src/data/grammar.ts`

A level becomes selectable in the UI as soon as it has entries.

## Deployment
Every push to `main` builds a static export (`out/`) and publishes it to GitHub Pages via `.github/workflows/deploy.yml`.
One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
