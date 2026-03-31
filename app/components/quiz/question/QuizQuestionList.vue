<script setup lang="ts">
import type { QuestionData } from "~/types/api/Question";

const props = defineProps<{ items: QuestionData[]; loading?: boolean }>();
</script>

<template>
  <div class="question-list">
    <QuizQuestionItem v-for="item in items" :key="item.id" :item class="question-list__item" />
  </div>
</template>

<style scoped lang="scss">
.question-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
