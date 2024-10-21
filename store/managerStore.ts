import { create } from "zustand";

import { ManagerState, UserFilterTypes } from "@/types";
import {
  deleteManagerById,
  getManagerById,
  getManagers,
  getUnAssignedManager,
  updateManager,
} from "@/firebase/firestore/manager";

const useManagerStore = create<ManagerState>((set, get) => ({
  managers: [],
  manager: null,
  unassignedManagers: [],
  totalData: 0,
  isLoading: false,

  async fetchManagers(filters?: UserFilterTypes) {
    set({ isLoading: true });

    try {
      const data = await getManagers();
      let managers = data ?? [];

      if (filters) {
        const genderArray = filters.genders ? filters.genders.split(".") : [];

        if (genderArray.length > 0) {
          managers = managers.filter((value) =>
            genderArray.includes(value.gender)
          );
        }

        if (filters.search) {
          managers = managers.filter((value) =>
            value.fullName.toLowerCase().includes(filters.search!.toLowerCase())
          );
        }
      }

      set({ managers: managers, totalData: data.length });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  async fetchUnAssignedManager() {
    const data = await getUnAssignedManager();
    set({ unassignedManagers: data });
  },

  // fetchManger: async (id: string) => {
  //   try {
  //     const data = await getManagerById(id);

  //     set({ manager: data });
  //   } catch (error) {
  //     console.error(error);
  //     set({ manager: null });
  //   }
  // },

  // handleUpdate: async (data: any, id: string) => {
  //   set({ isLoading: true });

  //   try {
  //     await updateManager(data, id);
  //     await get().fetchManger(id);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },

  // handleDelete: async (id: string) => {
  //   try {
  //     await deleteManagerById(id);
  //     await get().fetchManagers();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
}));

export default useManagerStore;
