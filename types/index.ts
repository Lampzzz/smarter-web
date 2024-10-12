import { User as FirebaseUser } from "firebase/auth";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

import { Icons } from "@/components/icons";

export type ValidFieldNames = "name" | "email" | "password";
export type ShelterStatus = "available" | "occupied" | "maintenance";
export type ShelterType = "permanent" | "temporary";
export type Gender = "male" | "female";

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

export interface Shelter {
  id?: string;
  name: string;
  location: string;
  type: ShelterType;
  capacity: number;
  status: ShelterStatus;
}

export interface UserForm {
  id?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  gender: Gender;
  dateOfBirth: string;
  age?: number;
  address: string;
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

export interface AuthStore {
  currentUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuthListener: () => () => void;
}

export interface ShelterStore {
  shelters: Shelter[] | null;
  filteredShelters: Shelter[];
  shelter: Shelter | null;
  isLoading: boolean;
  totalData: number;
  fetchShelters: () => Promise<void>;
  filterShelters: (filters: ShelterFilterTypes) => void;
  fetchShelter: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (data: Shelter, id: string) => Promise<void>;
}

export interface UserStore {
  users: User[] | null;
  user: UserForm | null;
  totalData: number;
  filteredUsers: User[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  filterUsers: (filters: UserFilterTypes) => void;
  handleDelete: (id: string) => Promise<void>;
  fetchUser: (id: string) => Promise<void>;
  handleUpdate: (data: User, id: string) => Promise<void>;
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
