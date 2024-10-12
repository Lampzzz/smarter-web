import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./config";
import { newAdmin } from "./firestore";
import { fireBaseError } from "@/lib/utils";

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
    await newAdmin({ name, email, authId: user.uid });
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
