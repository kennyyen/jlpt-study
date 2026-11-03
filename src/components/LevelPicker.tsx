"use client";

import { LEVELS, type Level } from "@/lib/types";
import { useStoredState } from "@/lib/storage";

const DEFAULT_LEVEL: Level = "N5";

export function useLevel() {
  return useStoredState<Level>("jlpt:level", DEFAULT_LEVEL);
}

/** Level tabs; levels with no content yet are shown but disabled. */
export function LevelPicker({
  level,
  onChange,
  available,
}: {
  level: Level;
  onChange: (level: Level) => void;
  available: ReadonlySet<Level>;
}) {
  return (
    <div className="flex gap-1 rounded-lg border border-border bg-surface p-1" role="tablist">
      {LEVELS.map((l) => {
        const enabled = available.has(l);
        return (
          <button
            key={l}
            role="tab"
            aria-selected={l === level}
            disabled={!enabled}
            title={enabled ? undefined : "Coming soon"}
            onClick={() => onChange(l)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium ${
              l === level
                ? "bg-accent text-white"
                : enabled
                  ? "text-foreground hover:bg-background"
                  : "cursor-not-allowed text-muted opacity-50"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
