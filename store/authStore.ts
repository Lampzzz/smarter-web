import { auth } from "@/firebase/config";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { create } from "zustand";

interface UserStoreState {
  currentUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initializeAuthListener: () => () => void;
}

const useAuthStore = create<UserStoreState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,

  initializeAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        set({
          isAuthenticated: true,
          currentUser: userAuth,
        });
      } else {
        set({
          isAuthenticated: false,
          currentUser: null,
        });
      }
    });

    set({ isLoading: false });

    return unsubscribe;
  },
}));

export default useAuthStore;
