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
import { Member, Manager } from "@/types";
import { getManagerById } from "./manager";

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

    const data = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const manager = (await getManagerById(doc.data().managerId)) as Manager;

        return {
          id: doc.id,
          ...doc.data(),
          managerName: manager ? manager.fullName : "",
        };
      })
    );

    return data as Member[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
