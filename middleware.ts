import NextAuth from "next-auth";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const isLoggedIn = !!req.auth;
  console.log("ROUTE:: ", req.nextUrl.pathname);
  console.log("IS LOGGED IN:: ", isLoggedIn);
});
