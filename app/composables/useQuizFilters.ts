import type { QuizQueryParams } from "~/types/api/Quiz";

export function useQuizFilters() {
  const route = useRoute();
  const router = useRouter();
  const { isAdmin, user } = storeToRefs(useAuthStore());

  const filters = computed<QuizQueryParams>(() => {
    if (!isAdmin.value) {
      return { organization: user.value?.organization.id };
    }

    return {
      organization: deserializeParam(route.query.organization, "number"),
      is_active: deserializeParam(route.query.is_active, "boolean")
    };
  });

  function setFilters(newFilters: Partial<QuizQueryParams>) {
    if (!isAdmin.value) return;

    router.replace({
      query: {
        ...route.query,
        ...serializeQuery(newFilters)
      }
    });
  }

  return { filters, setFilters };
}
