// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {
//   Timestamp,
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDoc,
//   getDocs,
//   orderBy,
//   query,
//   setDoc,
//   where,
// } from "firebase/firestore";

// import { formatBirthDate } from "@/lib/utils";
// import { auth, db } from "./config";
// import { CurrentUser, Member, Resident, Shelter, User, Admin } from "@/types";
// import { createMembers } from "./firestore/members";

// export const newAdmin = async (data: Admin) => {
//   try {
//     await addDoc(collection(db, "admins"), {
//       name: data.name,
//       email: data.email,
//       authId: data.authId,
//     });
//   } catch (error: any) {
//     console.error(error);
//   }
// };

// export const getAdmin = async (id: string) => {
//   try {
//     const adminsRef = collection(db, "admins");
//     const q = query(adminsRef, where("authId", "==", id));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) return null;

//     const adminData = querySnapshot.docs[0].data() as CurrentUser;

//     return {
//       id: querySnapshot.docs[0].id,
//       ...adminData,
//     };
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const getAllShelters = async () => {
//   try {
//     const q = query(collection(db, "shelters"), orderBy("createdAt", "desc"));
//     const querySnapshot = await getDocs(q);
//     const data: Shelter[] = querySnapshot.docs.map(
//       (doc) =>
//         ({
//           id: doc.id,
//           ...doc.data(),
//         } as Shelter)
//     );

//     return data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const getShelter = async (id: string) => {
//   try {
//     const ref = doc(db, "shelters", id);
//     const docSnap = await getDoc(ref);

//     if (!docSnap.exists()) return null;

//     return {
//       id: docSnap.id,
//       ...docSnap.data(),
//     } as Shelter;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const getAllUsers = async () => {
//   try {
//     const q = query(collection(db, "managers"), orderBy("createdAt", "desc"));
//     const querySnapshot = await getDocs(q);
//     const data = querySnapshot.docs.map((doc) => {
//       return {
//         id: doc.id,
//         fullName: doc.data().fullName,
//         age: doc.data().age,
//         phoneNumber: doc.data().phoneNumber,
//         email: doc.data().email,
//         gender: doc.data().gender,
//         address: doc.data().address,
//       };
//     });
//     return data;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const getUser = async (id: string) => {
//   try {
//     const ref = doc(db, "users", id);
//     const docSnap = await getDoc(ref);

//     if (!docSnap.exists()) return null;

//     return {
//       id: docSnap.id,
//       ...docSnap.data(),
//     };
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// export const createShelter = async (data: Shelter) => {
//   try {
//     const ref = collection(db, "shelters");

//     await addDoc(ref, {
//       name: data.name,
//       location: data.location,
//       type: data.type,
//       capacity: data.capacity,
//       status: data.status,
//       createdAt: Timestamp.now(),
//     });

//     return { success: true };
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// export const updateShelter = async (data: Shelter, id: string) => {
//   try {
//     const ref = doc(db, "shelters", id);

//     await setDoc(ref, data);
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// export const deleteShelter = async (id: string) => {
//   try {
//     await deleteDoc(doc(db, "shelters", id));
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const createResident = async (data: Resident) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       data.email,
//       data.password!
//     );

//     const { members, password, ...managerData } = data;

//     const managerDocRef = await addDoc(collection(db, "managers"), {
//       ...managerData,
//       auth_id: userCredential.user.uid,
//       age: formatBirthDate(data.dateOfBirth),
//       isAssigned: false,
//       createdAt: Timestamp.now(),
//       updatedAt: Timestamp.now(),
//     });

//     await createMembers(members, managerDocRef.id);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const updateUser = async (data: User, id: string) => {
//   try {
//     const ref = doc(db, "users", id);
//     await setDoc(ref, data);
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// export const deleteUser = async (id: string) => {
//   try {
//     await deleteDoc(doc(db, "users", id));
//   } catch (error) {
//     console.error(error);
//   }
// };
