"use client";

import { useState } from "react";
import { LevelPicker, useLevel } from "@/components/LevelPicker";
import { GRAMMAR } from "@/data/grammar";
import type { Level } from "@/lib/types";

const AVAILABLE = new Set<Level>(GRAMMAR.map((g) => g.level));

export function GrammarBrowser() {
  const [level, setLevel] = useLevel();
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const points = GRAMMAR.filter(
    (g) =>
      g.level === level &&
      (!q || g.pattern.includes(q) || g.meaning.toLowerCase().includes(q)),
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Grammar</h1>
      <LevelPicker level={level} onChange={(l) => setLevel(l)} available={AVAILABLE} />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search patterns or meanings…"
        className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 outline-none focus:border-accent"
      />
      {points.length === 0 && <p className="text-muted">No grammar points match.</p>}
      <ul className="space-y-3">
        {points.map((g) => (
          <li key={g.id}>
            <details className="group rounded-xl border border-border bg-surface p-4 open:border-accent">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
                <span className="text-lg font-bold" lang="ja">
                  {g.pattern}
                </span>
                <span className="text-right text-sm text-muted">{g.meaning}</span>
              </summary>
              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <p className="text-sm">
                  <span className="font-semibold">Formation: </span>
                  <span lang="ja">{g.formation}</span>
                </p>
                <ul className="space-y-2">
                  {g.examples.map((ex) => (
                    <li key={ex.ja}>
                      <div lang="ja">{ex.ja}</div>
                      <div className="text-sm text-muted">{ex.en}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
