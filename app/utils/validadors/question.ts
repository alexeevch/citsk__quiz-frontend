import { z } from "zod";

export const answerRowSchema = z.object({
  text: z.string().min(1, "Введите текст ответа").max(35, "Не более 35 символов"),
  correct: z.boolean(),
  sort_index: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .pipe(
      z
        .number({ error: "Введите число" })
        .int("Только целое число")
        .positive("Должно быть положительным")
    )
});

export const questionFormSchema = z
  .object({
    question: z.string().min(1, "Введите текст вопроса"),
    sort_index: z
      .union([z.string(), z.number()])
      .transform((val) => Number(val))
      .pipe(
        z
          .number({ error: "Введите число" })
          .int("Только целое число")
          .positive("Должно быть положительным")
      ),
    answers: z.array(answerRowSchema).min(2, "Добавьте минимум 2 ответа")
  })
  .refine((data) => data.answers.some((a) => a.correct), {
    message: "Отметьте хотя бы один правильный ответ",
    path: ["answers_correct"]
  });
