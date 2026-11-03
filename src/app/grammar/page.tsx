import type { Metadata } from "next";
import { GrammarBrowser } from "./GrammarBrowser";

export const metadata: Metadata = { title: "Grammar · JLPT Study" };

export default function GrammarPage() {
  return <GrammarBrowser />;
}
