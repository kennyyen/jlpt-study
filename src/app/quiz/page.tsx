import type { Metadata } from "next";
import { Quiz } from "./Quiz";

export const metadata: Metadata = { title: "Quiz · JLPT Study" };

export default function QuizPage() {
  return <Quiz />;
}
