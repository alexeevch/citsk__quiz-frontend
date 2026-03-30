import { useAuthStore } from "~/stores/authStore";
import { storeToRefs } from "pinia";
import type { LayoutMenuItem } from "~/types/Layout";

export const useAuthMenu = (menu: LayoutMenuItem[]): Ref<LayoutMenuItem[]> => {
  const authStore = useAuthStore();
  const { isAdmin, isAuthenticated } = storeToRefs(authStore);

  const hasAccess = (item: LayoutMenuItem): boolean => {
    const meta = item.meta;

    if (meta?.hidden) return false;
    if (meta?.guestOnly) return !isAuthenticated.value;
    if (meta?.adminOnly) return !!isAdmin.value;

    if (meta?.permissions) return authStore.canAll(...meta.permissions);

    return true;
  };

  const filterMenu = (items: LayoutMenuItem[]): LayoutMenuItem[] => {
    return items
      .map((item) => {
        const children = item.items ? filterMenu(item.items as LayoutMenuItem[]) : undefined;

        if (!hasAccess(item)) return null;

        if (children !== undefined && children.length === 0) return null;

        return { ...item, items: children };
      })
      .filter(Boolean) as LayoutMenuItem[];
  };

  return computed(() => filterMenu(menu));
};
