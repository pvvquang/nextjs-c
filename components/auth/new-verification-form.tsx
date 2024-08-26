"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import { useSearchParams } from "next/navigation";
import { FormMessageServer } from "@/types/auth";
import { newVerification } from "@/actions/new-verification";

import CardWrapper from "@/components/auth/card-wrapper";
import FormMessageCustom from "@/components/common/form-message-custom";

function MewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formMessage, setFormMessage] = useState<FormMessageServer>({
    type: "error",
    message: "",
  });

  const onSubmit = useCallback(() => {
    if (formMessage.message) return;

    if (!token) {
      setFormMessage({ type: "error", message: "Missing token!" });
      return;
    }
    newVerification(token)
      .then((res) => setFormMessage(res))
      .catch((res) => setFormMessage(res));
  }, [token, formMessage.message]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        {!formMessage.message && <BeatLoader />}

        {/* Form Error Message from server */}
        <FormMessageCustom
          type={formMessage.type}
          message={formMessage.message}
        />
      </div>
    </CardWrapper>
  );
}

export default MewVerificationForm;
