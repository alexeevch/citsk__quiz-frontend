import type { QuizQueryFilter } from "~/types/api/Quiz";

type activityFilter = {
  label: string;
  value?: boolean;
};

const DEFAULT_FILTERS: QuizQueryFilter = {
  order: "-id",
  is_active: undefined,
  organization: undefined
};

export function useQuizFilters(onFiltersChange?: () => void) {
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

  const filters = computed<QuizQueryFilter>(() => {
    return {
      organization: isAdmin.value
        ? deserializeParam(route.query.organization, "number")
        : user.value?.organization.id,
      is_active: deserializeParam(route.query.is_active, "boolean") ?? DEFAULT_FILTERS.is_active,
      order: deserializeParam(route.query.order, "string") ?? DEFAULT_FILTERS.order
    };
  });

  async function setFilters(newFilters: Partial<QuizQueryFilter>) {
    const serializedQuery = serializeQuery(newFilters);

    if (!isAdmin.value) {
      serializedQuery.organization = user.value?.organization.id;
    }

    await router.replace({
      query: {
        ...route.query,
        ...serializedQuery
      }
    });

    onFiltersChange?.();
  }

  async function resetFilters() {
    await router.replace({
      query: serializeQuery({
        ...route.query,
        ...DEFAULT_FILTERS,
        organization: isAdmin.value ? DEFAULT_FILTERS.organization : user.value?.organization.id
      })
    });

    onFiltersChange?.();
  }

  return { activityFilters, filters, setFilters, resetFilters };
}
