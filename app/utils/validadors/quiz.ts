import { z } from "zod";

export const quizSchema = z.object({
  name: z.string().min(1, "Введите название"),
  description: z.string().min(1, "Заполните описание"),
  organization_id: z.number({ message: "Выберите организацию" }),
  total_questions: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .pipe(z.number({ message: "Введите количество вопросов" }).min(10, "Минимум 10 вопросов")),
  is_active: z.boolean().default(false)
});
