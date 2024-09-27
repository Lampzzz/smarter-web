import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
  apiKey: "AIzaSyDP34GWIU62RjGYczaCY3EWc7NtCTj1kpA",
  authDomain: "smarter-293ff.firebaseapp.com",
  projectId: "smarter-293ff",
  storageBucket: "smarter-293ff.appspot.com",
  messagingSenderId: "651315340090",
  appId: "1:651315340090:web:1faec02190b7cd4f89a603",
  measurementId: "G-57713HZP99",
};

const app = initializeApp(config);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
