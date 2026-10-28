import type { Metadata } from "next";
import { Flashcards } from "./Flashcards";

export const metadata: Metadata = { title: "Flashcards · JLPT Study" };

export default function FlashcardsPage() {
  return <Flashcards />;
}
