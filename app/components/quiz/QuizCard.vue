<script setup lang="ts">
import type { QuizData } from "~/types/api/Quiz";
import type { LayoutMenuItem } from "~/types/Layout";
import { useQuizStore } from "~/stores/quizStore";
import { useAppToast } from "~/composables/useAppToast";

type Status = {
  severity: "success" | "warn";
  value: "Опубликована" | "Скрыта";
};

const quizStore = useQuizStore();
const { showError, showSuccess } = useAppToast();

const props = defineProps<{ item: QuizData; loading?: boolean }>();

const menu = ref();

const actionMenu = computed<LayoutMenuItem[]>(() => [
  {
    label: "Действия",
    items: [
      {
        icon: props.item.is_active ? "pi pi pi-eye-slash" : "pi pi-eye",
        label: props.item.is_active ? "Скрыть" : "Опубликовать",
        async command() {
          if (props.item.is_active) {
            await hideQuiz(props.item.id);
          } else {
            await showQuiz(props.item.id);
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

const status = computed<Status>(() =>
  props.item.is_active
    ? {
        severity: "success",
        value: "Опубликована"
      }
    : {
        severity: "warn",
        value: "Скрыта"
      }
);

const showQuiz = async (id: number) => {
  try {
    await quizStore.showQuiz(id);
    showSuccess("Получилось!", "Викторина доступна пользователям");
  } catch (e) {
    showError("Не удалось опубликовать викторину");
    throw e;
  }
};

const hideQuiz = async (id: number) => {
  try {
    await quizStore.hideQuiz(id);
    showSuccess("Получилось!", "Викторина скрыта от пользователей");
  } catch (e) {
    showError("Не удалось скрыть викторину");
    throw e;
  }
};

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
          <Tag class="quiz-card__tags-item" :severity="status.severity" :value="status.value"></Tag>
          <Tag
            class="quiz-card__tags-item"
            severity="secondary"
            :value="`Вопросов: ${item.total_questions}`"
          ></Tag>
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
          icon="pi pi-ellipsis-v"
          aria-haspopup="true"
          rounded
          :aria-controls="`overlay_menu-${item.id}`"
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
  box-shadow: var(--shadow-card);
  border-radius: var(--border-radius-primary);

  &__content {
    width: 100%;
    display: flex;
    justify-content: space-between;
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
