"use client";

import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CenterContainer } from "@/components/Container";
import { ToggleTheme } from "@/components/ToggleTheme";
import { images } from "@/constants/images";

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

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <CenterContainer>
      <div className="flex flex-col gap-4 w-1/2">
        <div className="mx-auto flex items-center gap-2">
          <Image src={images.logo} alt="logo" width={35} height={35} />
          <h1 className="text-2xl font-bold">SmarTer</h1>
        </div>
        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="items-center">
            <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Image
                  src={images.googleIcon}
                  alt="logo"
                  width={18}
                  height={18}
                />
                Sign up with Google
              </Button>
              <div className="flex items-center gap-4">
                <span className="h-px w-full bg-input"></span>
                <span className="text-xs text-muted-foreground">OR</span>
                <span className="h-px w-full bg-input"></span>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
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
                          <Input placeholder="Enter your email" {...field} />
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
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="full">
                    Create an account
                  </Button>
                </form>
              </Form>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              By continuing, you&apos;re agreeing to our
              <a href="#" className="ml-1 underline hover:text-primary me-1">
                Terms of use
              </a>
              and
              <a href="#" className="ml-1 underline hover:text-primary">
                Privacy Policy.
              </a>
            </div>
          </CardContent>
        </Card>
        <div className="mx-auto flex gap-1 text-sm">
          <p>Already have an account?</p>
          <Link href="/sign-in" className="underline">
            Log in
          </Link>
        </div>
      </div>
    </CenterContainer>
  );
};

export default SignUp;
