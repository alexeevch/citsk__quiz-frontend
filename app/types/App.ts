import type { AuthPermissionCode } from "~/types/api/auth/AuthPermission";

export interface AppRouteWithMeta {
  meta?: {
    hidden?: boolean;
    guestOnly?: boolean;
    permissions?: AuthPermissionCode[];
  };
}
