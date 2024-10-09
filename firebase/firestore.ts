import { Shelter, newAdminProps } from "@/types";
import { db } from "./config";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
