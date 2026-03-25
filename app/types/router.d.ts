import type { AuthPermissionCode } from "~/types/api/Auth";

declare module "#app" {
  interface PageMeta {
    permissions?: AuthPermissionCode[];
    permissionMode?: "any" | "all";
    guestOnly?: boolean;
    public?: boolean;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    permissions?: AuthPermissionCode[];
    permissionMode?: "any" | "all";
    guestOnly?: boolean;
    public?: boolean;
  }
}

export {};
