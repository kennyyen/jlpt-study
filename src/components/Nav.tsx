"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/flashcards", label: "Flashcards" },
  { href: "/grammar", label: "Grammar" },
  { href: "/quiz", label: "Quiz" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <header className="border-b border-border bg-surface">
      <nav className="mx-auto flex max-w-3xl items-center gap-1 px-4 py-3">
        <Link href="/" className="mr-auto text-lg font-bold">
          <span className="text-accent">日本語</span>
          <span className="hidden sm:inline"> JLPT Study</span>
        </Link>
        {LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-3 py-1.5 text-sm ${
                active ? "bg-accent text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
