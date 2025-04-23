import {
  School,
  FilePenLine,
  Book,
  Home,
  ScrollText,
  Bot,
  UserPlus,
  Settings,
} from "lucide-react";

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const navItems = [
  {
    lable: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    lable: "Questions",
    href: "/questions",
    icon: ScrollText,
  },
  {
    lable: "Academy",
    href: "/academy",
    icon: School,
  },
  {
    lable: "Subject",
    href: "/subject",
    icon: Book,
  },
  {
    lable: "Exams",
    href: "/exams",
    icon: FilePenLine,
    disable: true,
  },
  {
    lable: "Ai",
    href: "/ai",
    icon: Bot,
    disable: true,
  },
  {
    lable: "Mange User",
    href: "/mange-users",
    icon: UserPlus,
  },
  {
    lable: "Settings",
    href: "/profile",
    icon: Settings,
  },
];
