import { db } from "@/lib/db";
import { NewPasswordFormValue, RegisterFormValue } from "@/schemas";
import { hashPassword } from "@/utils/auth";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const createNewUser = async (data: RegisterFormValue) => {
  try {
    const { email, password, name } = data;
    const hashedPassword = await hashPassword(password || "");
    await db.user.create({ data: { name, email, password: hashedPassword } });
  } catch {}
};

export const updateUserVerifiedEmail = async (id: string) => {
  try {
    await db.user.update({
      where: { id },
      data: { emailVerified: new Date() },
    });
  } catch {}
};
