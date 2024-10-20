import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { formatBirthDate } from "@/lib/utils";
import { auth, db } from "../config";
import { Resident, User } from "@/types";
import { createMembers } from "./members";

export const createResident = async (data: Resident) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password!
    );

    const { members, password, ...managerData } = data;

    const managerDocRef = await addDoc(collection(db, "managers"), {
      ...managerData,
      auth_id: userCredential.user.uid,
      age: formatBirthDate(data.dateOfBirth),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    await createMembers(members, managerDocRef.id);
  } catch (error) {
    console.error(error);
  }
};

export const getManagers = async () => {
  try {
    const q = query(collection(db, "managers"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getManagerById = async (id: string) => {
  try {
    const ref = doc(db, "managers", id);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateManager = async (data: User, id: string) => {
  try {
    const ref = doc(db, "managers", id);
    await setDoc(ref, data);
  } catch (error: any) {
    console.error(error);
  }
};

export const deleteManagerById = async (id: string) => {
  try {
    await deleteDoc(doc(db, "managers", id));
  } catch (error) {
    console.error(error);
  }
};
