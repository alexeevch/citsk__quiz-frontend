<script setup lang="ts">
import type { QuizData } from "~/types/api/Quiz";
import type { LayoutMenuItem } from "~/types/Layout";
import { useQuizStore } from "~/stores/quizStore";
import { useAppToast } from "~/composables/useAppToast";
import { useQuizFilters } from "~/composables/useQuizFilters";
import { useQuiz } from "~/composables/useQuiz";

const props = defineProps<{ item: QuizData }>();

const menu = ref();
const isLoading = ref(false);
const quizStore = useQuizStore();
const { status } = useQuiz(props.item);
const { filters } = useQuizFilters();
const { showError, showSuccess } = useAppToast();

const actionMenu = computed<LayoutMenuItem[]>(() => [
  {
    label: "Действия",
    items: [
      {
        icon: props.item.is_active ? "pi pi-eye-slash" : "pi pi-eye",
        label: props.item.is_active ? "Скрыть" : "Опубликовать",
        async command() {
          try {
            isLoading.value = true;
            if (props.item.is_active) {
              await quizStore.hideQuiz(props.item.id);
              showSuccess("Удалось!", "Викторина скрыта от пользователей");
            } else {
              await quizStore.showQuiz(props.item.id);
              showSuccess("Получилось!", "Викторина доступна пользователям");
            }
            await quizStore.fetchQuizzes(filters.value);
          } catch {
            showError(
              props.item.is_active
                ? "Не удалось скрыть викторину"
                : "Не удалось опубликовать викторину"
            );
          } finally {
            isLoading.value = false;
          }
        }
      },
      {
        icon: "pi pi-pencil",
        label: "Редактировать",
        command() {
          emit("onEditQuiz", props.item);
        }
      }
    ]
  }
]);

const toggleActionMenu = (event) => {
  menu.value.toggle(event);
};

const emit = defineEmits<{
  onEditQuiz: [quiz: QuizData];
}>();
</script>

<template>
  <div class="quiz-card">
    <div class="quiz-card__content">
      <div class="quiz-card__body">
        <div class="quiz-card__tags">
          <Tag class="quiz-card__tags-item" :value="`№: ${item.id}`"></Tag>
          <Tag
            class="quiz-card__tags-item"
            severity="secondary"
            :value="`Вопросов: ${item.total_questions}`"
          ></Tag>
          <Tag class="quiz-card__tags-item" :severity="status.severity" :value="status.value"></Tag>
        </div>

        <span class="quiz-card__name">
          {{ item.name }}
        </span>

        <div v-if="item.organization" class="quiz-card__organization">
          <i class="quiz-card__organization-icon pi pi-building"></i>
          <span class="quiz-card__organization-name">{{ item.organization.name }}</span>
        </div>
      </div>
      <div class="quiz-card__actions">
        <Button
          size="small"
          type="button"
          severity="secondary"
          aria-haspopup="true"
          rounded
          :icon="isLoading ? 'pi pi-spin pi-spinner' : 'pi pi-ellipsis-v'"
          :aria-controls="`overlay_menu-${item.id}`"
          :disabled="isLoading"
          @click="toggleActionMenu"
        />
        <Button v-slot="slotProps" as-child size="small" severity="contrast">
          <NuxtLink :to="`/quiz/${item.id}`" :class="slotProps.class">Перейти</NuxtLink>
        </Button>
      </div>
    </div>
    <Menu :id="`overlay_menu-${item.id}`" ref="menu" :model="actionMenu" :popup="true" />
  </div>
</template>

<style scoped lang="scss">
@use "~/assets/styles/common/mixins.scss" as mixins;

.quiz-card {
  display: flex;
  overflow: hidden;
  gap: 1rem;
  padding: var(--padding-card-sm);
  border: 3px solid var(--color-bg-border);
  border-radius: var(--border-radius-primary);

  &__content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__name {
    font-size: pxToRem(16);
    font-weight: 500;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    &-item {
      width: fit-content;
      font-size: pxToRem(12);
    }
  }

  &__organization {
    display: flex;
    gap: 0.5rem;
    color: var(--color-text-gray);
  }

  &__actions {
    height: 100%;
    align-items: flex-end;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
