import { addDoc, collection } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth, db } from "./config";
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

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return { error: error.message };
  }
};
