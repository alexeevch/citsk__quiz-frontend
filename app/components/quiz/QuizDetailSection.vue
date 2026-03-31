<script setup lang="ts">
import type { QuizData } from "~/types/api/Quiz";
import AppLayoutSection from "~/components/layout/app-layout-section.vue";

const props = defineProps<{ quiz: QuizData | null; quizLoading?: boolean }>();

const authStore = useAuthStore();
const quizRef = toRef(props, "quiz");
const { status } = useQuiz(quizRef);

const emit = defineEmits<{
  onQuizReload: [];
}>();
</script>

<template>
  <AppLayoutSection class="quiz-section">
    <template #default>
      <div class="quiz-section__body">
        <Transition name="slide-up" mode="out-in">
          <template v-if="props.quizLoading">
            <div key="loading" class="quiz-section__skeletons">
              <Skeleton height="3rem" width="80%" />
              <Skeleton height="5rem" width="100%" />
            </div>
          </template>

          <div v-else-if="!quiz" key="error" class="quiz-section__error">
            <i class="pi pi-exclamation-circle quiz-section__error-icon" />
            <p class="quiz-section__error-text">Не удалось загрузить викторину</p>
            <Button label="Попробовать снова" severity="secondary" @click="emit('onQuizReload')" />
          </div>

          <div v-else key="content" class="quiz-section__content">
            <div class="quiz-section__heading h1">
              <h1 class="quiz-section__heading-title">
                {{ quiz?.name }}
              </h1>
              <Button
                class="quiz-section__heading-button"
                label="Вопрос"
                icon="pi pi-plus"
                size="small"
                fluid
                :disabled="!authStore.can('api.add_question')"
              />
            </div>
            <div class="quiz-section__description">
              <span class="quiz-section__description-title"> Описание викторины: </span>
              <span class="quiz-section__description-value">
                {{ quiz?.description ?? "Отсутствует" }}
              </span>
            </div>

            <div class="quiz-section__questions">
              <div v-if="!props.quiz?.questions">Вопросов нет</div>
              <QuestionList v-else :items="props.quiz.questions" />
            </div>
          </div>
        </Transition>
      </div>
    </template>

    <template #aside>
      <div class="quiz-section__aside">
        <Transition name="slide-up" mode="out-in">
          <div v-if="props.quizLoading" key="loading" class="quiz-section__aside-skeletons">
            <Skeleton height="2rem" width="100%" />
            <Skeleton height="2rem" width="100%" />
          </div>

          <div v-else class="quiz-section__aside-item">
            <Tag
              v-if="status"
              class="quiz-section__status"
              :severity="status.severity"
              :value="status.value"
            />
          </div>
        </Transition>
      </div>
    </template>
  </AppLayoutSection>
</template>

<style scoped lang="scss">
@use "~/assets/styles/common/mixins" as mixins;

.quiz-section {
  &__skeletons,
  &__aside-skeletons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__body {
    grid-column: span 6;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__heading {
    display: flex;
    gap: 1rem;
    justify-content: space-between;

    @include mixins.screensFrom("sm") {
      flex-direction: column;
    }

    &-title {
      margin: 0;
    }

    &-button {
      width: fit-content;
      height: fit-content;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: fluid(32, 16);
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    &-title {
      color: var(--color-text-gray);
    }

    &-value {
      @include mixins.fluid-text(16, 14);
    }
  }

  &__status {
    height: fit-content;
  }

  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 0;
    color: var(--p-text-muted-color);

    &-icon {
      font-size: 3rem;
    }

    &-text {
      margin: 0;
      font-size: 1.1rem;
    }
  }

  &__aside {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
