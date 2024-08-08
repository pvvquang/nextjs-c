"use server";

import { LoginSchema, LoginFormValue } from "@/schemas";

export async function login(values: LoginFormValue) {
  console.log({ values });
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return Promise.reject({ message: "Invalid filed!" });
  }
  return Promise.resolve({ message: "Email sent!" });
}
