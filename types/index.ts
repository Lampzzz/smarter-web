import { Icons } from "@/components/icons";
import { User as FirebaseUser } from "firebase/auth";
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
  type: "permanent" | "temporary";
  capacity: number;
  status: "available" | "used" | "maintenance";
}

export interface UserFormValues {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  gender: "male" | "female";
  dateOfBirth: string;
  age: number;
  address: string;
  picture: string;
}

export interface User {
  id: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  gender: string;
  age: number;
  address: string;
  picture?: string;
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

export interface UserState {
  currentUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuthListener: () => () => void;
}

export interface newAdminProps {
  name: string;
  email: string;
  authId: string;
}

export interface UserFilterTypes {
  page?: number;
  limit?: number;
  gender?: string;
  search?: string;
}

export interface ShelterFilterTypes {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface ShelterData {
  name: string;
  location: string;
  type: "permanent" | "temporary";
  capacity: string;
  status: "available" | "occupied" | "maintenance";
}
