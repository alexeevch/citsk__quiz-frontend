import { QuizPermissions } from "~/types/api/auth/persmissions/QuizPermissions";
import { QuestionPermissions } from "~/types/api/auth/persmissions/QuestionPermissions";
import { AnswerPermissions } from "~/types/api/auth/persmissions/AnswerPermissions";
import { CustomUserPermissions } from "~/types/api/auth/persmissions/CustomUserPermissions";
import { OrganizationPermissions } from "~/types/api/auth/persmissions/OrganizationPermissions";
import { UserResultPermissions } from "~/types/api/auth/persmissions/UserResultPermissions";
import { UserAnswerPermissions } from "~/types/api/auth/persmissions/UserAnswerPermissions";
import { AuthPermissions } from "~/types/api/auth/persmissions/AuthPermissions";

export const Permissions = {
  Quiz: QuizPermissions,
  Question: QuestionPermissions,
  Answer: AnswerPermissions,
  CustomUser: CustomUserPermissions,
  Organization: OrganizationPermissions,
  UserResult: UserResultPermissions,
  UserAnswer: UserAnswerPermissions,
  Auth: AuthPermissions
} as const;

export type Permission =
  | QuizPermissions
  | QuestionPermissions
  | AnswerPermissions
  | CustomUserPermissions
  | OrganizationPermissions
  | UserResultPermissions
  | UserAnswerPermissions
  | AuthPermissions;
