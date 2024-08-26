"use server";

import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { db } from "@/lib/db";
import { NewPasswordFormValue, NewPasswordSchema } from "@/schemas";
import { FormMessageServer } from "@/types/auth";
import { decryptData, hashPassword } from "@/utils/auth";

export const newPassword = async (
  values: string,
  token: string | null
): Promise<FormMessageServer> => {
  try {
    if (!token) {
      return { type: "error", message: "Missing token!" };
    }
    const loginValue = (await decryptData(values)) as NewPasswordFormValue;
    const validateFields = NewPasswordSchema.safeParse(loginValue);
    if (!validateFields.success) {
      return { type: "error", message: "Invalid fields!" };
    }

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
      return { type: "error", message: "Token does not exist!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { type: "error", message: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
      return { type: "error", message: "Email is not valid!" };
    }

    const hashedPassword = await hashPassword(validateFields.data.password);

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    return { type: "success", message: "Password updated!" };
  } catch {
    return { type: "error", message: "Something went wrong!" };
  }
};
