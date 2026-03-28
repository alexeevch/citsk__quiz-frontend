import { defineStore } from "pinia";
import { useStoreRequest } from "~/composables/useStoreRequest";
import type { QuizCreateDTO, QuizData, QuizQueryParams, QuizUpdateDTO } from "~/types/api/Quiz";

export const useQuizStore = defineStore("quiz", () => {
  const { $repositories } = useNuxtApp();
  const { error, isLoading, load } = useStoreRequest();

  const quizList = ref<QuizData[]>([]);

  const fetchQuizzes = async (query?: QuizQueryParams) => {
    try {
      const response = await load<QuizData[]>(() => $repositories.quiz.getAll(query));
      quizList.value = response;

      return response;
    } catch (e) {
      error.value = "Не удалось загрузить список викторин";
      throw e;
    }
  };

  const createQuiz = async (dto: QuizCreateDTO) => {
    return await load<QuizData>(() => $repositories.quiz.create(dto));
  };

  const updateQuiz = async (id: number, dto: QuizUpdateDTO) => {
    return await load<QuizData>(() => $repositories.quiz.update(id, dto));
  };

  const deleteQuiz = async (id: number) => {
    return await load(() => $repositories.quiz.delete(id));
  };

  const showQuiz = async (id: number) => {
    return await $repositories.quiz.update(id, { is_active: true });
  };

  const hideQuiz = async (id: number) => {
    return await $repositories.quiz.update(id, { is_active: false });
  };

  return {
    isLoading,
    error,
    quizList,

    fetchQuizzes,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    showQuiz,
    hideQuiz
  };
});
