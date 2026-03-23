import type { NitroFetchRequest } from "nitropack";
import { createFetchError } from "ofetch";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiUrl;
  const authStore = useAuthStore();

  if (!baseURL) {
    throw new Error("Missing public.apiUrl in runtime config");
  }

  const apiFetcher = $fetch.create<NitroFetchRequest>({
    baseURL,
    redirect: "manual",
    credentials: "include",
    onRequest(request) {
      request.options.headers.set("Accept", "application/json");

      if (authStore.accessToken) {
        request.options.headers.set("Authorization", `Bearer ${authStore.accessToken}`);
      }
    },
    async onResponseError(ctx) {
      const error = createFetchError(ctx);

      if (error.status !== 401) {
        throw error;
      }

      if (ctx.options.retry) {
        throw error;
      }
      ctx.options.retry = 1;

      const newAccessToken = await authStore.refreshAccessToken();

      const newOptions = {
        ...ctx.options,
        headers: {
          ...ctx.options.headers,
          authorization: `Bearer ${newAccessToken}`
        },
        method: ctx.options.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        credentials: "include" as RequestCredentials
      };

      return $fetch(ctx.request, newOptions);
    }
  });

  return {
    provide: {
      apiFetcher
    }
  };
});
