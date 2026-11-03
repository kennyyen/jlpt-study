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
