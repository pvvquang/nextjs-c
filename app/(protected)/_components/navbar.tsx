"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import UserButton from "@/components/auth/user-button";

const Navbar = () => {
  const pathname = usePathname();
  console.log({ pathname });

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm w-full max-w-[600px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-x-2">
          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
          >
            <Link href="/server">Server</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/client" ? "default" : "outline"}
          >
            <Link href="/client">Client</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/admin" ? "default" : "outline"}
          >
            <Link href="/admin">Admin</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href="/settings">Setting</Link>
          </Button>
        </div>

        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
