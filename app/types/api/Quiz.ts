import type { OrganizationData } from "~/types/api/Organization";
import type { AnswerWithCorrect } from "~/types/api/Answer";
import type { QuestionData } from "~/types/api/Question";

type BaseQuiz = {
  name: string;
  description?: string;
  total_questions: number;
  is_active: boolean;
};

export type QuizQuestion = QuestionData & { answers: AnswerWithCorrect[] };
export type QuizData = BaseQuiz & {
  id: number;
  organization: OrganizationData | null;
  questions: QuizQuestion[];
};
export type QuizCreateDTO = BaseQuiz & { organization_id: number };
export type QuizUpdateDTO = Partial<QuizCreateDTO>;

export type QuizQueryParams = {
  is_active?: boolean;
  organization?: number;
};
