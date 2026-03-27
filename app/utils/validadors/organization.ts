import { z } from "zod";
import { emailSchema, emptyToNull } from "~/utils/validadors/shared";

export const organizationSchema = z.object({
  name: z.string().min(1, "Введите название"),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Введите номер телефона" })
    .refine((val) => PHONE_REGEX.test(val), {
      message: "Введите корректный номер телефона"
    }),
  email: emailSchema,
  site_url: emptyToNull(z.url("Введите корректный URL").optional().or(z.literal(""))),
  address: emptyToNull(z.string().optional())
});
