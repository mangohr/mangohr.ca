import { Building, Calendar, Home, Settings, Timer, Users } from "lucide-react";
export const navs = (orgSlug: string) => ({
  main: [
    {
      name: "Home",
      icon: Home,
      url: `/org/${orgSlug}`,
    },
    {
      name: "Employees",
      icon: Users,
      url: `/org/${orgSlug}/employee`,
    },
    {
      name: "Time Off",
      icon: Timer,
      url: `/org/${orgSlug}/time-off`,
    },
    {
      name: "Attendance",
      icon: Calendar,
      url: `/org/${orgSlug}/attendance`,
    },
    {
      name: "Company",
      icon: Building,
      url: `/org/${orgSlug}/company`,
    },
  ],
  bottom: [
    {
      name: "Settings",
      icon: Settings,
      url: `/org/${orgSlug}/settings`,
    },
  ],
});
