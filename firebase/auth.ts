import { addDoc, collection } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "./config";

interface AuthProps {
  email: string;
  password: string;
}

interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

export const login = async ({ email, password }: AuthProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Logged in:", userCredential.user);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const register = async ({ email, password, name }: RegisterProps) => {
  try {
    // Register user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create a Firestore document in 'users' collection with user info
    await addDoc(collection(db, "users"), {
      auth_id: user.uid,
      email: user.email,
      name: name,
    });

    console.log("User registered and document created in Firestore:", user.uid);
  } catch (error: any) {
    throw new Error(error.message); // Handle and throw error
  }
};
