import type { ApiQueryPaginator } from "~/types/api/Common";
import { serializeQuery } from "~/utils/querySerializer";

const DEFAULT_PAGINATION: Required<ApiQueryPaginator> = {
  page: 1,
  limit: 12
};

export const useQuizPagination = () => {
  const route = useRoute();
  const router = useRouter();

  const pagination = computed<Required<ApiQueryPaginator>>(() => {
    return {
      page: deserializeParam(route.query.page, "number") ?? DEFAULT_PAGINATION.page,
      limit: deserializeParam(route.query.limit, "number") ?? DEFAULT_PAGINATION.limit
    };
  });

  async function setPagination(newPagination: ApiQueryPaginator) {
    await router.replace({
      query: {
        ...route.query,
        ...serializeQuery(newPagination)
      }
    });
  }

  async function resetPagination() {
    await router.replace({
      query: {
        ...route.query,
        ...serializeQuery({
          page: DEFAULT_PAGINATION.page,
          limit: pagination.value.limit
        })
      }
    });
  }

  return { pagination, resetPagination, setPagination };
};
