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
import { format } from "date-fns";

export const createMember = async (data: Member) => {
  try {
    const ref = collection(db, "members");

    await addDoc(ref, {
      ...data,
      dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
      age: formatBirthDate(data.dateOfBirth),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error) {
    console.error(error);
  }
};

export const createMembers = async (data: Member[], managerId: string) => {
  try {
    const promises = data.map(async (value) => {
      return addDoc(collection(db, "members"), {
        ...value,
        managerId,
        age: formatBirthDate(value.dateOfBirth),
        dateOfBirth: format(value.dateOfBirth, "yyyy-MM-dd"),
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

export const getMemberById = async (id: string) => {
  try {
    const ref = doc(db, "members", id);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Member;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateMember = async (data: Member, id: string) => {
  try {
    const ref = doc(db, "members", id);
    await setDoc(ref, {
      ...data,
      dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
      age: formatBirthDate(data.dateOfBirth),
      updatedAt: Timestamp.now(),
      managerId: data.managerId === "none" ? null : data.managerId,
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const deleteMemberById = async (id: string) => {
  try {
    await deleteDoc(doc(db, "members", id));
  } catch (error) {
    console.error(error);
  }
};
