import { z } from "zod";
import { PHONE_REGEX, UPPERCASE_REGEX } from "~/utils/regex";

export const firstnameSchema = z.string().trim().min(1, { error: "Введите имя" });

export const surnameSchema = z.string().trim().min(1, { error: "Введите фамилию" });

export const patronymicSchema = z
  .string()
  .trim()
  .transform((val) => {
    if (val === "" || val === undefined) {
      return null;
    }
  })
  .nullable()
  .optional();

export const phoneSchema = z
  .string()
  .trim()
  .transform((val) => (val === "" ? null : val))
  .refine((val) => val === null || PHONE_REGEX.test(val), {
    error: "Введите корректный номер телефона"
  })
  .nullable();

export const requiredPhoneSchema = z
  .string()
  .transform((val) => val.trim())
  .refine((val) => val !== "", { error: "Обязательное поле" })
  .refine((val) => PHONE_REGEX.test(val), {
    error: "Введите корректный номер телефона"
  });

export const emailSchema = z.email({ error: "Введите корректный email" });

export const passwordSchema = z
  .string()
  .trim()
  .min(8, { error: "Пароль должен содержать минимум 8 символов" })
  .refine((val) => UPPERCASE_REGEX.test(val), {
    error: "Пароль должен содержать хотя бы одну заглавную букву"
  })
  .refine(
    (val) => {
      const matches = val.match(SYMBOLS_REGEX);
      return matches !== null && matches.length >= 1;
    },
    {
      error: "Пароль должен содержать минимум один специальный символ"
    }
  );

export const confirmPasswordSchema = z.string().trim().min(1, { error: "Подтвердите пароль" });

export const userPasswordFieldsSchema = z.object({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema
});

export const userPasswordSchema = userPasswordFieldsSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    path: ["confirmPassword"],
    error: "Пароли не совпадают"
  }
);
