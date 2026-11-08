"use client";

import { useState } from "react";
import { LevelPicker, useLevel } from "@/components/LevelPicker";
import { SpeakButton } from "@/components/SpeakButton";
import { VOCAB } from "@/data/vocab";
import { formatInterval, isDue, review, type CardState, type Grade } from "@/lib/srs";
import { useStoredState } from "@/lib/storage";
import type { Level, Word } from "@/lib/types";

const NEW_PER_SESSION = 10;
const NO_PROGRESS: Record<string, CardState> = {};
const AVAILABLE = new Set<Level>(VOCAB.map((w) => w.level));
const GRADES: { grade: Grade; label: string; className: string }[] = [
  { grade: "again", label: "Again", className: "bg-red-600" },
  { grade: "hard", label: "Hard", className: "bg-amber-600" },
  { grade: "good", label: "Good", className: "bg-emerald-600" },
  { grade: "easy", label: "Easy", className: "bg-sky-600" },
];

function buildQueue(words: Word[], progress: Record<string, CardState>, now: number): Word[] {
  const due = words.filter((w) => isDue(progress[w.id], now));
  const fresh = words.filter((w) => !progress[w.id]).slice(0, NEW_PER_SESSION);
  return [...due, ...fresh];
}

export function Flashcards() {
  const [level, setLevel] = useLevel();
  const [progress, setProgress] = useStoredState("jlpt:srs", NO_PROGRESS);
  const [queue, setQueue] = useState<Word[] | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  const words = VOCAB.filter((w) => w.level === level);
  const learned = words.filter((w) => progress[w.id]).length;

  function start() {
    setQueue(buildQueue(words, progress, Date.now()));
    setRevealed(false);
    setReviewed(0);
  }

  function grade(g: Grade) {
    if (!queue) return;
    const [card, ...rest] = queue;
    setProgress((p) => ({ ...p, [card.id]: review(p[card.id], g) }));
    // "Again" puts the card back at the end of this session.
    setQueue(g === "again" ? [...rest, card] : rest);
    setRevealed(false);
    setReviewed((n) => n + 1);
  }

  if (queue === null) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Flashcards</h1>
        <LevelPicker
          level={level}
          onChange={(l) => setLevel(l)}
          available={AVAILABLE}
        />
        <div className="rounded-xl border border-border bg-surface p-6 text-center">
          <p className="text-muted">
            {learned} of {words.length} {level} words studied
          </p>
          <button
            onClick={start}
            className="mt-4 rounded-lg bg-accent px-6 py-2.5 font-semibold text-white hover:opacity-90"
          >
            Start review
          </button>
          <p className="mt-3 text-xs text-muted">
            Reviews every card that is due, plus up to {NEW_PER_SESSION} new words.
          </p>
        </div>
      </div>
    );
  }

  if (queue.length === 0) {
    return (
      <div className="space-y-4 rounded-xl border border-border bg-surface p-8 text-center">
        <div className="text-4xl">🎉</div>
        <h1 className="text-xl font-bold">
          {reviewed > 0 ? `Session done: ${reviewed} reviews` : "Nothing due right now"}
        </h1>
        <p className="text-muted">Come back later for the next reviews.</p>
        <button onClick={() => setQueue(null)} className="rounded-lg border border-border px-4 py-2 text-sm">
          Back
        </button>
      </div>
    );
  }

  const card = queue[0];
  const state = progress[card.id];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <button onClick={() => setQueue(null)} className="hover:text-foreground">
          ← End session
        </button>
        <span>{queue.length} left</span>
      </div>
      <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface p-8 text-center">
        <div className="text-5xl font-bold" lang="ja">
          {card.word}
        </div>
        {revealed ? (
          <>
            <div className="flex items-center gap-1">
              {card.kana !== card.word && (
                <span className="text-xl text-muted" lang="ja">
                  {card.kana}
                </span>
              )}
              {/* Read the kana so the voice can't pick the wrong reading for the kanji. */}
              <SpeakButton text={card.kana} label="Listen to the word" />
            </div>
            <div className="text-lg">{card.meaning}</div>
          </>
        ) : (
          !state && <div className="text-xs uppercase tracking-wide text-accent">New</div>
        )}
      </div>
      {revealed ? (
        <div className="grid grid-cols-4 gap-2">
          {GRADES.map(({ grade: g, label, className }) => (
            <button
              key={g}
              onClick={() => grade(g)}
              className={`rounded-lg py-2.5 text-sm font-semibold text-white hover:opacity-90 ${className}`}
            >
              {label}
              <span className="block text-xs font-normal opacity-80">
                {formatInterval(review(state, g, 0).interval)}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="w-full rounded-lg bg-accent py-3 font-semibold text-white hover:opacity-90"
        >
          Show answer
        </button>
      )}
    </div>
  );
}
