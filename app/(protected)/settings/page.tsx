"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <div className="flex-col items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <Button className="" onClick={() => logout()}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
