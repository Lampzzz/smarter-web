import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: false,
    items: [],
  },
  {
    title: "Shelter",
    url: "/dashboard/shelter",
    icon: "house",
    isActive: false,
    items: [],
  },
  {
    title: "Resident",
    url: "#",
    icon: "users",
    isActive: true,
    items: [
      {
        title: "Manager",
        url: "/dashboard/manager",
        icon: "userCheck",
      },
      {
        title: "Member",
        url: "/dashboard/member",
        icon: "user",
      },
    ],
  },
  {
    title: "Announcement",
    url: "/dashboard/message",
    icon: "mail",
    isActive: false,
    items: [],
  },
];
