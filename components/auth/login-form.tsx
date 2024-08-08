import React from "react";
import CardWrapper from "@/components/auth/card-wrapper";

function LoginForm() {
  return (
    <CardWrapper
      headerLabel="Welcome to Login"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
}

export default LoginForm;
