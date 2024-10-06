import { Shelter, newAdminProps } from "@/types";
import { db } from "./config";
import { addDoc, collection, getDocs } from "firebase/firestore";

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
