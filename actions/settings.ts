"use server";

import { unstable_update } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/user";
import { SettingValueForm } from "@/schemas";
import { FormMessageServer } from "@/types/auth";
import { decryptData } from "@/utils/auth";

export const changeSetting = async (
  values: string
): Promise<FormMessageServer> => {
  try {
    const user = await currentUser();

    if (!user) return { type: "error", message: "Unauthorized!" };

    const dbUser = await getUserById(user.id || "");
    if (!dbUser) return { type: "error", message: "Unauthorized!" };

    const decryptValues = (await decryptData(
      values
    )) as Partial<SettingValueForm>;

    if (user.isOAuth) {
      decryptValues.email = undefined;
      decryptValues.password = undefined;
      decryptValues.newPassword = undefined;
      decryptValues.isTwoFactorEnabled = undefined;
    }

    const updatedUser = await db.user.update({
      where: { id: dbUser.id },
      data: {
        ...decryptValues,
      },
    });

    await unstable_update({
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      },
    });

    return { type: "success", message: "Setting updated!" };
  } catch (err) {
    console.log({ err });
    return { type: "error", message: "Something went wrong!" };
  }
};
