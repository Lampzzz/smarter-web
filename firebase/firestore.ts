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

import { db } from "./config";
import { CurrentUser, Shelter, User, newAdminProps } from "@/types";
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

export const getAdmin = async (id: string) => {
  try {
    const adminsRef = collection(db, "admins");
    const q = query(adminsRef, where("authId", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const adminData = querySnapshot.docs[0].data() as CurrentUser;

    return {
      id: querySnapshot.docs[0].id,
      ...adminData,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch all shelters
export const getAllShelters = async () => {
  try {
    const q = query(collection(db, "shelters"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
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
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        fullName: doc.data().fullName,
        age: formatBirthDate(doc.data().dateOfBirth),
        phoneNumber: doc.data().phoneNumber,
        email: doc.data().email,
        gender: doc.data().gender,
        address: doc.data().address,
      };
    });
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Get a single user
export const getUser = async (id: string) => {
  try {
    const ref = doc(db, "users", id);
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

// Insert new shelter
export const createShelter = async (data: Shelter) => {
  try {
    const ref = collection(db, "shelters");

    await addDoc(ref, {
      name: data.name,
      location: data.location,
      type: data.type,
      capacity: data.capacity,
      status: data.status,
      createdAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error: any) {
    throw new Error(error);
  }
};

// Update shelter
export const updateShelter = async (data: Shelter, id: string) => {
  try {
    const ref = doc(db, "shelters", id);

    await setDoc(ref, data);
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete Shelter
export const deleteShelter = async (id: string) => {
  try {
    await deleteDoc(doc(db, "shelters", id));
  } catch (error) {
    console.error(error);
  }
};

// Create New User
export const createUser = async (data: User) => {
  try {
    await addDoc(collection(db, "users"), {
      ...data,
      age: formatBirthDate(data.dateOfBirth),
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error(error);
  }
};

// Update shelter
export const updateUser = async (data: User, id: string) => {
  try {
    const ref = doc(db, "users", id);
    await setDoc(ref, data);
  } catch (error: any) {
    throw new Error(error);
  }
};

// Delete User
export const deleteUser = async (id: string) => {
  try {
    await deleteDoc(doc(db, "users", id));
  } catch (error) {
    console.error(error);
  }
};
