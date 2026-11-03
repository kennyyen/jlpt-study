import type { ExamQuestion, Level, QuestionType } from "@/lib/types";

export type SectionId = "vocabulary" | "grammar" | "reading";

export const SECTIONS: { id: SectionId; ja: string; en: string }[] = [
  { id: "vocabulary", ja: "文字・語彙", en: "Vocabulary" },
  { id: "grammar", ja: "文法", en: "Grammar" },
  { id: "reading", ja: "読解", en: "Reading" },
];

/** Question types in the order they appear on the test. */
export const QUESTION_TYPES: {
  type: QuestionType;
  section: SectionId;
  label: string;
  /** Instruction shown above the questions, in the style of the test booklet. */
  instruction: string;
  /** Time allowed per question in the mock exam. */
  seconds: number;
}[] = [
  {
    type: "kanji-reading",
    section: "vocabulary",
    label: "Kanji reading",
    instruction: "＿＿＿のことばの読み方として最もよいものを、1・2・3・4から一つえらびなさい。",
    seconds: 30,
  },
  {
    type: "orthography",
    section: "vocabulary",
    label: "Writing in kanji",
    instruction: "＿＿＿のことばを漢字で書くとき、最もよいものを、1・2・3・4から一つえらびなさい。",
    seconds: 30,
  },
  {
    type: "context",
    section: "vocabulary",
    label: "Word in context",
    instruction: "（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
    seconds: 45,
  },
  {
    type: "paraphrase",
    section: "vocabulary",
    label: "Paraphrase",
    instruction: "＿＿＿に意味が最も近いものを、1・2・3・4から一つえらびなさい。",
    seconds: 45,
  },
  {
    type: "usage",
    section: "vocabulary",
    label: "Usage",
    instruction: "次のことばの使い方として最もよいものを、1・2・3・4から一つえらびなさい。",
    seconds: 75,
  },
  {
    type: "grammar-form",
    section: "grammar",
    label: "Grammar form",
    instruction: "次の文の（　）に入れるのに最もよいものを、1・2・3・4から一つえらびなさい。",
    seconds: 60,
  },
  {
    type: "sentence-order",
    section: "grammar",
    label: "Sentence building (★)",
    instruction: "次の文の ★ に入る最もよいものを、1・2・3・4から一つえらびなさい。",
    seconds: 90,
  },
  {
    type: "reading",
    section: "reading",
    label: "Reading comprehension",
    instruction: "次の文章を読んで、質問に答えなさい。答えは、1・2・3・4から最もよいものを一つえらびなさい。",
    seconds: 180,
  },
];

export const TYPE_INFO = Object.fromEntries(QUESTION_TYPES.map((t) => [t.type, t])) as Record<
  QuestionType,
  (typeof QUESTION_TYPES)[number]
>;

type Options = ExamQuestion["options"];

/** Helpers that keep the question files compact. */
export function questions(level: Level) {
  let n = 0;
  const id = (type: QuestionType) => `${level}:${type}:${++n}`;
  const q = (type: QuestionType, prompt: string, options: Options, explanation: string): ExamQuestion => ({
    id: id(type),
    level,
    type,
    prompt,
    options,
    explanation,
  });

  return {
    q,
    /**
     * A ★ sentence-building question. `pieces` are in the correct order and
     * `star` is the index of the piece that goes in the ★ slot.
     */
    order(before: string, pieces: [string, string, string, string], star: number, after: string, explanation: string) {
      const slots = pieces.map((_, i) => (i === star ? "＿★＿" : "＿＿＿")).join(" ");
      const others = pieces.filter((_, i) => i !== star);
      return q(
        "sentence-order",
        `${before} ${slots} ${after}`,
        [pieces[star], others[0], others[1], others[2]],
        `${before}${pieces.join("")}${after}　${explanation}`,
      );
    },
    /** A reading passage with one or more questions about it. */
    passage(text: string, items: { prompt: string; options: Options; explanation: string }[]) {
      return items.map((item) => ({ ...q("reading", item.prompt, item.options, item.explanation), passage: text }));
    },
  };
}
