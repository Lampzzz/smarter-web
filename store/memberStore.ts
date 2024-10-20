import { create } from "zustand";

import { MemberState, UserFilterTypes } from "@/types";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "@/firebase/firestore";
import { getMembers } from "@/firebase/firestore/members";

const useMemberStore = create<MemberState>((set, get) => ({
  members: [],
  isLoading: false,
  totalData: 0,

  fetchMembers: ({
    page = 1,
    limit = 10,
    genders,
    search,
  }: UserFilterTypes) => {
    let members = getMembers() ?? [];
    const genderArray = genders ? genders.split(".") : [];

    if (genderArray.length > 0) {
      members = members.filter((user) => genderArray.includes(user.gender));
    }

    if (search) {
      members = members.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }

    set({ members });
  },
}));

export default useMemberStore;
