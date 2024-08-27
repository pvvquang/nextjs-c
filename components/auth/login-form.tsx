"use client";
import { startTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormValue } from "@/schemas";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
import { login } from "@/actions/login";
import { FormMessageServer } from "@/types/auth";
import { encryptData } from "@/components/auth/register-form";

function LoginForm() {
  const searchParams = useSearchParams();
  const [formMessage, setFormMessage] = useState<FormMessageServer>({
    type: "error",
    message: "",
  });
  const [isShowTwoFactor, setIsShowTwoFactor] = useState(false);

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValue) => {
    const payload = encryptData(values);
    startTransition(() => {
      login(payload)
        .then(({ type, message, isTwoFactor }) => {
          if (isTwoFactor) setIsShowTwoFactor(true);
          setFormMessage({ type, message });
        })
        .catch(({ type, message }) => setFormMessage({ type, message }));
    });
  };

  useEffect(() => {
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      setFormMessage({
        type: "error",
        message: "Email already in use with different provider!",
      });
    }
  }, [searchParams]);

  return (
    <CardWrapper
      headerLabel="Welcome to Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {isShowTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!isShowTwoFactor && (
              <>
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
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button variant="link" className="px-0">
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>
          </div>

          {/* Form Error Message from server */}
          <FormMessageCustom
            type={formMessage.type}
            message={formMessage.message}
          />
          <Button className="w-full" type="submit">
            {isShowTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
