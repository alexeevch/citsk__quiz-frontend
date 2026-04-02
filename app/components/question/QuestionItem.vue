<script setup lang="ts">
import type { LayoutMenuItem } from "~/types/Layout";
import type { QuestionData } from "~/types/api/Question";

const props = defineProps<{ item: QuestionData }>();

const menu = ref();

const actionMenu = computed<LayoutMenuItem[]>(() => [
  {
    label: "Действия",
    items: [
      {
        icon: "pi pi-pencil",
        label: "Редактировать",
        command() {
          emit("onEditQuestion", props.item);
        }
      },
      {
        icon: "pi pi-trash",
        label: "Удалить",
        command() {
          emit("onDeleteQuestion", props.item.id);
        }
      }
    ]
  }
]);

const toggleActionMenu = (event) => {
  menu.value.toggle(event);
};

const emit = defineEmits<{
  onEditQuestion: [question: QuestionData];
  onDeleteQuestion: [id: number];
}>();

//TODO: feat: Обработать isLoading, чтобы кнопка меню становилась неактивной при удалении/обновлении
</script>

<template>
  <div class="question">
    <div class="question__header">
      <div class="question__header-name">{{ item.question }}</div>
      <div class="question__header-menu-btn">
        <Button
          size="small"
          type="button"
          severity="secondary"
          aria-haspopup="true"
          rounded
          icon="pi pi-ellipsis-v"
          :aria-controls="`overlay_menu-${item.id}`"
          @click="toggleActionMenu"
        />
      </div>
    </div>
    <div class="question__body">
      <div v-if="item.answers.length" class="question__answer-list">
        <div
          v-for="answer in item.answers"
          :key="answer.id"
          class="question__answer"
          :class="answer.correct ? 'question__answer--correct' : ''"
        >
          <div
            class="question__answer-status"
            :class="
              answer.correct
                ? 'question__answer-status--correct'
                : 'question__answer-status--incorrect'
            "
          ></div>
          <div class="question__answer-name">
            {{ answer.text }}
          </div>
        </div>
      </div>
      <div v-else class="question__answers">Вопросов еще нет</div>
    </div>
    <Menu :id="`overlay_menu-${item.id}`" ref="menu" :model="actionMenu" :popup="true" />
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/styles/common/mixins" as mixins;

.question {
  padding: var(--padding-card-sm);
  border-radius: var(--border-radius-primary);
  border: 2px solid var(--color-bg-border);

  &__header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    &-name {
      white-space: pre-line;
      @include mixins.fluid-text(16, 14);
    }
  }

  &__body {
    margin-top: 1rem;
  }

  &__answer-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__answer {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    gap: 1rem;
    border-radius: var(--border-radius-primary);
    color: var(--color-text-danger);
    font-weight: 500;
    background-color: var(--color-bg-danger);

    @include mixins.fluid-text(14, 12);

    &--correct {
      color: var(--color-text-success);
      background-color: var(--color-bg-success);
    }

    &-status {
      width: fluid(8, 6);
      height: fluid(8, 6);
      min-width: fluid(8, 6);
      min-height: fluid(8, 6);
      border-radius: 100%;

      &--correct {
        background-color: var(--color-text-success);
      }

      &--incorrect {
        background-color: var(--color-text-danger);
      }
    }
  }
}
</style>
