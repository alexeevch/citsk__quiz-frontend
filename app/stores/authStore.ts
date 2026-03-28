import { defineStore } from "pinia";
import { useStoreRequest } from "~/composables/useStoreRequest";
import type {
  AuthLoginDTO,
  AuthLoginResponseDTO,
  AuthPermissionCode,
  AuthUserData
} from "~/types/api/Auth";

export const useAuthStore = defineStore("auth", () => {
  const { $repositories } = useNuxtApp();
  const { error, isLoading, load } = useStoreRequest();
  const user = ref<AuthUserData | null>(null);

  const isRefreshing = ref(false);
  const refreshPromise = ref<Promise<void> | null>(null);
  const isInitialized = ref(false);
  const initPromise = ref<Promise<void> | null>(null);

  const isAuthenticated = computed(() => {
    return !!user.value;
  });
  const permissionSet = computed(
    () => new Set(user.value?.permissions.map((p) => p.codename) ?? [])
  );
  const isAdmin = computed(() => user.value?.is_staff || user.value?.is_superuser);

  async function fetchUser() {
    try {
      const response = await load<AuthUserData>(() => $repositories.auth.getUser());
      user.value = response;

      return response;
    } catch (error) {
      clearAuth();
      throw error;
    }
  }

  async function login(credentials: AuthLoginDTO) {
    try {
      const response = await load<AuthLoginResponseDTO>(() =>
        $repositories.auth.login(credentials)
      );

      user.value = response.user;
      return response.user;
    } catch (e) {
      if (!(e instanceof AppApiError)) {
        error.value = "Неизвестная ошибка, попробуйте позже";
        throw e;
      }

      if (e.statusCode === 400) {
        error.value = "Неверные учетные данные";
      }
      throw e;
    }
  }

  async function logout() {
    await load(() => $repositories.auth.logout());
    clearAuth();
  }

  function clearAuth() {
    user.value = null;
    isRefreshing.value = false;
    refreshPromise.value = null;
  }

  async function initAuth() {
    if (isInitialized.value) return;
    if (initPromise.value) return initPromise.value;

    initPromise.value = (async () => {
      try {
        await load(() => $repositories.auth.refresh());
        user.value = await fetchUser();
      } catch {
        clearAuth();
      } finally {
        isInitialized.value = true;
        initPromise.value = null;
      }
    })();

    return initPromise.value;
  }

  function can(permission: AuthPermissionCode): boolean {
    if (user.value?.is_superuser) return true;
    return permissionSet.value.has(permission);
  }

  function canAny(...permissions: AuthPermissionCode[]): boolean {
    return permissions.some(can);
  }

  function canAll(...permissions: AuthPermissionCode[]): boolean {
    return permissions.every(can);
  }

  return {
    user,
    isLoading,
    error,
    isRefreshing: readonly(isRefreshing),
    isInitialized: readonly(isInitialized),

    isAuthenticated,
    permissionSet,
    isAdmin,

    clearAuth,
    initAuth,
    login,
    logout,
    can,
    canAll,
    canAny
  };
});
