"use client";

import { useEffect, useRef, useState } from "react";
import { LevelPicker, useLevel } from "@/components/LevelPicker";
import { EXAM_QUESTIONS, QUESTION_TYPES, SECTIONS, TYPE_INFO, type SectionId } from "@/data/exam";
import { useStoredState } from "@/lib/storage";
import type { ExamQuestion, Level, QuestionType } from "@/lib/types";
import { QuestionView } from "./QuestionView";

const AVAILABLE = new Set<Level>(EXAM_QUESTIONS.map((q) => q.level));
const FALLBACK_LEVEL: Level = "N3";

interface Item {
  question: ExamQuestion;
  options: string[];
}

interface Session {
  mode: "practice" | "mock";
  /** Set for practice sessions. */
  type?: QuestionType;
  items: Item[];
  index: number;
  answers: Record<string, string>;
  /** Practice: whether the current question's answer is shown. */
  revealed: boolean;
  /** Mock: epoch ms when time runs out. */
  deadline: number;
  finished: boolean;
}

interface HistoryEntry {
  level: Level;
  date: number;
  correct: number;
  total: number;
  sections: Partial<Record<SectionId, [number, number]>>;
}

const NO_HISTORY: HistoryEntry[] = [];

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toItems(questions: ExamQuestion[]): Item[] {
  return questions.map((question) => ({ question, options: shuffle(question.options) }));
}

function score(session: Session) {
  const sections: Partial<Record<SectionId, [number, number]>> = {};
  let correct = 0;
  for (const { question } of session.items) {
    const ok = session.answers[question.id] === question.options[0];
    const section = TYPE_INFO[question.type].section;
    const [c, t] = sections[section] ?? [0, 0];
    sections[section] = [c + (ok ? 1 : 0), t + 1];
    if (ok) correct++;
  }
  return { correct, total: session.items.length, sections };
}

function formatTime(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function Exam() {
  const [storedLevel, setLevel] = useLevel();
  const level = AVAILABLE.has(storedLevel) ? storedLevel : FALLBACK_LEVEL;
  const [history, setHistory] = useStoredState("jlpt:exam-history", NO_HISTORY);
  const [session, setSession] = useState<Session | null>(null);
  const [now, setNow] = useState(0);

  const levelQuestions = EXAM_QUESTIONS.filter((q) => q.level === level);

  function startMock() {
    // Keep the test's section order; reading passages stay grouped.
    const ordered = QUESTION_TYPES.flatMap(({ type }) => levelQuestions.filter((q) => q.type === type));
    const seconds = ordered.reduce((sum, q) => sum + TYPE_INFO[q.type].seconds, 0);
    const start = Date.now();
    setNow(start);
    setSession({
      mode: "mock",
      items: toItems(ordered),
      index: 0,
      answers: {},
      revealed: false,
      deadline: start + seconds * 1000,
      finished: false,
    });
  }

  function startPractice(type: QuestionType) {
    const pool = levelQuestions.filter((q) => q.type === type);
    // Reading questions share passages, so keep them in order.
    setSession({
      mode: "practice",
      type,
      items: toItems(type === "reading" ? pool : shuffle(pool)),
      index: 0,
      answers: {},
      revealed: false,
      deadline: 0,
      finished: false,
    });
  }

  function finish() {
    if (!session || session.finished) return;
    if (session.mode === "mock") {
      const result = score(session);
      setHistory((h) => [{ level, date: Date.now(), ...result }, ...h].slice(0, 10));
    }
    setSession({ ...session, finished: true });
  }

  // The timer callback must see the latest answers, so it calls through a ref.
  const finishRef = useRef(finish);
  useEffect(() => {
    finishRef.current = finish;
  });

  const deadline = session?.mode === "mock" && !session.finished ? session.deadline : null;
  useEffect(() => {
    if (deadline === null) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= deadline) finishRef.current();
    }, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!session) {
    return (
      <Setup
        level={level}
        onLevel={(l) => setLevel(l)}
        questions={levelQuestions}
        history={history.filter((h) => h.level === level)}
        onMock={startMock}
        onPractice={startPractice}
      />
    );
  }

  if (session.finished) {
    return <Results session={session} onBack={() => setSession(null)} />;
  }

  const { items, index, answers } = session;
  const item = items[index];
  const info = TYPE_INFO[item.question.type];
  const showInstruction = index === 0 || items[index - 1].question.type !== item.question.type;
  const isLast = index === items.length - 1;

  function pick(option: string) {
    if (!session || session.revealed) return;
    setSession({
      ...session,
      answers: { ...session.answers, [item.question.id]: option },
      revealed: session.mode === "practice",
    });
  }

  function go(to: number) {
    if (!session) return;
    setSession({ ...session, index: to, revealed: false });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2 text-sm text-muted">
        <button
          onClick={() => {
            if (session.mode === "practice" || confirm("Quit this exam? Your answers will be lost.")) setSession(null);
          }}
          className="hover:text-foreground"
        >
          ← Quit
        </button>
        <span>
          {SECTIONS.find((s) => s.id === info.section)?.ja} · {index + 1} / {items.length}
        </span>
        {session.mode === "mock" && (
          <span
            className={`rounded-md px-2 py-1 font-mono font-semibold ${
              session.deadline - now < 5 * 60 * 1000 ? "bg-red-600 text-white" : "bg-surface text-foreground"
            }`}
            aria-label="Time left"
          >
            {formatTime(session.deadline - now)}
          </span>
        )}
      </div>

      {showInstruction && (
        <div className="rounded-lg bg-foreground/5 p-3 text-sm" lang="ja">
          {info.instruction}
        </div>
      )}

      <QuestionView
        question={item.question}
        number={index + 1}
        options={item.options}
        picked={answers[item.question.id]}
        reveal={session.revealed}
        onPick={pick}
      />

      {session.mode === "practice" ? (
        session.revealed && (
          <button
            onClick={() => (isLast ? finish() : go(index + 1))}
            className="w-full rounded-lg bg-accent py-3 font-semibold text-white hover:opacity-90"
          >
            {isLast ? "See results" : "Next question"}
          </button>
        )
      ) : (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => go(index - 1)}
              disabled={index === 0}
              className="flex-1 rounded-lg border border-border py-3 font-semibold disabled:opacity-40"
            >
              Previous
            </button>
            {isLast ? (
              <button
                onClick={() => {
                  const unanswered = items.length - Object.keys(answers).length;
                  if (unanswered === 0 || confirm(`${unanswered} question(s) unanswered. Submit anyway?`)) finish();
                }}
                className="flex-1 rounded-lg bg-accent py-3 font-semibold text-white hover:opacity-90"
              >
                Submit exam
              </button>
            ) : (
              <button
                onClick={() => go(index + 1)}
                className="flex-1 rounded-lg bg-accent py-3 font-semibold text-white hover:opacity-90"
              >
                Next
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1" aria-label="Questions">
            {items.map((it, i) => (
              <button
                key={it.question.id}
                onClick={() => go(i)}
                className={`h-8 w-8 rounded text-xs font-semibold ${
                  i === index
                    ? "bg-accent text-white"
                    : answers[it.question.id]
                      ? "bg-foreground/15"
                      : "border border-border bg-surface text-muted"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Setup({
  level,
  onLevel,
  questions,
  history,
  onMock,
  onPractice,
}: {
  level: Level;
  onLevel: (level: Level) => void;
  questions: ExamQuestion[];
  history: HistoryEntry[];
  onMock: () => void;
  onPractice: (type: QuestionType) => void;
}) {
  const minutes = Math.round(questions.reduce((sum, q) => sum + TYPE_INFO[q.type].seconds, 0) / 60);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Exam Practice</h1>
        <p className="text-sm text-muted">
          Original practice questions written in the same formats as the JLPT. They are not real past exam questions.
        </p>
      </div>
      <LevelPicker level={level} onChange={onLevel} available={AVAILABLE} />

      <section className="rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">Mock exam</h2>
        <p className="mt-1 text-sm text-muted">
          All {questions.length} {level} questions in test order — vocabulary, grammar, then reading — with a{" "}
          {minutes}-minute timer. Answers and scores are shown only after you submit.
        </p>
        <button
          onClick={onMock}
          className="mt-4 rounded-lg bg-accent px-6 py-2.5 font-semibold text-white hover:opacity-90"
        >
          Start mock exam
        </button>
        {history.length > 0 && (
          <div className="mt-5 border-t border-border pt-4">
            <h3 className="text-sm font-semibold">Recent results</h3>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {history.map((h) => (
                <li key={h.date} className="flex justify-between gap-2">
                  <span>{new Date(h.date).toLocaleDateString()}</span>
                  <span>
                    {SECTIONS.map((s) => {
                      const r = h.sections[s.id];
                      return r ? `${s.ja} ${r[0]}/${r[1]}` : null;
                    })
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                  <span className="font-semibold text-foreground">{Math.round((h.correct / h.total) * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Practice one question type</h2>
        <p className="text-sm text-muted">No timer; see the answer and explanation after each question.</p>
        {SECTIONS.map((section) => (
          <div key={section.id} className="space-y-2">
            <h3 className="text-sm font-semibold text-muted">
              <span lang="ja">{section.ja}</span> · {section.en}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {QUESTION_TYPES.filter((t) => t.section === section.id).map((t) => {
                const count = questions.filter((q) => q.type === t.type).length;
                return (
                  <button
                    key={t.type}
                    onClick={() => onPractice(t.type)}
                    disabled={count === 0}
                    className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-left hover:border-accent disabled:opacity-40"
                  >
                    <span>{t.label}</span>
                    <span className="text-sm text-muted">{count} Q</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function Results({ session, onBack }: { session: Session; onBack: () => void }) {
  const result = score(session);
  const missed = session.items
    .map((item, i) => ({ ...item, number: i + 1 }))
    .filter(({ question }) => session.answers[question.id] !== question.options[0]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <div className="text-sm text-muted">
          {session.mode === "mock" ? "Mock exam" : `Practice · ${TYPE_INFO[session.type!].label}`}
        </div>
        <div className="mt-1 text-4xl font-bold">
          {result.correct} / {result.total}
        </div>
        <div className="text-muted">{Math.round((result.correct / result.total) * 100)}% correct</div>
        {session.mode === "mock" && (
          <div className="mt-5 space-y-2 text-left">
            {SECTIONS.map((s) => {
              const r = result.sections[s.id];
              if (!r) return null;
              const pct = Math.round((r[0] / r[1]) * 100);
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-sm">
                    <span>
                      <span lang="ja">{s.ja}</span> · {s.en}
                    </span>
                    <span>
                      {r[0]} / {r[1]}
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-foreground/10">
                    <div className="h-2 rounded-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button onClick={onBack} className="mt-6 rounded-lg border border-border px-4 py-2 text-sm">
          Back to Exam Practice
        </button>
      </div>

      {missed.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Review ({missed.length} missed)</h2>
          {missed.map(({ question, options, number }) => (
            <div key={question.id} className="rounded-xl border border-border p-4">
              <QuestionView
                question={question}
                number={number}
                options={options}
                picked={session.answers[question.id]}
                reveal
                onPick={() => {}}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
