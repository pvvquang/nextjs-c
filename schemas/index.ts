import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.string().optional(),
});
export type LoginFormValue = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(6, { message: "Minimum is 6 characters" }),
  name: z.string().min(1, { message: "Name is required" }),
});
export type RegisterFormValue = z.infer<typeof RegisterSchema>;

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
});
export type ResetFormValue = z.infer<typeof ResetSchema>;

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum is 6 characters" }),
});
export type NewPasswordFormValue = z.infer<typeof NewPasswordSchema>;

export const SettingSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required!" }),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    isTwoFactorEnabled: z.optional(z.boolean()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine((data) => {
    if (!data.password && !data.newPassword) return true;
    return true;
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: "New password is required!", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      return true;
    },
    { message: "Password is required!", path: ["password"] }
  );

export type SettingValueForm = z.infer<typeof SettingSchema>;
