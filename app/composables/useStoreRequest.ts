export function useStoreRequest() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function load<T>(fn: () => Promise<T>, target?: Ref<T | null>): Promise<T> {
    isLoading.value = true;
    error.value = null;

    try {
      const result = await fn();
      if (target) target.value = result;
      return result;
    } catch (e: unknown) {
      error.value = "Непредвиденная ошибка";
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    error,
    load
  };
}
