"use server";

import { ResetSchema, ResetFormValue } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { FormMessageServer } from "@/types/auth";
import { generatePasswordResetToken } from "@/data/token";
import { sendPasswordResetEmail } from "@/lib/mail";

export const reset = async (
  values: ResetFormValue
): Promise<FormMessageServer> => {
  try {
    const validateFields = ResetSchema.safeParse(values);
    if (!validateFields.success) {
      return { type: "error", message: "Invalid email!" };
    }

    const existingUser = await getUserByEmail(values.email);

    if (!existingUser) {
      return { type: "error", message: "Email does not exist!" };
    }
    // TODO: Generate token and send email
    const passwordResetToken = await generatePasswordResetToken(values.email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return { type: "success", message: "Reset email sent!" };
  } catch {
    return { type: "error", message: "Something went wrong!" };
  }
};
