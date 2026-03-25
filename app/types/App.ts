import type { AuthPermissionCode } from "~/types/api/Auth";

export interface AppRouteWithMeta {
  meta?: {
    hidden?: boolean;
    guestOnly?: boolean;
    permissions?: AuthPermissionCode[];
  };
}
