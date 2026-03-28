<script setup lang="ts">
import AppLayoutSection from "~/components/layout/app-layout-section.vue";
import { useQuizStore } from "~/stores/quizStore";
import type { QuizData } from "~/types/api/Quiz";

const props = defineProps<{ title?: string }>();

const quizStore = useQuizStore();
const { filters, setFilters } = useQuizFilters();
const { quizList: quizzes, isLoading } = storeToRefs(quizStore);

const drawerVisible = ref(false);
const selectedQuiz = ref<QuizData | null>(null);

const openCreate = () => {
  selectedQuiz.value = null;
  drawerVisible.value = true;
};

const openEdit = (quiz: QuizData) => {
  selectedQuiz.value = quiz;
  drawerVisible.value = true;
};

const onSaved = async () => {
  await quizStore.fetchQuizzes(filters.value);
};

watch(
  filters,
  async (newFilters) => {
    try {
      await quizStore.fetchQuizzes(newFilters);
    } catch (e) {
      console.error(e);
    }
  },
  { immediate: true }
);
</script>

<template>
  <AppLayoutSection class="quiz-section">
    <div class="quiz-section__heading h1">
      <h1 v-if="props.title" class="quiz-section__heading-title">{{ title }}</h1>
      <Button label="Добавить" icon="pi pi-plus" size="small" @click="openCreate" />
    </div>

    <QuizList
      class="quiz-section__content"
      :items="quizzes"
      :loading="isLoading"
      @on-edit-quiz="openEdit"
    />

    <template #aside>
      <QuizFilter
        class="quiz-section__filter"
        :model-value="filters"
        @update:model-value="setFilters"
      />
    </template>
  </AppLayoutSection>

  <QuizDrawer v-model:visible="drawerVisible" :quiz="selectedQuiz" @saved="onSaved" />
</template>

<style scoped lang="scss">
.quiz-section {
  height: 100%;

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
}
</style>
