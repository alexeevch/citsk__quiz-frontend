import type { AuthPermissionCode } from "~/types/api/AuthPermission";

export interface AppRouteWithMeta {
  meta?: {
    hidden?: boolean;
    guestOnly?: boolean;
    permissions?: AuthPermissionCode[];
  };
}
