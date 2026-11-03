import type { Metadata } from "next";
import { Exam } from "./Exam";

export const metadata: Metadata = { title: "Exam Practice · JLPT Study" };

export default function ExamPage() {
  return <Exam />;
}
