import type { ExamQuestion } from "@/lib/types";
import { N2_EXAM } from "./n2";
import { N3_EXAM } from "./n3";

export const EXAM_QUESTIONS: ExamQuestion[] = [...N3_EXAM, ...N2_EXAM];

export { QUESTION_TYPES, SECTIONS, spokenText, TYPE_INFO, type SectionId } from "./sections";
