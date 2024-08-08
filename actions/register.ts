"use server";

import { RegisterSchema, RegisterFormValue } from "@/schemas";

export async function createAccount(values: RegisterFormValue) {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return Promise.reject({ message: "Invalid filed!" });
  }
  return Promise.resolve({ message: "Email sent!" });
}
