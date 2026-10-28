import Link from "next/link";
import { GRAMMAR } from "@/data/grammar";
import { VOCAB } from "@/data/vocab";

const FEATURES = [
  {
    href: "/flashcards/",
    title: "Flashcards",
    ja: "単語",
    body: `${VOCAB.length} vocabulary cards scheduled with spaced repetition, so you review each word right before you'd forget it.`,
  },
  {
    href: "/grammar/",
    title: "Grammar",
    ja: "文法",
    body: `${GRAMMAR.length} grammar points by JLPT level, each with its formation and example sentences.`,
  },
  {
    href: "/quiz/",
    title: "Quiz",
    ja: "試験",
    body: "Quick 10-question multiple-choice rounds to check what you know.",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Study for the JLPT</h1>
        <p className="text-muted">
          Practice vocabulary and grammar from N5 upward. N5 and N4 are available now; N3–N1 are on the way.
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <div className="text-2xl font-bold text-accent">{f.ja}</div>
            <h2 className="mt-1 font-semibold group-hover:text-accent">{f.title}</h2>
            <p className="mt-2 text-sm text-muted">{f.body}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
