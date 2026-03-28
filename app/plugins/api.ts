import type { NitroFetchRequest } from "nitropack";
import { createFetchError } from "ofetch";
import AuthRepository from "~/repositories/AuthRepository";
import OrganizationRepository from "~/repositories/OrganizationRepository";
import QuizRepository from "~/repositories/QuizRepository";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiUrl;
  const refreshEndpoing = "/v1/auth/token/refresh/";
  if (!baseURL) {
    throw new Error("Missing public.apiUrl in runtime config");
  }

  const apiFetcher = $fetch.create<NitroFetchRequest>({
    baseURL,
    redirect: "manual",
    credentials: "include",
    onRequest(request) {
      request.options.headers.set("Accept", "application/json");
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

      await $fetch(refreshEndpoing, {
        baseURL,
        method: "POST",
        credentials: "include"
      });

      const newOptions = {
        ...ctx.options,
        method: ctx.options.method as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        credentials: "include" as RequestCredentials
      };

      return $fetch(ctx.request, newOptions);
    }
  });

  return {
    provide: {
      api: apiFetcher,
      repositories: {
        auth: new AuthRepository(apiFetcher),
        organization: new OrganizationRepository(apiFetcher),
        quiz: new QuizRepository(apiFetcher)
      }
    }
  };
});
