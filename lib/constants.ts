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
    lable: "dashboard",
    href: "/",
    icon: Home,
  },
  {
    lable: "questions",
    href: "/questions",
    icon: ScrollText,
  },
  {
    lable: "academy",
    href: "/academy",
    icon: School,
  },
  {
    lable: "subject",
    href: "/subject",
    icon: Book,
  },
  {
    lable: "exams",
    href: "/exams",
    icon: FilePenLine,
  },
  {
    lable: "ai",
    href: "/ai",
    icon: Bot,
    disable: true,
  },
  {
    lable: "users",
    href: "/mange-users",
    icon: UserPlus,
  },
  {
    lable: "settings",
    href: "/profile",
    icon: Settings,
  },
];

export const TypeQuestion = [
  { lable: "Multi Choise", value: 1 },
  { lable: "True And False", value: 2 },
  { lable: "Short Asnwer", value: 3 },
];
