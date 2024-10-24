"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Monitor, Bell, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";
import Notifications from "./tabs/notification";
import Appearance from "./appearance";
import Profile from "./profile";
import Account from "./account";

const navigationItems = [
  {
    icon: User,
    label: "Profile",
    href: "profile",
    description: "This is how others will see you on the site.",
    component: Profile,
  },
  {
    icon: Wrench,
    label: "Account",
    href: "account",
    description: "Manage your account settings",
    component: Account,
  },

  {
    icon: Bell,
    label: "Notifications",
    href: "notifications",
    description: "Configure your notification preferences",
    component: Notifications,
  },
  {
    icon: Monitor,
    label: "Appearance",
    href: "appearance",
    description: "Customize your interface",
    component: Appearance,
  },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const ActiveComponent =
    navigationItems.find((item) => item.href === activeSection)?.component ||
    Profile;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-zinc-500">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator />

        <div className="flex gap-6">
          <nav className="w-64 flex-shrink-0">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.href}
                    variant={
                      activeSection === item.href ? "secondary" : "ghost"
                    }
                    className={cn(
                      "w-full justify-start gap-2",
                      activeSection === item.href
                        ? "bg-zinc-100 dark:bg-zinc-800"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    )}
                    onClick={() => setActiveSection(item.href)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </nav>

          <div className="flex-1">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
