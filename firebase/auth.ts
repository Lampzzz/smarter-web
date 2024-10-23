import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";

import { auth } from "./config";
import { fireBaseError } from "@/lib/utils";
import { createAdmin } from "./firestore/admin";

export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    const firebaseError = fireBaseError(error.code);

    if (Object.keys(firebaseError).length) {
      return { error: firebaseError };
    }

    return { error: error.message };
  }
};

export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await createAdmin({ name, email, authId: user.uid });
    await login(email, password);

    return { success: true };
  } catch (error: any) {
    const firebaseError = fireBaseError(error.code);

    if (Object.keys(firebaseError).length) {
      return { error: firebaseError };
    }

    return { error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return { error: error.message };
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset link sent to your email" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const resetPassword = async (code: string, password: string) => {
  try {
    await confirmPasswordReset(auth, code, password);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};
