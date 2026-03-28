<script setup lang="ts">
import AppLayoutSection from "~/components/layout/app-layout-section.vue";
import { useQuizStore } from "~/stores/quizStore";

const { filters, setFilters } = useQuizFilters();

const props = defineProps<{ title?: string }>();

const quizStore = useQuizStore();
const { quizList: quizzes, isLoading } = storeToRefs(quizStore);

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
    <h1 v-if="props.title" class="quiz-section__heading">{{ title }}</h1>
    <QuizList class="quiz-section__content" :items="quizzes" :loading="isLoading" />
    <template #aside>
      <QuizFilter
        class="quiz-section__filter"
        :model-value="filters"
        @update:model-value="setFilters"
      />
    </template>
  </AppLayoutSection>
</template>

<style scoped lang="scss">
.quiz-section {
  height: 100%;

  &__heading {
    grid-column: span 6;
  }

  &__content {
    grid-column: span 6;
  }
}
</style>
