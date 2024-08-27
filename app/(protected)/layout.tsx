import React from "react";
import Navbar from "./_components/navbar";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 to-violet-600">
      <Navbar />
      {children}
    </div>
  );
}

export default ProtectedLayout;
