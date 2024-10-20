import { create } from "zustand";

import { MemberState, UserFilterTypes } from "@/types";
import { getMembers } from "@/firebase/firestore/members";

const useMemberStore = create<MemberState>((set, get) => ({
  members: [],
  isLoading: false,
  totalData: 0,

  async fetchMembers({
    page = 1,
    limit = 10,
    genders,
    search,
  }: UserFilterTypes) {
    set({ isLoading: true });

    try {
      const data = await getMembers();
      let members = data ?? [];

      const genderArray = genders ? genders.split(".") : [];

      if (genderArray.length > 0) {
        members = members.filter((member) =>
          genderArray.includes(member.gender)
        );
      }

      if (search) {
        members = members.filter((member) =>
          member.fullName.toLowerCase().includes(search.toLowerCase())
        );
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
