"use server";

import { signIn, signOut } from "@/auth";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/data/token";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginFormValue } from "@/schemas";
import { FormMessageServer } from "@/types/auth";
import { decryptData, verifyPassword } from "@/utils/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function login(values: string): Promise<FormMessageServer> {
  try {
    const loginValue = (await decryptData(values)) as LoginFormValue;
    const validateFields = LoginSchema.safeParse(loginValue);
    if (!validateFields.success) {
      return { type: "error", message: "Invalid filed!" };
    }

    const { email, password, code } = validateFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { type: "error", message: "Email does not exist!" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );
      sendVerificationEmail(verificationToken.email, verificationToken.token);
      return { type: "success", message: "Confirmation email sent!" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      // TODO: Verify password
      const passwordMatch = await verifyPassword(
        password,
        existingUser.password
      );
      if (!passwordMatch) {
        return { type: "error", message: "Invalid password!" };
      }

      if (code) {
        // TODO: Verify code
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
        if (!twoFactorToken || twoFactorToken.token !== code) {
          return { type: "error", message: "Invalid code!" };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();
        if (hasExpired) return { type: "error", message: "Code expired!" };

        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (twoFactorConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { userId: twoFactorConfirmation.userId },
          });
        }

        await db.twoFactorConfirmation.create({
          data: { userId: existingUser.id },
        });

        await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });
      } else {
        // Send 2FA token
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );

        return {
          type: "success",
          message: "2FA code sent to your email!",
          isTwoFactor: true,
        };
      }
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { type: "success", message: "Login successfully!" };
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
    const userExists = await getUserByEmail(_email);
    if (!userExists) {
      await signOut();
      redirect(DEFAULT_LOGIN);
    }
  } catch {
    await signOut();
    redirect(DEFAULT_LOGIN);
  }
}
