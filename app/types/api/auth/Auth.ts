import type { AuthPermission } from "~/types/api/auth/AuthPermission";

export type AuthLoginDTO = {
  email: string;
  password: string;
};

export type AuthLoginResponseDTO = {
  access: string;
};

export type AuthRefreshResponseDTO = {
  access: string;
};

export type AuthUserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  full_name: string;

  groups: string[];
  permissions: AuthPermission[];
  is_superuser: boolean;
  is_staff: boolean;

  last_login: string;
  date_joined: string;
};
