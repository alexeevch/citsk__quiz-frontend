import { defineStore } from "pinia";
import { useStoreRequest } from "~/composables/useStoreRequest";
import type { AnswerCreateDTO, AnswerData, AnswerUpdateDTO } from "~/types/api/Answer";

export const useAnswerStore = defineStore("answer", () => {
  const { $repositories } = useNuxtApp();
  const authStore = useAuthStore();
  const { error, isLoading, load } = useStoreRequest();

  const createAnswer = async (dto: AnswerCreateDTO) => {
    if (!authStore.can("api.add_answer")) {
      const message = "Недостаточно прав на добавление ответов";
      error.value = message;
      throw new Error(message);
    }
    return await load<AnswerData>(() => $repositories.answer.create(dto));
  };

  const updateAnswer = async (id: number, dto: AnswerUpdateDTO) => {
    if (!authStore.can("api.change_answer")) {
      const message = "Недостаточно прав на редактирование ответов";
      error.value = message;
      throw new Error(message);
    }
    return await load<AnswerData>(() => $repositories.answer.update(id, dto));
  };

  const deleteAnswer = async (id: number) => {
    if (!authStore.can("api.delete_answer")) {
      const message = "Недостаточно прав на удаление ответов";
      error.value = message;
      throw new Error(message);
    }
    return await load(() => $repositories.answer.delete(id));
  };

  return {
    isLoading,
    error,

    createAnswer,
    updateAnswer,
    deleteAnswer
  };
});
