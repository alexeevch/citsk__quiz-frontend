import { defineStore } from "pinia";
import { useStoreRequest } from "~/composables/useStoreRequest";
import type { QuizCreateDTO, QuizData, QuizQueryParams, QuizUpdateDTO } from "~/types/api/Quiz";

export const useQuizStore = defineStore("quiz", () => {
  const { $repositories } = useNuxtApp();
  const authStore = useAuthStore();
  const { error, isLoading, load } = useStoreRequest();

  const quizList = ref<QuizData[]>([]);

  const fetchQuizzes = async (query?: QuizQueryParams) => {
    if (!authStore.can("api.view_quiz")) {
      const message = "Недостаточно прав на просмотр викторин";
      error.value = message;
      throw new Error(message);
    }

    const response = await load<QuizData[]>(() => $repositories.quiz.getAll(query));
    quizList.value = response;
    return response;
  };

  const createQuiz = async (dto: QuizCreateDTO) => {
    if (!authStore.can("api.add_quiz")) {
      const message = "Недостаточно прав на создание викторины";
      error.value = message;
      throw new Error(message);
    }
    return await load<QuizData>(() => $repositories.quiz.create(dto));
  };

  const updateQuiz = async (id: number, dto: QuizUpdateDTO) => {
    if (!authStore.can("api.change_quiz")) {
      const message = "Недостаточно прав на редактирование викторины";
      error.value = message;
      throw new Error(message);
    }
    return await load<QuizData>(() => $repositories.quiz.update(id, dto));
  };

  const deleteQuiz = async (id: number) => {
    if (!authStore.can("api.delete_quiz")) {
      const message = "Недостаточно прав на удаление викторины";
      error.value = message;
      throw new Error(message);
    }
    return await load(() => $repositories.quiz.delete(id));
  };

  const showQuiz = async (id: number) => {
    return await updateQuiz(id, { is_active: true });
  };

  const hideQuiz = async (id: number) => {
    return await updateQuiz(id, { is_active: false });
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
