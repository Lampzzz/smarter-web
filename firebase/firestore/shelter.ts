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

import { db } from "../config";
import { Manager, Shelter } from "@/types";
import { getManagerById } from "./manager";

export const createShelter = async (data: Shelter) => {
  try {
    const ref = collection(db, "shelters");

    console.log("Added data: ", data);

    await addDoc(ref, {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getShelters = async () => {
  try {
    const q = query(collection(db, "shelters"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const data = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const manager = (await getManagerById(doc.data().managerId)) as Manager;

        return {
          id: doc.id,
          ...doc.data(),
          managerName: manager ? manager.fullName : null,
        };
      })
    );

    return data as Shelter[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getShelterById = async (id: string) => {
  try {
    const ref = doc(db, "shelters", id);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Shelter;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateShelter = async (data: Shelter, id: string) => {
  try {
    const ref = doc(db, "shelters", id);

    await setDoc(ref, {
      ...data,
      managerId: data.managerId === "none" ? null : data.managerId,
      updatedAt: Timestamp.now(),
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const deleteShelterById = async (id: string) => {
  try {
    await deleteDoc(doc(db, "shelters", id));
  } catch (error) {
    console.error(error);
  }
};
