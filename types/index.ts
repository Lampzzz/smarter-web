import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

import { Icons } from "@/components/icons";
import { Timestamp } from "firebase/firestore";

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
  children?: NavItem[];
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
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register: UseFormRegister<FormData>;
}

export interface Shelter {
  id?: string;
  name: string;
  location: string;
  type: ShelterType;
  capacity: number | string;
  status: ShelterStatus;
  managerId: string | null;
  managerName?: string | null;
}

export interface Manager {
  id?: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  gender: string;
  dateOfBirth: string;
  age?: number;
  address: string;
  password?: string;
  isAssigned?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Resident {
  id?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  gender: string;
  dateOfBirth: any;
  age?: number;
  address: string;
  password?: string;
  members: Member[];
}

export interface Member {
  id?: string;
  fullName: string;
  gender: string;
  dateOfBirth: any;
  age?: number;
  managerId?: string;
  managerName: string;
}

export interface MemberOpenState {
  [index: number]: boolean;
}

export interface ResidentFormValues {
  fullName: string;
  dateOfBirth: any;
  gender: string;
  address: string;
  email: string;
  password: string;
  phoneNumber: string;
  members: Member[];
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

export interface CurrentUser {
  id?: string;
  name: string;
  email: string;
  authId: string;
}

export interface Admin {
  id?: string;
  name: string;
  email: string;
  authId: string;
}

export interface UserFilterTypes {
  page?: number;
  limit?: number;
  genders?: string;
  search?: string;
}

export interface ShelterFilterTypes {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface AuthState {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuthListener: () => () => void;
  fetchUserData: (id: string) => Promise<void>;
}

export interface ShelterState {
  shelters: Shelter[] | null;
  shelter: Shelter | null;
  totalData: number;
  isLoading: boolean;
  fetchShelters: (filters?: ShelterFilterTypes) => Promise<void>;
  fetchShelter: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: (data: Shelter, id: string) => Promise<void>;
}

export interface MemberState {
  members: Member[] | null;
  totalData: number;
  isLoading: boolean;
  fetchMembers: (filters?: UserFilterTypes) => Promise<void>;
}

export interface ManagerState {
  managers: Manager[] | null;
  manager: Manager | null;
  unassignedManagers: Manager[] | null;
  totalData: number;
  isLoading: boolean;
  fetchManagers: (filters?: UserFilterTypes) => Promise<void>;
  fetchUser?: (id: string) => Promise<void>;
  fetchUnAssignedManager: () => Promise<void>;
  handleDelete?: (id: string) => Promise<void>;
  handleUpdate?: (data: Resident, id: string) => Promise<void>;
}
