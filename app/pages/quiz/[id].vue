<script setup lang="ts">
import DetailQuizSection from "~/components/quiz/DetailQuizSection.vue";
import { useAppToast } from "~/composables/useAppToast";
import type { QuizData } from "~/types/api/Quiz";

definePageMeta({
  permissions: ["api.view_quiz"]
});

const { params } = useRoute();
const quizId = Number(params?.id);
const { showError } = useAppToast();
const quizLoading = ref(true);
const quiz = ref<QuizData | null>(null);

async function loadQuiz() {
  try {
    quizLoading.value = true;
    quiz.value = await useNuxtApp().$repositories.quiz.getById(quizId);
  } catch (e) {
    showError("Не удалось загрузить викторину", "Попробуйте позже или обратитесь в поддержку");
    throw e;
  } finally {
    quizLoading.value = false;
  }
}

onBeforeMount(async () => {
  await loadQuiz();
});
</script>

<template>
  <DetailQuizSection :quiz :quiz-loading @on-quiz-reload="loadQuiz" />
</template>
