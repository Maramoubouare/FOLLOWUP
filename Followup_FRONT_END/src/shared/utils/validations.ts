import { z } from "zod";
import { validationMessage } from "../../constant/validationMessage";

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PHONE_NUMBER_REGEX = /^\+?[1-9]\d{1,14}$/;

export const LoginSchema = z.object({
  email: z.string().trim().email(validationMessage.INVALID_EMAIL),
  password: z
    .string()
    .min(8, validationMessage.MIN_LENGTH(8))
    .regex(
      PASSWORD_REGEX,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
    ),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;
