import { create } from "zustand";

import { UserFilterTypes, UserForm, UserStore } from "@/types";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "@/firebase/firestore";

const useUserStore = create<UserStore>((set, get) => ({
  isLoading: false,
  users: [],
  filteredUsers: [],
  totalData: 0,
  user: null,

  async fetchUsers() {
    try {
      const data = await getAllUsers();
      set({ isLoading: false, users: data, totalData: data.length });
      get().filterUsers({ page: 1, limit: 10 });
    } catch (error) {
      set({ isLoading: false });
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

  fetchUser: async (id: string) => {
    try {
      const data = await getUser(id);

      set({ user: data as UserForm });
    } catch (error) {
      console.error(error);
      set({ user: null });
    }
  },

  handleUpdate: async (data: any, id: string) => {
    set({ isLoading: true });

    try {
      await updateUser(data, id);
      await get().fetchUser(id);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  handleDelete: async (id: string) => {
    try {
      await deleteUser(id);
      await get().fetchUsers();
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserStore;
