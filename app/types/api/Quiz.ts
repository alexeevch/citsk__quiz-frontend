import type { OrganizationData } from "~/types/api/Organization";
import type { QuestionData } from "~/types/api/Question";

type BaseQuiz = {
  name: string;
  description?: string;
  total_questions: number;
  is_active: boolean;
};

export type QuizData = BaseQuiz & {
  id: number;
  organization: OrganizationData | null;
  questions: QuestionData[];
};
export type QuizCreateDTO = BaseQuiz & { organization_id: number };
export type QuizUpdateDTO = Partial<QuizCreateDTO>;

export type QuizQueryParams = {
  is_active?: boolean;
  organization?: number;
};
