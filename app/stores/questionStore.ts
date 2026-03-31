import { defineStore } from "pinia";
import { useStoreRequest } from "~/composables/useStoreRequest";
import type { QuestionCreateDTO, QuestionData, QuestionUpdateDTO } from "~/types/api/Question";

export const useQuestionStore = defineStore("question", () => {
  const { $repositories } = useNuxtApp();
  const authStore = useAuthStore();
  const { error, isLoading, load } = useStoreRequest();

  const createQuestion = async (dto: QuestionCreateDTO) => {
    if (!authStore.can("api.add_question")) {
      const message = "Недостаточно прав на добавление вопросов";
      error.value = message;
      throw new Error(message);
    }
    return await load<QuestionData>(() => $repositories.question.create(dto));
  };

  const updateQuestion = async (id: number, dto: QuestionUpdateDTO) => {
    if (!authStore.can("api.change_question")) {
      const message = "Недостаточно прав на редактирование вопросов";
      error.value = message;
      throw new Error(message);
    }
    return await load<QuestionData>(() => $repositories.question.update(id, dto));
  };

  const deleteQuestion = async (id: number) => {
    if (!authStore.can("api.delete_question")) {
      const message = "Недостаточно прав на удаление вопросов";
      error.value = message;
      throw new Error(message);
    }
    return await load(() => $repositories.question.delete(id));
  };

  return {
    isLoading,
    error,

    createQuestion,
    updateQuestion,
    deleteQuestion
  };
});
