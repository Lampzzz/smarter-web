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
import { formatBirthDate } from "@/lib/utils";
import { Member } from "@/types";

export const createMembers = async (data: Member[], managerId: string) => {
  try {
    const promises = data.map(async (value) => {
      return addDoc(collection(db, "members"), {
        ...value,
        age: formatBirthDate(value.dateOfBirth),
        managerId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    });

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
};

export const getMembers = async () => {
  try {
    const q = query(collection(db, "members"), orderBy("createdAt", "desc"));
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
