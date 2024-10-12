"use client";

import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { forgotPassword } from "@/firebase/auth";
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
});

type LoginFormValue = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const form = useForm<LoginFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: LoginFormValue) => {
    setMessage("");

    try {
      const response = await forgotPassword(data.email);

      if (response.success) {
        setMessage(response.message);
      } else {
        console.error(response.error);
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
            <h1 className="text-2xl font-semibold tracking-tight">
              Forgot Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {message && (
            <Alert className="flex items-center justify-between bg-success py-1">
              <AlertDescription>{message}</AlertDescription>
              <Button
                variant="link"
                onClick={() => {
                  setMessage("");
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
              <Button
                className="ml-auto w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Submit
              </Button>
            </form>
          </Form>

          <div className="mx-auto flex gap-1 text-sm">
            <Link href="/login" className="underline">
              Back
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
