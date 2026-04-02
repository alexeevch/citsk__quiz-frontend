<script setup lang="ts">
import type { QuestionData } from "~/types/api/Question";

defineProps<{ items: QuestionData[]; loading?: boolean }>();

const emit = defineEmits<{
  onEditQuestion: [question: QuestionData];
  onDeleteQuestion: [id: number];
}>();
</script>

<template>
  <div class="question-list">
    <QuestionItem
      v-for="item in items"
      :key="item.id"
      :item
      class="question-list__item"
      @on-edit-question="emit('onEditQuestion', $event)"
      @on-delete-question="emit('onDeleteQuestion', $event)"
    />
  </div>
</template>

<style scoped lang="scss">
.question-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
