"use client";

import { useState } from "react";
import { LevelPicker, useLevel } from "@/components/LevelPicker";
import { VOCAB } from "@/data/vocab";
import type { Level, Word } from "@/lib/types";

const QUESTIONS = 10;
const AVAILABLE = new Set<Level>(VOCAB.map((w) => w.level));

interface Question {
  prompt: string;
  promptIsJa: boolean;
  options: string[];
  answer: string;
  word: Word;
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeQuiz(words: Word[]): Question[] {
  return shuffle(words)
    .slice(0, QUESTIONS)
    .map((word, i) => {
      // Alternate between "what does this word mean?" and "which word means this?".
      const toMeaning = i % 2 === 0;
      const show = (w: Word) => (toMeaning ? w.meaning : w.word);
      const distractors = shuffle(words.filter((w) => w.id !== word.id))
        .slice(0, 3)
        .map(show);
      return {
        prompt: toMeaning ? word.word : word.meaning,
        promptIsJa: toMeaning,
        answer: show(word),
        options: shuffle([show(word), ...distractors]),
        word,
      };
    });
}

export function Quiz() {
  const [level, setLevel] = useLevel();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  function start() {
    setQuestions(makeQuiz(VOCAB.filter((w) => w.level === level)));
    setIndex(0);
    setPicked(null);
    setScore(0);
  }

  function pick(option: string) {
    if (picked !== null || !questions) return;
    setPicked(option);
    if (option === questions[index].answer) setScore((s) => s + 1);
  }

  if (questions === null) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Quiz</h1>
        <LevelPicker level={level} onChange={(l) => setLevel(l)} available={AVAILABLE} />
        <div className="rounded-xl border border-border bg-surface p-6 text-center">
          <p className="text-muted">{QUESTIONS} multiple-choice vocabulary questions from {level}.</p>
          <button
            onClick={start}
            className="mt-4 rounded-lg bg-accent px-6 py-2.5 font-semibold text-white hover:opacity-90"
          >
            Start quiz
          </button>
        </div>
      </div>
    );
  }

  if (index >= questions.length) {
    return (
      <div className="space-y-4 rounded-xl border border-border bg-surface p-8 text-center">
        <h1 className="text-xl font-bold">
          You scored {score} / {questions.length}
        </h1>
        <div className="flex justify-center gap-2">
          <button onClick={start} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
            Try again
          </button>
          <button onClick={() => setQuestions(null)} className="rounded-lg border border-border px-4 py-2 text-sm">
            Back
          </button>
        </div>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted">
        <span>
          Question {index + 1} / {questions.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <div className="text-xs uppercase tracking-wide text-muted">
          {q.promptIsJa ? "What does this mean?" : "Which word means this?"}
        </div>
        <div className={`mt-2 font-bold ${q.promptIsJa ? "text-4xl" : "text-2xl"}`} lang={q.promptIsJa ? "ja" : "en"}>
          {q.prompt}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {q.options.map((option) => {
          let style = "border-border bg-surface hover:border-accent";
          if (picked !== null) {
            if (option === q.answer) style = "border-emerald-600 bg-emerald-600/15";
            else if (option === picked) style = "border-red-600 bg-red-600/15";
            else style = "border-border bg-surface opacity-60";
          }
          return (
            <button
              key={option}
              onClick={() => pick(option)}
              disabled={picked !== null}
              lang={q.promptIsJa ? "en" : "ja"}
              className={`rounded-lg border-2 px-4 py-3 text-left ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-4">
          <div lang="ja">
            <span className="font-semibold">{q.word.word}</span>
            {q.word.kana !== q.word.word && <span className="text-muted">（{q.word.kana}）</span>}
            <span className="ml-2 text-sm text-muted">{q.word.meaning}</span>
          </div>
          <button
            onClick={() => {
              setIndex((i) => i + 1);
              setPicked(null);
            }}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            {index + 1 === questions.length ? "See score" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
