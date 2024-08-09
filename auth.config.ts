import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { verifyPassword } from "@/utils/auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        let user = null;
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await verifyPassword(password, user.password);
          if (passwordMatch) {
            return null;
          }
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
