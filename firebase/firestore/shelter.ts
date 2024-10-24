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
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config";
import { Manager, Shelter } from "@/types";
import { getManagerById } from "./manager";

export const createShelter = async (data: Shelter) => {
  try {
    const ref = collection(db, "shelters");

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
    const existingDoc = await getDoc(ref);

    if (!existingDoc.exists()) {
      console.error("Shelter not found");
      return;
    }

    const existingData = existingDoc.data();
    let managerId = null;

    if (data.managerId === "none") {
      managerId = null;
    } else if (data.managerId === "") {
      managerId = existingData.managerId;
    } else {
      managerId = data.managerId;
    }

    await setDoc(ref, {
      ...data,
      name: data.name || existingData.name,
      location: data.location || existingData.location,
      managerId: managerId,
      updatedAt: Timestamp.now(),
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const deleteShelterById = async (id: string) => {
  try {
    await deleteDoc(doc(db, "shelters", id));

    // return { success: true, message: "Shelter Deleted Successfully!" };
  } catch (error: any) {
    console.error(error);
    // return { success: false, message: error.message };
  }
};
