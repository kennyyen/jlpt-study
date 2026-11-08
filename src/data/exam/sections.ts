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

/** The question as a complete Japanese sentence to read aloud once the answer is shown. */
export function spokenText(q: ExamQuestion): string {
  if (q.sentence) return q.sentence;
  if (q.type === "usage") return q.options[0];
  return q.prompt.replace(/\{\{(.+?)\}\}/g, "$1").replace("（　）", q.options[0]);
}

/**
 * Helpers that keep the question files compact. Every question has a fixed id
 * (e.g. "N3-012") that saved progress refers to, so never reuse or renumber
 * ids; give new questions the next unused number.
 */
export function questions(level: Level) {
  const q = (
    id: string,
    type: QuestionType,
    prompt: string,
    options: Options,
    explanation: string,
  ): ExamQuestion => ({ id, level, type, prompt, options, explanation });

  return {
    q,
    /**
     * A ★ sentence-building question. `pieces` are in the correct order and
     * `star` is the index of the piece that goes in the ★ slot.
     */
    order(
      id: string,
      before: string,
      pieces: [string, string, string, string],
      star: number,
      after: string,
      explanation: string,
    ) {
      const slots = pieces.map((_, i) => (i === star ? "＿★＿" : "＿＿＿")).join(" ");
      const others = pieces.filter((_, i) => i !== star);
      const sentence = `${before}${pieces.join("")}${after}`;
      return {
        ...q(id, "sentence-order", `${before} ${slots} ${after}`, [pieces[star], others[0], others[1], others[2]], `${sentence}　${explanation}`),
        sentence,
      };
    },
    /** A reading passage with one or more questions about it. */
    passage(text: string, items: { id: string; prompt: string; options: Options; explanation: string }[]) {
      return items.map((item) => ({
        ...q(item.id, "reading", item.prompt, item.options, item.explanation),
        passage: text,
      }));
    },
  };
}
