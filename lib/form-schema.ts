import * as z from "zod";

export const userSchema = z.object({
  fullName: z.string().min(1, {
    message: "Full name is required.",
  }),
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone number is required.",
  }),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must include at least one lowercase letter.",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must include at least one uppercase letter.",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must include at least one number.",
    })
    .refine((val) => /[@$!%*?&#]/.test(val), {
      message: "Password must include at least one special character.",
    }),
  members: z.array(
    z.object({
      fullName: z.string().min(1, {
        message: "Member full name is required.",
      }),
      birthDate: z.date({
        required_error: "Member birth date is required.",
      }),
      gender: z.enum(["male", "female"], {
        required_error: "Please select a member gender.",
      }),
    })
  ),
});

export type UserFormValues = z.infer<typeof userSchema>;
