import React, { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen h-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 to-violet-600">
      {children}
    </div>
  );
}

export default AuthLayout;
