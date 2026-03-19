import type { AppRouteWithMeta } from "~/types/App";
import type { MenuItem } from "primevue/menuitem";

export type LayoutMenuItem = MenuItem & AppRouteWithMeta;

export interface LayoutSettings {
  isDarkMode: boolean;
  isSidebarPinned: boolean;
  expandedKeys: string[];
}

export const defaultLayoutSettings: LayoutSettings = {
  isDarkMode: false,
  isSidebarPinned: true,
  expandedKeys: []
};
