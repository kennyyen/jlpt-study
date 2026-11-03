# JLPT Study

A web app to practice Japanese for JLPT exams — flashcards, grammar reference, and quiz engine covering N5 to N1.

## Features
- **Flashcards** — vocabulary with spaced repetition (SM-2 style Again/Hard/Good/Easy grading)
- **Grammar** — browse and search grammar points by JLPT level, with formation and examples
- **Quiz** — 10-question multiple-choice vocabulary rounds
- **Exam Practice** — original questions in the JLPT's formats (kanji reading, word usage, ★ sentence building, reading passages…) for N3 and N2, by question type or as a timed mock exam with a per-section score

Content currently covers N5 through N2; N1 is planned. Progress is stored in the browser's `localStorage`, so there's no account or backend.

## Stack
- Next.js (App Router) + TypeScript
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
- Exam questions: `src/data/exam/` (one file per level; the first option of each question is the correct answer)

A level becomes selectable in the UI as soon as it has entries.

## Deployment
Hosted on [Vercel](https://vercel.com): import this repo as a new project (no settings to change). Every push to `main` deploys to production, and every pull request gets a preview URL.
