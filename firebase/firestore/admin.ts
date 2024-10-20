import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "../config";
import { Admin } from "@/types";

export const createAdmin = async (data: Admin) => {
  try {
    await addDoc(collection(db, "admins"), {
      name: data.name,
      email: data.email,
      authId: data.authId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAdminById = async (id: string) => {
  try {
    const adminsRef = collection(db, "admins");
    const q = query(adminsRef, where("authId", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const adminData = querySnapshot.docs[0].data() as Admin;

    return {
      id: querySnapshot.docs[0].id,
      ...adminData,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
