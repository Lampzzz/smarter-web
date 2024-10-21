import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Shelter",
    href: "/dashboard/shelter",
    icon: "house",
    label: "Shelter",
  },
  {
    title: "Resident",
    icon: "users",
    label: "Resident",
    children: [
      {
        title: "Manager",
        href: "/dashboard/resident/manager",
        icon: "userCheck",
        label: "Manager",
      },
      {
        title: "Member",
        href: "/dashboard/resident/member",
        icon: "user",
        label: "Member",
      },
    ],
  },
  {
    title: "Message",
    href: "/dashboard/message",
    icon: "mail",
    label: "Message",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "settings",
    label: "Settings",
  },
];
