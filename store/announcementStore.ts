import { getAnnouncements } from "@/firebase/firestore/announcement";
import { Announcement } from "@/types";
import { create } from "zustand";

interface AnnouncementFilterTypes {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

interface AnnouncementState {
  announcements: Announcement[] | null;
  totalData: number;
  isLoading: boolean;
  fetchAnnouncements: (filters?: AnnouncementFilterTypes) => Promise<void>;
  // fetchAnnouncement: (id: string) => Promise<void>;
}

const useAnnouncementStore = create<AnnouncementState>((set, get) => ({
  announcements: [],
  totalData: 0,
  isLoading: false,

  async fetchAnnouncements(filters?: AnnouncementFilterTypes) {
    set({ isLoading: true });

    try {
      const data = await getAnnouncements();
      let announcements = data ?? [];

      if (filters) {
        const categoryArray = filters.category
          ? filters.category.split(".")
          : [];

        if (categoryArray.length > 0) {
          announcements = announcements.filter((item) =>
            categoryArray.includes(item.category)
          );
        }

        if (filters.search) {
          announcements = announcements.filter((shelter) =>
            shelter.title.toLowerCase().includes(filters.search!.toLowerCase())
          );
        }
      }

      set({ announcements: announcements, totalData: data.length });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAnnouncementStore;
