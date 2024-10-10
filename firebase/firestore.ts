import { Shelter, ShelterData, newAdminProps } from "@/types";
import { db } from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { formatBirthDate } from "@/lib/utils";

// Create new admin
export const newAdmin = async (data: newAdminProps) => {
  try {
    await addDoc(collection(db, "admins"), {
      name: data.name,
      email: data.email,
      authId: data.authId,
    });
  } catch (error: any) {
    console.error(error);
  }
};

// Fetch all shelters
export const getAllShelters = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "shelters"));
    const data: Shelter[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Shelter)
    );

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteShelter = async (id: string) => {
  try {
    await deleteDoc(doc(db, "shelters", id));
  } catch (error) {
    console.error(error);
  }
};

// Get a single shelter
export const getShelter = async (id: string) => {
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

// Fetch all users
export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        fullName: `${doc.data().firstName} ${doc.data().middleName} ${
          doc.data().lastName
        }`,
        age: formatBirthDate(doc.data().dateOfBirth),
        phoneNumber: doc.data().phoneNumber,
        email: doc.data().email,
        gender: doc.data().gender,
        address: doc.data().address,
        picture: doc.data().picture,
      };
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Insert new shelter
export const addShelter = async (data: ShelterData) => {
  try {
    const ref = collection(db, "shelters");

    await addDoc(ref, {
      name: data.name,
      location: data.location,
      type: data.type,
      capacity: data.capacity,
      status: data.status,
    });

    return { success: true };
  } catch (error: any) {
    throw new Error(error);
  }
};
