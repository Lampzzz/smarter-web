import { create } from "zustand";

import { MemberState, UserFilterTypes } from "@/types";
import {
  deleteMemberById,
  getMemberById,
  getMembers,
  updateMember,
} from "@/firebase/firestore/members";

const useMemberStore = create<MemberState>((set, get) => ({
  members: [],
  member: null,
  isLoading: false,
  totalData: 0,

  async fetchMembers(filters?: UserFilterTypes) {
    set({ isLoading: true });

    try {
      const data = await getMembers();
      let members = data ?? [];

      if (filters) {
        const genderArray = filters.genders ? filters.genders.split(".") : [];

        if (genderArray.length > 0) {
          members = members.filter((member) =>
            genderArray.includes(member.gender)
          );
        }

        if (filters.search) {
          members = members.filter((member) =>
            member.fullName
              .toLowerCase()
              .includes(filters.search!.toLowerCase())
          );
        }
      }

      set({ members: members, totalData: data.length });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMember: async (id: string) => {
    try {
      const data = await getMemberById(id);

      if (data) {
        set({ member: data });
      }
    } catch (error) {
      console.error(error);
      set({ member: null });
    }
  },

  handleUpdate: async (data: any, id: string) => {
    set({ isLoading: true });

    try {
      await updateMember(data, id);
      await get().fetchMember(id);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  handleDelete: async (id: string) => {
    try {
      await deleteMemberById(id);
      await get().fetchMembers();
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useMemberStore;
