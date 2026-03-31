import type { NitroFetchRequest } from "nitropack";
import { createFetchError } from "ofetch";
import AuthRepository from "~/repositories/AuthRepository";
import OrganizationRepository from "~/repositories/OrganizationRepository";
import QuizRepository from "~/repositories/QuizRepository";
import QuestionRepository from "~/repositories/QuestionRepository";
import AnswerRepository from "~/repositories/AnswerRepository";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiUrl;
  let refreshPromise: Promise<void> | null = null;

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

      if (ctx.options.retry === 0) {
        throw error;
      }

      if (!refreshPromise) {
        refreshPromise = $fetch("/v1/auth/token/refresh/", {
          baseURL,
          method: "POST",
          credentials: "include"
        }).finally(() => {
          refreshPromise = null;
        }) as Promise<void>;
      }

      try {
        await refreshPromise;
      } catch {
        throw error;
      }
    }
  });

  return {
    provide: {
      api: apiFetcher,
      repositories: {
        auth: new AuthRepository(apiFetcher),
        organization: new OrganizationRepository(apiFetcher),
        quiz: new QuizRepository(apiFetcher),
        question: new QuestionRepository(apiFetcher),
        answer: new AnswerRepository(apiFetcher)
      }
    }
  };
});
