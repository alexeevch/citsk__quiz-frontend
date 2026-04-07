<script setup lang="ts">
import AppLayoutSection from "~/components/layout/app-layout-section.vue";
import { useQuizStore } from "~/stores/quizStore";
import type { QuizData, QuizQueryParams } from "~/types/api/Quiz";
import { useQuizPagination } from "~/composables/useQuizPagination";
import type { PageState } from "primevue";

const props = defineProps<{ title?: string }>();

const authStore = useAuthStore();
const quizStore = useQuizStore();
const { showError } = useAppToast();
const { pagination, setPagination, resetPagination } = useQuizPagination();
const { filters, setFilters } = useQuizFilters(resetPagination);
const { quizList: quizzes, isLoading, error } = storeToRefs(quizStore);

const drawerVisible = ref(false);
const selectedQuiz = ref<QuizData | null>(null);

const queryParams = computed<QuizQueryParams>(() => {
  return {
    ...filters.value,
    ...pagination.value
  };
});

const openCreate = () => {
  selectedQuiz.value = null;
  drawerVisible.value = true;
};

const openEdit = (quiz: QuizData) => {
  selectedQuiz.value = quiz;
  drawerVisible.value = true;
};

const onSaved = async () => {
  await quizStore.fetchQuizzes(queryParams.value);
};

const onPageChange = async (event: PageState) => {
  await setPagination({
    page: event.page + 1,
    limit: event.rows
  });
};

watch(
  queryParams,
  async (newFilters) => {
    try {
      await quizStore.fetchQuizzes(newFilters);
    } catch {
      //TODO: #bug: Не появляется уведомление при первом открытии страницы
      showError("Не удалось загрузить викторины", error.value ?? "Непредвиденная ошибка");
    }
  },
  { immediate: true }
);
</script>

<template>
  <AppLayoutSection class="quiz-section">
    <template #default>
      <div class="quiz-section__heading h1">
        <h1 v-if="props.title" class="quiz-section__heading-title">{{ title }}</h1>
        <Button
          label="Добавить"
          icon="pi pi-plus"
          size="small"
          :disabled="!authStore.can('api.add_quiz')"
          @click="openCreate"
        />
      </div>

      <QuizList
        class="quiz-section__content"
        :items="quizzes?.items || []"
        :loading="isLoading"
        @on-edit-quiz="openEdit"
      />

      <Paginator
        class="quiz-section__paginator"
        :first="(pagination.page - 1) * pagination.limit"
        :rows="pagination.limit"
        :total-records="quizzes?.meta.total"
        :rows-per-page-options="[12, 24, 48]"
        @page="onPageChange"
      />
    </template>

    <template #aside>
      <QuizFilter
        class="quiz-section__filter"
        :model-value="filters"
        @update:model-value="setFilters"
      />
    </template>
  </AppLayoutSection>

  <LazyQuizDrawer v-model:visible="drawerVisible" :quiz="selectedQuiz" @saved="onSaved" />
</template>

<style scoped lang="scss">
.quiz-section {
  height: 100%;
  position: relative;

  &__heading {
    grid-column: span 6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    &-title {
      margin: 0;
      padding: 0;
    }
  }

  &__filter {
    position: sticky;
    top: 0;
  }

  &__content {
    grid-column: span 6;
  }

  &__paginator {
    width: 100%;
    grid-column: span 6;
    position: sticky;
    bottom: 0;
    background-color: color-mix(in srgb, var(--color-bg-card) 60%, transparent);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-radius: var(--border-radius-primary);
    border: 3px solid color-mix(in srgb, var(--color-bg-border) 50%, transparent);
  }
}
</style>
