type ApiModel =
  | "userresult"
  | "customuser"
  | "quiz"
  | "useranswer"
  | "question"
  | "answer"
  | "organization"
  | "winner"
  | "maxuser"
  | "userresult";

type AuthModel = "group" | "permission";
type AdminModel = "logentry";
type SessionModel = "session";
type ContentTypeModel = "contenttype";

type Action = "view" | "add" | "change" | "delete";

export type AuthPermissionCode =
  | `api.${Action}_${ApiModel}`
  | `auth.${Action}_${AuthModel}`
  | `admin.${Action}_${AdminModel}`
  | `sessions.${Action}_${SessionModel}`
  | `contenttypes.${Action}_${ContentTypeModel}`;

export interface AuthPermission {
  codename: AuthPermissionCode;
  name: string;
}
