import { defineStore } from "pinia";
import { useStoreRequest } from "~/composables/useStoreRequest";
import { FetchError } from "ofetch";
import type {
  AuthLoginDTO,
  AuthLoginResponseDTO,
  AuthRefreshResponseDTO,
  AuthUserData
} from "~/types/api/auth/Auth";
import type { AuthPermissionCode } from "~/types/api/auth/AuthPermission";

export const useAuthStore = defineStore("auth", () => {
  const { $apiFetcher } = useNuxtApp();
  const { error, isLoading, load } = useStoreRequest();

  const user = ref<AuthUserData | null>(null);
  const accessToken = ref<string | null>(null);

  const isRefreshing = ref(false);
  const refreshPromise = ref<Promise<string> | null>(null);
  const isInitialized = ref(false);
  const initPromise = ref<Promise<void> | null>(null);

  const isAuthenticated = computed(() => {
    return !!accessToken.value;
  });
  const userPermissions = computed(() => {
    return user.value?.permissions || [];
  });

  function setAuth(data: { user: AuthUserData; accessToken: string }) {
    user.value = data.user;
    accessToken.value = data.accessToken;
  }

  function clearAuth() {
    user.value = null;
    accessToken.value = null;
    isRefreshing.value = false;
    refreshPromise.value = null;
  }

  async function refreshAccessToken(): Promise<string> {
    if (isRefreshing.value && refreshPromise.value) {
      return refreshPromise.value;
    }

    isRefreshing.value = true;

    refreshPromise.value = (async () => {
      try {
        const tokens = await load<AuthRefreshResponseDTO>(() =>
          $apiFetcher<AuthRefreshResponseDTO>("/v1/auth/refresh/", {
            method: "POST"
          })
        );

        const user = await fetchUser();

        setAuth({
          user,
          accessToken: tokens.access
        });

        return tokens.access;
      } catch (error) {
        clearAuth();
        throw error;
      } finally {
        isRefreshing.value = false;
        refreshPromise.value = null;
      }
    })();

    return refreshPromise.value;
  }

  async function fetchUser() {
    try {
      return await load<AuthUserData>(() =>
        $apiFetcher<AuthUserData>("/v1/auth/me/", {
          method: "GET"
        })
      );
    } catch (error) {
      clearAuth();
      throw error;
    }
  }

  async function login(credentials: AuthLoginDTO) {
    try {
      const tokens = await load<AuthLoginResponseDTO>(() =>
        $apiFetcher<AuthLoginResponseDTO>("/v1/auth/refresh/", {
          method: "POST",
          body: credentials
        })
      );
      const user = await fetchUser();

      const authData = {
        user,
        accessToken: tokens.access
      };

      setAuth(authData);

      return authData;
    } catch (e) {
      if (!(e instanceof FetchError)) {
        error.value = "Неизвестная ошибка, попробуйте позже";
        throw e;
      }

      if (e.statusCode === 401) {
        error.value = "Неверные учетные данные";
      }
      throw e;
    }
  }

  async function logout() {
    // TODO: make server query
    clearAuth();
  }

  async function initAuth() {
    if (isInitialized.value) return;
    if (initPromise.value) return initPromise.value;

    initPromise.value = (async () => {
      try {
        const headers = useRequestHeaders(["cookie"]);
        const tokens = await $apiFetcher<AuthLoginResponseDTO>("/api/v1/refresh/", {
          method: "GET",
          credentials: "include",
          headers
        });
        const user = await fetchUser();

        setAuth({
          user,
          accessToken: tokens.access
        });
      } catch {
        clearAuth();
      } finally {
        isInitialized.value = true;
        initPromise.value = null;
      }
    })();

    return initPromise.value;
  }

  function hasPermission(permission: AuthPermissionCode | AuthPermissionCode[]): boolean {
    if (!user.value) return false;

    const permissions = Array.isArray(permission) ? permission : [permission];
    return permissions.some((p) => userPermissions.value.some((up) => up.codename === p));
  }

  return {
    user,
    accessToken,
    isLoading,
    error,
    isRefreshing: readonly(isRefreshing),
    isInitialized: readonly(isInitialized),

    isAuthenticated,
    userPermissions,

    setAuth,
    clearAuth,
    initAuth,
    refreshAccessToken,
    login,
    logout,
    hasPermission
  };
});
