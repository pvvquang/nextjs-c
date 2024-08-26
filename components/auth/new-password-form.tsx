"use client";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema, NewPasswordFormValue } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/card-wrapper";
import FormMessageCustom from "@/components/common/form-message-custom";
import { FormMessageServer } from "@/types/auth";
import { encryptData } from "@/components/auth/register-form";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formMessage, setFormMessage] = useState<FormMessageServer>({
    type: "error",
    message: "",
  });

  const form = useForm<NewPasswordFormValue>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = (values: NewPasswordFormValue) => {
    // TODO: reset password
    const payload = encryptData(values);
    startTransition(() => {
      newPassword(payload, token)
        .then((res) => setFormMessage(res))
        .catch((err) => setFormMessage(err));
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email  */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Form Error Message from server */}
          <FormMessageCustom
            type={formMessage.type}
            message={formMessage.message}
          />
          <Button className="w-full" type="submit">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default NewPasswordForm;
