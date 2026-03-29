import type { QuizData } from "~/types/api/Quiz";

type QuizStatus = {
  severity: "success" | "warn";
  value: "Опубликована" | "Скрыта";
};

export const useQuiz = (quiz: QuizData) => {
  const status = computed<QuizStatus>(() =>
    quiz.is_active
      ? { severity: "success", value: "Опубликована" }
      : { severity: "warn", value: "Скрыта" }
  );
  return {
    status
  };
};
