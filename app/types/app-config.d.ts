import type { LayoutMenuItem } from "~/types/Layout";

declare module "nuxt/schema" {
  interface AppConfig {
    menu: {
      sidebarMenu: LayoutMenuItem[];
    };
    auth: {
      tokens: {
        accessExpiresAt: number;
        refreshExpiresAt: number;
      };
    };
  }
}

export {};
