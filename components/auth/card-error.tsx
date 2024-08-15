import { TriangleAlert } from "lucide-react";

import CardWrapper from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        <TriangleAlert className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
