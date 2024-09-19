import Bug02Icon from "@/components/icons/Bug02Icon";
import Call02Icon from "@/components/icons/Call02Icon";
import Door01Icon from "@/components/icons/Door01Icon";
import LicenseDraftIcon from "@/components/icons/LicenseDraftIcon";
import Settings02Icon from "@/components/icons/Settings02Icon";
import UserAdd02Icon from "@/components/icons/UserAdd02Icon";
import UserIcon from "@/components/icons/UserIcon";
import { AsideDropDown } from "@/schema/UI";

export const WriterDropDownLinks: AsideDropDown = [
  {
    section: "اکشن",
    links: [
      {
        title: "پروفایل",
        key: "profile",
        href: "/dashboard/setting/profile",
        startContent: <UserIcon className="w-5 h-5" />,
      },
      {
        title: "نوشته جدید",
        key: "new-blog",
        href: "/dashboard/blogs/new",
        startContent: <LicenseDraftIcon className="w-5 h-5" />,
      },
      {
        title: "تنظیمات",
        key: "setting",
        href: "/dashboard/setting",
        startContent: <Settings02Icon className="w-5 h-5" />,
      },
    ],
  },
  {
    section: "ارتباطات",
    links: [
      {
        title: "ارتباط با ما",
        key: "profile",
        href: "/contact-us",
        startContent: <Call02Icon className="w-5 h-5" />,
      },
      {
        title: "گزارش باگ",
        key: "bug-report",
        href: "/bug-report",
        startContent: <Bug02Icon className="w-5 h-5" />,
      },
    ],
  },
  {
    section: "منطقه حساس",
    links: [
      {
        title: "خروج از حساب",
        key: "logout",
        color: "danger",
        startContent: <Door01Icon className="w-5 h-5" />,
      },
    ],
  },
];

export const AdminDropDownLinks: AsideDropDown = [
  {
    section: "اکشن",
    links: [
      {
        title: "پروفایل",
        key: "profile",
        href: "/dashboard/setting/profile",
        startContent: <UserIcon className="w-5 h-5" />,
      },
      {
        title: "نویسنده جدید",
        key: "new-writer",
        href: "/dashboard/writers/new",
        startContent: <UserAdd02Icon className="w-5 h-5" />,
      },
      {
        title: "تنظیمات",
        key: "setting",
        href: "/dashboard/setting",
        startContent: <Settings02Icon className="w-5 h-5" />,
      },
    ],
  },
  {
    section: "ارتباطات",
    links: [
      {
        title: "گزارش باگ",
        key: "bug-report",
        href: "/bug-report",
        startContent: <Bug02Icon className="w-5 h-5" />,
      },
    ],
  },
  {
    section: "منطقه حساس",
    links: [
      {
        title: "خروج از حساب",
        key: "logout",
        color: "danger",
        startContent: <Door01Icon className="w-5 h-5" />,
      },
    ],
  },
];

export const ManagerDropDownLinks: AsideDropDown = [
  {
    section: "اکشن",
    links: [
      {
        title: "پروفایل",
        key: "profile",
        href: "/dashboard/setting/profile",
        startContent: <UserIcon className="w-5 h-5" />,
      },
      {
        title: "ادمین جدید",
        key: "new-admin",
        href: "/dashboard/admins/new",
        startContent: <UserAdd02Icon className="w-5 h-5" />,
      },
      {
        title: "تنظیمات",
        key: "setting",
        href: "/dashboard/setting",
        startContent: <Settings02Icon className="w-5 h-5" />,
      },
    ],
  },
  {
    section: "ارتباطات",
    links: [
      {
        title: "گزارش باگ",
        key: "bug-report",
        href: "/bug-report",
        startContent: <Bug02Icon className="w-5 h-5" />,
      },
    ],
  },
  {
    section: "منطقه حساس",
    links: [
      {
        title: "خروج از حساب",
        key: "logout",
        color: "danger",
        startContent: <Door01Icon className="w-5 h-5" />,
      },
    ],
  },
];
