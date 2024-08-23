"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { FormMessageServer } from "@/types/auth";

export const newVerification = async (
  token: string
): Promise<FormMessageServer> => {
  try {
    const existingToken = await getVerificationTokenByToken(token);
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

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    return { type: "success", message: "Email verified!" };
  } catch {
    return { type: "error", message: "Something went wrong!" };
  }
};
