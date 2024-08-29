"use client";

import { logout } from "@/actions/logout";

type LogoutButtonProps = {
  children: React.ReactNode;
  containerClass?: string;
};

const LogoutButton = ({ children, containerClass }: LogoutButtonProps) => {
  const handleLogout = () => {
    logout();
  };
  return (
    <span onClick={handleLogout} className={`cursor-pointer ${containerClass}`}>
      {children}
    </span>
  );
};

export default LogoutButton;
