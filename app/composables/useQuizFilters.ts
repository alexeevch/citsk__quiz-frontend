import type { QuizQueryParams } from "~/types/api/Quiz";

type activityFilter = {
  label: string;
  value?: boolean;
};

export function useQuizFilters() {
  const route = useRoute();
  const router = useRouter();

  const { isAdmin, user } = storeToRefs(useAuthStore());

  const activityFilters = ref<activityFilter[]>([
    {
      label: "Скрытые",
      value: false
    },
    {
      label: "Активные",
      value: true
    }
  ]);

  const filters = computed<QuizQueryParams>(() => {
    return {
      organization: isAdmin.value
        ? deserializeParam(route.query.organization, "number")
        : user.value?.organization.id,
      is_active: deserializeParam(route.query.is_active, "boolean"),
      order: deserializeParam(route.query.order, "string") ?? "-id"
    };
  });

  function setFilters(newFilters: Partial<QuizQueryParams>) {
    const serializedQuery = serializeQuery(newFilters);

    if (!isAdmin.value) {
      serializedQuery.organization = user.value?.organization.id;
    }

    router.replace({
      query: {
        ...route.query,
        ...serializedQuery
      }
    });
  }

  return { activityFilters, filters, setFilters };
}
