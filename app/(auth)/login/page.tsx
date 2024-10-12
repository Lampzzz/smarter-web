"use client";

import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import GoogleButton from "@/components/google-button";
import { login } from "@/firebase/auth";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValue = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const form = useForm<LoginFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "lampazaj@gmail.com", password: "James11!" },
  });

  const onSubmit = async (data: LoginFormValue) => {
    setError(null);

    try {
      const response = await login(data.email, data.password);

      if (response.success) {
        router.push("/dashboard");
      } else {
        setError(response.error.both.message);
      }

      form.reset();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
            <p className="text-sm text-muted-foreground">
              Enter your information to login
            </p>
          </div>
          {error && (
            <Alert className="flex items-center justify-between bg-destructive">
              <AlertDescription>{error}</AlertDescription>
              <Button
                variant="link"
                onClick={() => {
                  setError(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        error={form.formState.errors.email}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        error={form.formState.errors.password}
                        {...field}
                      />
                    </FormControl>
                    <div className="flex justify-end">
                      <Link
                        href="/forgot-password"
                        className="text-xs text-muted-foreground underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="ml-auto w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Sign In
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <GoogleButton label="Sign in with Google" />
          <div className="mx-auto flex gap-1 text-sm">
            <p className="text-muted-foreground">
              Don&apos;t have an account yet?
            </p>
            <Link href="/register" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="relative h-full flex-col p-10 text-white hidden lg:flex dark:border-l">
        <div className="absolute inset-0 bg-zinc-900" />
      </div>
    </div>
  );
}
