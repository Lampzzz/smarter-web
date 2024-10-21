import { create } from "zustand";

import { MemberState, UserFilterTypes } from "@/types";
import { getMembers } from "@/firebase/firestore/members";

const useMemberStore = create<MemberState>((set, get) => ({
  members: [],
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
}));

export default useMemberStore;
