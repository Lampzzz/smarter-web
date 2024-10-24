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
import { Admin, Announcement, Member } from "@/types";
import { format } from "date-fns";
import { getAdminById } from "./admin";
import { getMemberById } from "./members";
import { getManagerById } from "./manager";

export const createAnnouncement = async (data: Announcement) => {
  try {
    const ref = collection(db, "announcements");

    await addDoc(ref, {
      ...data,
      createdAt: format(new Date(), "yyyy-MM-dd hh:mm a"),
    });

    return { success: true, message: "Announcement Created Successfully!" };
  } catch (error: any) {
    console.error(error.message);
    return { success: true, message: error.message };
  }
};

export const getAnnouncements = async () => {
  try {
    const q = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const data = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const sender = (await getAdminById(doc.data().senderId)) as Admin;
        const recipientId = doc.data().recipient;

        let recipient;
        if (recipientId !== "all") {
          const manager = await getManagerById(recipientId);
          recipient = manager?.fullName;
        } else {
          recipient = "all";
        }

        return {
          id: doc.id,
          ...doc.data(),
          senderName: sender ? sender.name : null,
          recipient: recipient,
        };
      })
    );

    return data as Announcement[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
