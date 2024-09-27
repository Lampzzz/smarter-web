import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./config";

interface SignInProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: SignInProps) => {
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
