import type { Organization } from "~/types/api/Organization";

export const PERMISSIONS = [
  "api.add_organization",
  "api.view_maxuser",
  "api.view_customuser",
  "api.change_answer",
  "api.delete_useranswer",
  "api.view_useranswer",
  "api.add_quiz",
  "api.view_userresult",
  "api.add_userresult",
  "api.change_maxuser",
  "api.add_maxuser",
  "api.delete_maxuser",
  "api.change_question",
  "api.change_useranswer",
  "api.add_useranswer",
  "api.delete_winner",
  "api.add_question",
  "api.change_organization",
  "api.change_customuser",
  "api.view_quiz",
  "api.view_winner",
  "api.delete_answer",
  "api.add_customuser",
  "api.add_winner",
  "api.view_question",
  "api.change_winner",
  "api.change_userresult",
  "api.change_quiz",
  "api.view_organization",
  "api.delete_organization",
  "api.delete_quiz",
  "api.delete_userresult",
  "api.add_answer",
  "api.delete_customuser",
  "api.delete_question",
  "api.view_answer",
  "auth.view_permission",
  "auth.view_group",
  "auth.add_group",
  "auth.delete_group",
  "auth.change_permission",
  "auth.add_permission",
  "auth.delete_permission",
  "auth.change_group",
  "admin.view_logentry",
  "admin.add_logentry",
  "admin.change_logentry",
  "admin.delete_logentry",
  "sessions.add_session",
  "sessions.view_session",
  "sessions.change_session",
  "sessions.delete_session",
  "contenttypes.view_contenttype",
  "contenttypes.delete_contenttype",
  "contenttypes.change_contenttype",
  "contenttypes.add_contenttype",
  "authtoken.view_token",
  "authtoken.change_tokenproxy",
  "authtoken.delete_token",
  "authtoken.change_token",
  "authtoken.view_tokenproxy",
  "authtoken.add_tokenproxy",
  "authtoken.delete_tokenproxy",
  "authtoken.add_token",
  "token_blacklist.delete_outstandingtoken",
  "token_blacklist.change_outstandingtoken",
  "token_blacklist.view_blacklistedtoken",
  "token_blacklist.delete_blacklistedtoken",
  "token_blacklist.add_blacklistedtoken",
  "token_blacklist.add_outstandingtoken",
  "token_blacklist.change_blacklistedtoken",
  "token_blacklist.view_outstandingtoken"
] as const;

export type AuthPermissionCode = (typeof PERMISSIONS)[number];

export interface AuthPermission {
  codename: AuthPermissionCode;
  name: string;
}

export type AuthLoginDTO = {
  email: string;
  password: string;
};

export type AuthLoginResponseDTO = {
  user: AuthUserData;
};

export type AuthUserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  full_name: string;
  organization: Organization;

  groups: string[];
  permissions: AuthPermission[];
  is_superuser: boolean;
  is_staff: boolean;

  last_login: string;
  date_joined: string;
};
