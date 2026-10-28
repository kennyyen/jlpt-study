import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "JLPT Study",
  description: "Flashcards with spaced repetition, a grammar reference, and quizzes for the JLPT.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
        <footer className="py-6 text-center text-xs text-muted">
          Progress is saved in this browser only.
        </footer>
      </body>
    </html>
  );
}
