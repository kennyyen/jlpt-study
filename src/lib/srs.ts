// A small SM-2 variant: each review grade adjusts the card's ease factor and
// the number of days until it is due again.

export type Grade = "again" | "hard" | "good" | "easy";

export interface CardState {
  /** Interval in days until the next review. */
  interval: number;
  ease: number;
  reps: number;
  /** Epoch ms when the card is next due. */
  due: number;
}

const DAY = 24 * 60 * 60 * 1000;
const MIN_EASE = 1.3;

export function review(prev: CardState | undefined, grade: Grade, now = Date.now()): CardState {
  const ease = prev?.ease ?? 2.5;
  const reps = prev?.reps ?? 0;
  const interval = prev?.interval ?? 0;

  if (grade === "again") {
    // Relearn: show it again in this session (due now) and reset progress.
    return { interval: 0, ease: Math.max(MIN_EASE, ease - 0.2), reps: 0, due: now };
  }

  const nextEase = Math.max(
    MIN_EASE,
    ease + (grade === "hard" ? -0.15 : grade === "easy" ? 0.15 : 0),
  );
  let nextInterval: number;
  if (reps === 0) nextInterval = grade === "easy" ? 4 : 1;
  else if (reps === 1) nextInterval = grade === "hard" ? 3 : 6;
  else {
    const factor = grade === "hard" ? 1.2 : grade === "easy" ? nextEase * 1.3 : nextEase;
    nextInterval = Math.max(interval + 1, Math.round(interval * factor));
  }

  return { interval: nextInterval, ease: nextEase, reps: reps + 1, due: now + nextInterval * DAY };
}

export function isDue(state: CardState | undefined, now = Date.now()): boolean {
  return state !== undefined && state.due <= now;
}

/** Human-readable "next review" hint shown on the grade buttons. */
export function formatInterval(days: number): string {
  if (days <= 0) return "now";
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${(days / 365).toFixed(1)}y`;
}
