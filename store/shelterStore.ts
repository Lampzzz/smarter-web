import { create } from "zustand";

import { ShelterFilterTypes, ShelterState } from "@/types";
import {
  deleteShelterById,
  getShelterById,
  getShelters,
  updateShelter,
} from "@/firebase/firestore/shelter";

const useShelterStore = create<ShelterState>((set, get) => ({
  shelters: [],
  totalData: 0,
  shelter: null,
  isLoading: false,

  async fetchShelters(filters?: ShelterFilterTypes) {
    set({ isLoading: true });

    try {
      const data = await getShelters();
      let shelters = data ?? [];

      if (filters) {
        const statusArray = filters.status ? filters.status.split(".") : [];

        if (statusArray.length > 0) {
          shelters = shelters.filter((shelter) =>
            statusArray.includes(shelter.status)
          );
        }

        if (filters.search) {
          shelters = shelters.filter((shelter) =>
            shelter.name.toLowerCase().includes(filters.search!.toLowerCase())
          );
        }
      }

      set({ shelters: shelters, totalData: data.length });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },

  fetchShelter: async (id: string) => {
    try {
      const data = await getShelterById(id);

      if (data) {
        set({ shelter: data });
      }
    } catch (error) {
      console.error(error);
      set({ shelter: null });
    }
  },

  handleUpdate: async (data: any, id: string) => {
    set({ isLoading: true });

    try {
      await updateShelter(data, id);
      await get().fetchShelter(id);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  handleDelete: async (id: string) => {
    try {
      await deleteShelterById(id);
      await get().fetchShelters();
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useShelterStore;
