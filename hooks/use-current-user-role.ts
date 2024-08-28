import { useSession } from "next-auth/react";

const useCurrentUserRole = () => {
  const session = useSession();

  return { currentUserRole: session.data?.user.role };
};

export default useCurrentUserRole;
