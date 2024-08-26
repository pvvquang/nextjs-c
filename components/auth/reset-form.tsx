"use client";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema, ResetFormValue } from "@/schemas";

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
import { reset } from "@/actions/reset";

function ResetForm() {
  const [formMessage, setFormMessage] = useState<FormMessageServer>({
    type: "error",
    message: "",
  });

  const form = useForm<ResetFormValue>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ResetFormValue) => {
    // TODO: send rest email
    startTransition(() => {
      reset(values)
        .then((res) => setFormMessage(res))
        .catch((err) => setFormMessage(err));
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email  */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john@example.com"
                      type="email"
                    />
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
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default ResetForm;
