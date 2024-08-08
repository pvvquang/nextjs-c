"use server";

import { LoginSchema, LoginFormValue } from "@/schemas";
import { FormMessageServer } from "@/types/auth";

export async function login(
  values: LoginFormValue
): Promise<FormMessageServer> {
  try {
    const validateFields = LoginSchema.safeParse(values);
    if (!validateFields.success) {
      return { type: "success", message: "Invalid filed!" };
    }
    return { type: "error", message: "Email sent!" };
  } catch {
    return { type: "error", message: "Email sent!" };
  }
}
