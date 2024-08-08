"use server";

import { createNewUser, getUserByEmail } from "@/data/user";
import { RegisterSchema, RegisterFormValue } from "@/schemas";
import { FormMessageServer } from "@/types/auth";
import { decryptData } from "@/utils/auth";

export async function createAccount(value: string): Promise<FormMessageServer> {
  try {
    const registerData = (await decryptData(value)) as RegisterFormValue;
    const validateFields = RegisterSchema.safeParse(registerData);
    if (!validateFields.success) {
      return { message: "Invalid filed!", type: "error" };
    }

    const existingUser = await getUserByEmail(validateFields.data.email);
    if (existingUser) {
      return { type: "error", message: "Email already in use!" };
    }
    await createNewUser(validateFields.data);
    return { message: "User created!", type: "success" };
  } catch {
    return { message: "Something went wrong!", type: "success" };
  }
}
