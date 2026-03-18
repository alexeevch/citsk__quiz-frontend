import type { Permission } from "~/types/api/auth/persmissions";

export interface AppRouteWithMeta {
  meta?: {
    hidden?: boolean;
    guestOnly?: boolean;
    permissions?: Permission[];
  };
}
