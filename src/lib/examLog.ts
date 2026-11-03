// Per-question answer history for exam practice, used to find mistakes to
// review and weak question types.

export interface QuestionRecord {
  attempts: number;
  wrong: number;
  /** Epoch ms of the most recent wrong answer. */
  lastWrong?: number;
  /** Correct answers in a row since the last mistake, counting at most one per day. */
  streak: number;
  /** Local day (YYYY-MM-DD) of the last answer that counted toward `streak`. */
  streakDay?: string;
}

export type ExamLog = Record<string, QuestionRecord>;

/** Correct answers on this many different days clear a mistake. */
export const CLEAR_AFTER = 2;

export function dayKey(time: number): string {
  const d = new Date(time);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function recordAnswer(log: ExamLog, id: string, correct: boolean, now: number): ExamLog {
  const prev = log[id] ?? { attempts: 0, wrong: 0, streak: 0 };
  const today = dayKey(now);
  let next: QuestionRecord;
  if (!correct) {
    next = { ...prev, attempts: prev.attempts + 1, wrong: prev.wrong + 1, lastWrong: now, streak: 0, streakDay: undefined };
  } else if (prev.streakDay === today) {
    // Answering again on the same day doesn't count twice.
    next = { ...prev, attempts: prev.attempts + 1 };
  } else {
    next = { ...prev, attempts: prev.attempts + 1, streak: prev.streak + 1, streakDay: today };
  }
  return { ...log, [id]: next };
}

/** A question still needs review: missed before and not yet answered correctly on enough days since. */
export function needsReview(record: QuestionRecord | undefined): boolean {
  return record !== undefined && record.wrong > 0 && record.streak < CLEAR_AFTER;
}

/** Order mistakes: most often missed first, then most recently missed. */
export function compareMistakes(a: QuestionRecord, b: QuestionRecord): number {
  return b.wrong - a.wrong || (b.lastWrong ?? 0) - (a.lastWrong ?? 0);
}
