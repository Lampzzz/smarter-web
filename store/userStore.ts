import { getAllUsers } from "@/firebase/firestore";
import { UserFilterTypes, User } from "@/types";
import { create } from "zustand";

interface UserState {
  isLoading: boolean;
  error: string;
  users: User[] | null;
  fetchUsers: () => Promise<void>;
  filterUsers: (filters: UserFilterTypes) => void;
  filteredUsers: User[];
}

const useUserstore = create<UserState>((set, get) => ({
  isLoading: true,
  error: "",
  users: [],
  filteredUsers: [],

  async fetchUsers() {
    try {
      const data = await getAllUsers();
      set({ isLoading: false, error: "", users: data });
      get().filterUsers({ page: 1, limit: 10 });
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
    }
  },

  filterUsers: ({ page = 1, limit = 10, gender, search }: UserFilterTypes) => {
    let users = get().users ?? [];
    const genderArray = gender ? gender.split(".") : [];

    if (genderArray.length > 0) {
      users = users.filter((user) =>
        genderArray.includes(user.gender.toLowerCase())
      );
    }

    if (search) {
      users = users.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    set({ filteredUsers: users });
  },
}));

export default useUserstore;
