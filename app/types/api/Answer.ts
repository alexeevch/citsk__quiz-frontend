type BaseAnswer = {
  text: string;
  question: number;
  sort_index: number;
  correct: boolean;
};

export type AnswerData = BaseAnswer & { id: number };
export type AnswerCreateDTO = BaseAnswer;
export type AnswerUpdateDTO = Partial<AnswerCreateDTO>;
