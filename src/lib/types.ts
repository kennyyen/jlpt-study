export const LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;
export type Level = (typeof LEVELS)[number];

export interface Word {
  id: string;
  level: Level;
  /** Written form; equals `kana` for words usually written without kanji. */
  word: string;
  kana: string;
  meaning: string;
}

export interface GrammarPoint {
  id: string;
  level: Level;
  pattern: string;
  meaning: string;
  formation: string;
  examples: { ja: string; en: string }[];
}

/** Question formats used in the JLPT "language knowledge" and reading sections. */
export type QuestionType =
  | "kanji-reading"
  | "orthography"
  | "context"
  | "paraphrase"
  | "usage"
  | "grammar-form"
  | "sentence-order"
  | "reading";

export interface ExamQuestion {
  id: string;
  level: Level;
  type: QuestionType;
  /** Reading passage shown above the question (reading questions only). */
  passage?: string;
  /** `{{text}}` is shown underlined; （　） marks a blank. */
  prompt: string;
  /** The first option is the correct answer; options are shuffled when shown. */
  options: [string, string, string, string];
  explanation: string;
}
