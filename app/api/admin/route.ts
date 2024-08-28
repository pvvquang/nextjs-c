import { currentUser } from "@/lib/user";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await currentUser();

  if (user?.role === UserRole.ADMIN) {
    return NextResponse.json(null, { status: 200 });
  }

  return NextResponse.json(null, { status: 403 });
}
