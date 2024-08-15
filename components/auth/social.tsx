import React from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function Social() {
  function onClick(provider: "google" | "github") {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  }

  return (
    <div className="w-full flex items-center justify-between gap-x-2">
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default Social;
