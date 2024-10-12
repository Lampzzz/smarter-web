import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/config";
import { AuthStore } from "@/types";
import { getAdmin } from "@/firebase/firestore";

const useAuthStore = create<AuthStore>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,

  initializeAuthListener: () => {
    set({ isLoading: true });

    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        set({
          isAuthenticated: true,
          isLoading: false,
        });

        get().fetchUserData(userAuth.uid);
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

  fetchUserData: async (id: string) => {
    const userData = await getAdmin(id);
    if (userData) {
      set({ currentUser: userData });
    } else {
      console.warn(`No user found with authId: ${id}`);
      set({ currentUser: null });
    }
  },
}));

export default useAuthStore;
