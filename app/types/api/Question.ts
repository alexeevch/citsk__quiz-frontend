type BaseQuestion = {
  question: string;
  question_type: QuestionType;
  quiz_id: number;
  sort_index: number;
};

export type QuestionType = "single" | "multiple";
export type QuestionData = BaseQuestion & { id: number };
export type QuestionCreateDTO = BaseQuestion;
export type QuestionUpdateDTO = Partial<QuestionCreateDTO>;
