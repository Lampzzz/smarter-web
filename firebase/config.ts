import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApKHArQBNoU9EznvBo9mjWQ5_AEVGrxhA",
  authDomain: "smarter-b2908.firebaseapp.com",
  projectId: "smarter-b2908",
  storageBucket: "smarter-b2908.appspot.com",
  messagingSenderId: "554749243276",
  appId: "1:554749243276:web:432a2dcf0ba8e2c10530a9",
  measurementId: "G-H3RK97YEZ0",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
