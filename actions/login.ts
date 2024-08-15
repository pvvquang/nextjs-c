"use server";

import { signIn, signOut } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginFormValue } from "@/schemas";
import { FormMessageServer } from "@/types/auth";
import { decryptData } from "@/utils/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function login(values: string): Promise<FormMessageServer> {
  try {
    const loginValue = (await decryptData(values)) as LoginFormValue;
    const validateFields = LoginSchema.safeParse(loginValue);
    if (!validateFields.success) {
      return { type: "success", message: "Invalid filed!" };
    }

    const { email, password } = validateFields.data;
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { type: "error", message: "Email sent!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { type: "error", message: "Invalid credentials!" };
        default:
          return { type: "error", message: "Something went wrong!" };
      }
    }
    throw error;
  }
}

export async function checkUserExists(_email: string) {
  try {
    const userExists = getUserByEmail(_email);
    if (!userExists) {
      await signOut();
      redirect(DEFAULT_LOGIN);
    }
  } catch {
    await signOut();
    redirect(DEFAULT_LOGIN);
  }
}
