import type { QuizData } from "~/types/api/Quiz";

type QuizStatus = {
  severity: "success" | "warn";
  value: "Опубликована" | "Скрыта";
};

export const useQuiz = (quiz: Ref<QuizData | null>) => {
  const status = computed<QuizStatus | null>(() => {
    if (!quiz.value) return null;
    return quiz.value.is_active
      ? { severity: "success", value: "Опубликована" }
      : { severity: "warn", value: "Скрыта" };
  });

  return {
    status
  };
};
