"use client";

import useCurrentUserRole from "@/hooks/use-current-user-role";

import { UserRole } from "@prisma/client";
import FormMessageCustom from "@/components/common/form-message-custom";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const { currentUserRole } = useCurrentUserRole();

  if (currentUserRole !== allowedRole) {
    return (
      <FormMessageCustom
        type="error"
        message="You do not have permission to view this content!"
      />
    );
  }

  return <>{children}</>;
};

export default RoleGate;
