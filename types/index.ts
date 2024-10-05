import { Icons } from "@/components/icons";

import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
}

export interface FormFieldProps {
  type?: string;
  placeholder: string;
  name: ValidFieldNames;
  icon?: string;
  register: UseFormRegister<FormData>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

export type ValidFieldNames = "name" | "email" | "password";

export interface Shelter {
  id: string;
  name: string;
  location: string;
  type: "Permanent" | "Temporary";
  capacity: number;
  status: "Available" | "Occupied" | "Full" | "Reserved" | "Maintenance";
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  age: number;
  address: string;
  picture: string;
}

export interface FieldErrorMessage {
  message: string;
}

export interface FirebaseErrors {
  name?: FieldErrorMessage;
  email?: FieldErrorMessage;
  password?: FieldErrorMessage;
  general?: FieldErrorMessage;
}
