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
import { Manager, Resident } from "@/types";
import { createMembers } from "./members";
import { format } from "date-fns";
import { getShelters } from "./shelter";

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
      dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
      age: formatBirthDate(data.dateOfBirth),
      isAssigned: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    await createMembers(members, managerDocRef.id);

    return { success: true, message: "Manager Created Successfully!" };
  } catch (error: any) {
    console.error(error);
    let errorMessage = "";

    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email already exist";
    } else {
      errorMessage = error.message;
    }

    return { success: false, message: errorMessage };
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
    return data as Manager[];
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
    } as Manager;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getManagersByAssigned = async (isAssigned: boolean) => {
  try {
    const shelters = await getShelters();
    const managers = await getManagers();

    const assignedManagerIds = shelters
      .filter((shelter) => shelter.managerId !== null)
      .map((shelter) => shelter.managerId);

    const filteredManagers = managers.filter((manager) => {
      const isManagerAssigned = assignedManagerIds.includes(manager.id!);
      return isAssigned ? isManagerAssigned : !isManagerAssigned;
    });

    return filteredManagers;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateManager = async (data: Partial<Resident>, id: string) => {
  try {
    const ref = doc(db, "managers", id);
    await setDoc(ref, {
      ...data,
      dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
      age: formatBirthDate(data.dateOfBirth),
      updatedAt: Timestamp.now(),
      isAssigned: data.isAssigned,
    });
  } catch (error: any) {
    console.error(error);
  }
};

export const deleteManagerById = async (id: string) => {
  try {
    await deleteDoc(doc(db, "managers", id));

    const q = query(collection(db, "members"), where("managerId", "==", id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (docSnapshot) => {
      const memberDocRef = doc(db, "members", docSnapshot.id);
      await setDoc(
        memberDocRef,
        { managerId: null, updatedAt: Timestamp.now() },
        { merge: true }
      );
    });
  } catch (error) {
    console.error(error);
  }
};
