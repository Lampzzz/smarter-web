import { getAllShelters } from "@/firebase/firestore";
import { FilterTypes, Shelter } from "@/types";
import { create } from "zustand";

interface ShelterState {
  isLoading: boolean;
  error: string;
  shelters: Shelter[] | null;
  fetchShelters: () => Promise<void>;
  filterShelters: (filters: FilterTypes) => void;
  filteredShelters: Shelter[];
}

const useShelterStore = create<ShelterState>((set, get) => ({
  isLoading: true,
  error: "",
  shelters: [],
  filteredShelters: [],

  async fetchShelters() {
    try {
      const data = await getAllShelters();
      set({ isLoading: false, error: "", shelters: data });
      get().filterShelters({ page: 1, limit: 10 });
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
    }
  },

  filterShelters: ({ page = 1, limit = 10, status, search }: FilterTypes) => {
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

    const offset = (page - 1) * limit;
    const paginatedShelters = shelters.slice(offset, offset + limit);

    set({ filteredShelters: paginatedShelters });
  },
}));

export default useShelterStore;
