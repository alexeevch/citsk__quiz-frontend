import type { AnswerData } from "~/types/api/Answer";

type BaseQuestion = {
  question: string;
  question_type: QuestionType;
  quiz_id: number;
  sort_index: number;
};

export type QuestionType = "single" | "multiple";
export type QuestionData = BaseQuestion & { id: number; answers: AnswerData[] };
export type QuestionCreateDTO = BaseQuestion;
export type QuestionUpdateDTO = Partial<QuestionCreateDTO>;
