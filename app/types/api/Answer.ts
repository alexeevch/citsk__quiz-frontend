type BaseAnswer = {
  text: string;
  question: number;
};

export type AnswerData = BaseAnswer & { id: number };
export type AnswerCreateDTO = BaseAnswer & { correct: boolean };
export type AnswerUpdateDTO = Partial<AnswerCreateDTO>;
export type AnswerWithCorrect = AnswerData & { correct: boolean };
