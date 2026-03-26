import { emailSchema } from "~/utils/validadors/shared";
import { z } from "zod";

export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, { error: "Введите пароль" })
});
