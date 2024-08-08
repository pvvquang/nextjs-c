import React from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

function Social() {
  return (
    <div className="w-full flex items-center justify-between gap-x-2">
      <Button className="w-full" variant="outline" size="lg" onClick={() => {}}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button className="w-full" variant="outline" size="lg" onClick={() => {}}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default Social;
