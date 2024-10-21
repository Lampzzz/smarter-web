import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/config";
import { AuthState } from "@/types";
import { getAdminById } from "@/firebase/firestore/admin";

const useAuthStore = create<AuthState>((set, get) => ({
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
    const userData = await getAdminById(id);
    if (userData) {
      set({ currentUser: userData });
    } else {
      console.warn(`No user found with authId: ${id}`);
      set({ currentUser: null });
    }
  },
}));

export default useAuthStore;
