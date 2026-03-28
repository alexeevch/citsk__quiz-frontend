<script setup lang="ts">
import type { QuizData } from "~/types/api/Quiz";
import QuizCard from "~/components/quiz/QuizCard.vue";

defineProps<{ items: QuizData[]; loading?: boolean }>();

const emit = defineEmits<{
  onEditQuiz: [quiz: QuizData];
}>();
</script>

<template>
  <div class="quiz-list">
    <Transition name="fade" mode="out-in">
      <!-- Скелетон -->
      <div v-if="loading" key="skeleton" class="quiz-list__skeleton">
        <Skeleton style="height: 5rem" />
        <Skeleton style="height: 5rem" />
        <Skeleton style="height: 5rem" />
        <Skeleton style="height: 5rem" />
      </div>

      <!-- Пустой список -->
      <div v-else-if="!items.length" key="empty" class="quiz-list__empty">
        <i class="pi pi-inbox quiz-list__empty-icon" />
        <p class="quiz-list__empty-text">Викторины не найдены</p>
      </div>

      <!-- Список -->
      <div v-else class="quiz-list__items">
        <QuizCard
          v-for="item in items"
          :key="item.id"
          :item
          @on-edit-quiz="emit('onEditQuiz', $event)"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.quiz-list {
  display: flex;
  flex-direction: column;

  &__skeleton {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 3rem 1rem;
    color: var(--color-text-gray);

    &-icon {
      font-size: 2.5rem;
      opacity: 0.4;
    }

    &-text {
      font-size: pxToRem(14);
      opacity: 0.6;
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-duration) ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
