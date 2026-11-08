"use client";

import { SpeakButton } from "@/components/SpeakButton";
import { spokenText } from "@/data/exam";
import type { ExamQuestion } from "@/lib/types";

/** Renders `{{text}}` as underlined, like the target word on the test. */
function Marked({ text }: { text: string }) {
  const parts = text.split(/\{\{(.+?)\}\}/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="underline decoration-2 underline-offset-4">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function QuestionView({
  question,
  number,
  options,
  picked,
  reveal,
  onPick,
}: {
  question: ExamQuestion;
  number: number;
  /** Options in display order. */
  options: string[];
  picked: string | undefined;
  /** Show which option is correct (practice feedback / review). */
  reveal: boolean;
  onPick: (option: string) => void;
}) {
  const answer = question.options[0];
  const isUsage = question.type === "usage";
  const longOptions = isUsage || question.type === "reading" || options.some((o) => o.length > 12);

  return (
    <div className="space-y-4" lang="ja">
      {question.passage && (
        <div className="relative whitespace-pre-line rounded-xl border border-border bg-surface p-5 pr-12 leading-relaxed">
          <SpeakButton text={question.passage} label="Listen to the passage" className="absolute right-2 top-2" />
          {question.passage}
        </div>
      )}
      <p className="text-lg leading-relaxed">
        <span className="mr-2 font-bold">{number}</span>
        {isUsage ? <span className="font-bold">{question.prompt}</span> : <Marked text={question.prompt} />}
      </p>
      <div className={`grid gap-2 ${longOptions ? "" : "sm:grid-cols-2"}`}>
        {options.map((option, i) => {
          let style = "border-border bg-surface hover:border-accent";
          if (reveal) {
            if (option === answer) style = "border-emerald-600 bg-emerald-600/15";
            else if (option === picked) style = "border-red-600 bg-red-600/15";
            else style = "border-border bg-surface opacity-60";
          } else if (option === picked) {
            style = "border-accent bg-accent/10";
          }
          return (
            <button
              key={option}
              onClick={() => onPick(option)}
              disabled={reveal}
              className={`flex gap-3 rounded-lg border-2 px-4 py-3 text-left ${style}`}
            >
              <span className="font-bold text-muted">{i + 1}</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {reveal && (
        <div className="flex gap-2 rounded-lg border border-border bg-surface p-4 text-sm">
          {/* Only after answering: hearing a kanji-reading question would give the answer away. */}
          {question.type !== "reading" && (
            <SpeakButton text={spokenText(question)} label="Listen to the sentence" className="-ml-1 -mt-1" />
          )}
          <p lang="en">
            <span className="font-semibold">{picked === answer ? "Correct. " : `Answer: ${answer}. `}</span>
            <span lang="ja">{question.explanation}</span>
          </p>
        </div>
      )}
    </div>
  );
}
