import { create } from "zustand";

import { ShelterFilterTypes, ShelterStore } from "@/types";
import {
  deleteShelter,
  getAllShelters,
  getShelter,
  updateShelter,
} from "@/firebase/firestore";

const useShelterStore = create<ShelterStore>((set, get) => ({
  shelters: [],
  filteredShelters: [],
  totalData: 0,
  shelter: null,
  isLoading: false,

  async fetchShelters() {
    try {
      const data = await getAllShelters();
      set({
        isLoading: false,
        shelters: data,
        totalData: data.length,
      });
      get().filterShelters({ page: 1, limit: 10 });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  filterShelters: ({
    page = 1,
    limit = 10,
    status,
    search,
  }: ShelterFilterTypes) => {
    let shelters = get().shelters ?? [];
    const statusArray = status ? status.split(".") : [];

    if (statusArray.length > 0) {
      shelters = shelters.filter((shelter) =>
        statusArray.includes(shelter.status)
      );
    }

    if (search) {
      shelters = shelters.filter((shelter) =>
        shelter.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    set({ filteredShelters: shelters });
  },

  fetchShelter: async (id: string) => {
    try {
      const data = await getShelter(id);

      if (data) {
        set({
          shelter: {
            name: data.name,
            location: data.location,
            type: data.type,
            capacity: data.capacity,
            status: data.status,
          },
        });
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
      await deleteShelter(id);
      await get().fetchShelters();
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useShelterStore;
