import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required" }),
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
