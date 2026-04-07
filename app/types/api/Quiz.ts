import type { OrganizationData } from "~/types/api/Organization";
import type { QuestionData } from "~/types/api/Question";
import type { ApiQueryOrder, ApiQueryPaginator } from "~/types/api/Common";

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

export type QuizQueryParams = QuizQueryFilter & ApiQueryPaginator;

export type QuizQueryFilter = {
  is_active?: boolean;
  organization?: number;
  order?: QuizQueryOrder;
};

export type QuizQueryOrder =
  | ApiQueryOrder<"organization">
  | ApiQueryOrder<"name">
  | ApiQueryOrder<"id">;
