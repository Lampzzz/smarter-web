import { deleteShelter, getAllShelters } from "@/firebase/firestore";
import { ShelterFilterTypes, Shelter } from "@/types";
import { create } from "zustand";

interface ShelterState {
  isLoading: boolean;
  error: string;
  shelters: Shelter[] | null;
  fetchShelters: () => Promise<void>;
  filterShelters: (filters: ShelterFilterTypes) => void;
  filteredShelters: Shelter[];
  handleDelete: (id: string) => Promise<void>;
  totalData: number;
}

const useShelterStore = create<ShelterState>((set, get) => ({
  isLoading: true,
  error: "",
  shelters: [],
  filteredShelters: [],
  totalData: get().shelters?.length ?? 0,

  async fetchShelters() {
    try {
      const data = await getAllShelters();
      set({ isLoading: false, error: "", shelters: data });
      get().filterShelters({ page: 1, limit: 10 });
    } catch (error) {
      set({ isLoading: false, error: (error as Error).message });
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
