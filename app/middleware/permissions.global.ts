import { useAuthStore } from "~/stores/authStore";
import type { AuthPermissionCode } from "~/types/api/Auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const permissions = to.meta.permissions as AuthPermissionCode[];

  if (!permissions || permissions.length === 0) return;

  const mode = to.meta.permissionMode ?? "any";
  const hasAccess =
    mode === "all" ? authStore.canAll(...permissions) : authStore.canAny(...permissions);

  if (!hasAccess) {
    return navigateTo("/");
  }
});
