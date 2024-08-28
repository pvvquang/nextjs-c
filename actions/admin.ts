"use server";

import { currentUser } from "@/lib/user";
import { UserRole } from "@prisma/client";

export const checkAdmin = async () => {
  const user = await currentUser();

  if (user?.role === UserRole.ADMIN) {
    return { success: "Allowed Server Action!" };
  }

  return { error: "Forbidden Server Action!" };
};
