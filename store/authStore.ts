import { auth } from "@/firebase/config";
import { UserState } from "@/types";
import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

const useAuthStore = create<UserState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,

  initializeAuthListener: () => {
    set({ isLoading: true });

    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        set({
          isAuthenticated: true,
          currentUser: userAuth,
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          currentUser: null,
          isLoading: false,
        });
      }
    });

    return unsubscribe;
  },
}));

export default useAuthStore;
