"use server";

import { generateVerificationToken } from "@/data/token";
import { createNewUser, getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
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

    const { email } = validateFields.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { type: "error", message: "Email already in use!" };
    }
    await createNewUser(validateFields.data);

    // TODO: Send verification token email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(email, verificationToken.token);

    return { message: "Confirmation email sent!", type: "success" };
  } catch {
    return { message: "Something went wrong!", type: "error" };
  }
}
