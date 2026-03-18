import type { AppRouteWithMeta } from "~/types/App";
import type { MenuItem } from "primevue/menuitem";

export type AppMenuItem = MenuItem & AppRouteWithMeta;

export type LayoutSidebarMode = "static" | "overlay" | "slim";

export interface LayoutSettings {
  isDarkMode: boolean;
  sidebarOpen: boolean;
  sidebarMode: LayoutSidebarMode;
  sidebarWidth: number;
  expandedKeys: string[];
}

export const defaultLayoutSettings: LayoutSettings = {
  isDarkMode: false,
  sidebarOpen: true,
  sidebarMode: "static",
  sidebarWidth: 260,
  expandedKeys: []
};
