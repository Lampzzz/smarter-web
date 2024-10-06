"use client";

import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import GoogleButton from "@/components/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FirebaseErrors, FieldErrorMessage } from "@/types";
import { useRouter } from "next/navigation";
import { register } from "@/firebase/auth";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).min(2, {
    message: "Please enter your full name",
  }),

  email: z.string().min(1, { message: "Email is required." }).email({
    message: "Please enter a valid email.",
  }),

  password: z
    .string()
    .min(1, { message: "Password is required." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/,
      { message: "Invalid Password Format." }
    ),
});

type RegisterFormValue = z.infer<typeof formSchema>;

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Dummy",
      email: "dummy@gmail.com",
      password: "Dummy11!",
    },
  });

  const handleFetchErrors = async (response: Response) => {
    const errorData = await response.json();
    const errors = errorData as FirebaseErrors;

    if (errors) {
      Object.entries(errors).forEach(([field, error]) => {
        const { message } = error as FieldErrorMessage;
        form.setError(field as "name" | "email" | "password", {
          type: "manual",
          message,
        });
      });
    } else {
      console.error("General error:", errorData.error || "Unknown error");
    }
  };

  const onSubmit = async (data: RegisterFormValue) => {
    setLoading(true);

    try {
      const response = await register(data);

      if (response.success) {
        router.push("/dashboard");
      } else {
        // handleFetchErrors(response.error);
        console.log(response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-y-auto h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="name"
                          placeholder="Enter your name"
                          error={form.formState.errors.name}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      {/* <FormDescription>
                        The password must be 8-20 characters long and include at
                        least one uppercase letter, lowercase letter, number,
                        and special character.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="ml-auto w-full"
                  type="submit"
                  disabled={loading}
                >
                  Create an account
                </Button>
              </form>
            </Form>

            <div className="flex gap-1 justify-center text-sm  mt-2">
              <p className="text-muted-foreground">Already have an account?</p>
              <Link href="/login" className="underline">
                Sign In
              </Link>
            </div>
          </div>

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
          <GoogleButton label="Sign up with Google" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="relative h-full flex-col p-10 text-white hidden lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
      </div>
    </div>
  );
}
