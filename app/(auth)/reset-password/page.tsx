"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

import { useToast } from "@/hooks/useToast";
import { resetPassword } from "@/firebase/auth";
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

const formSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type LoginFormValue = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const [code, setCode] = useQueryState("oobCode");

  const form = useForm<LoginFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: LoginFormValue) => {
    try {
      if (code) {
        await resetPassword(code, data.password);

        toast({
          title: "Reset Successfully",
          description: "Password reset successful",
        });

        router.replace("/login");
        form.reset();
      } else {
        console.error("Code not found");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset Password
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your new password below to reset it.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Repeat your password"
                        error={form.formState.errors.confirmPassword}
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
                Reset
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="relative h-full flex-col p-10 text-white hidden lg:flex dark:border-l">
        <div className="absolute inset-0 bg-zinc-900" />
      </div>
    </div>
  );
}
