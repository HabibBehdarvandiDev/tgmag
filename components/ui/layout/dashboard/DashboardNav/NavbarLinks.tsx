import ChartRoseIcon from "@/components/icons/ChartRoseIcon";
import Home04Icon from "@/components/icons/Home04Icon";
import LicenseDraftIcon from "@/components/icons/LicenseDraftIcon";
import QuillWrite01Icon from "@/components/icons/QuillWrite01Icon";
import RankingIcon from "@/components/icons/RankingIcon";
import Settings02Icon from "@/components/icons/Settings02Icon";
import UserGroupIcon from "@/components/icons/UserGroupIcon";
import UserIcon from "@/components/icons/UserIcon";
import Wallet01Icon from "@/components/icons/Wallet01Icon";
import { NavbarLink } from "@/schema/UI";

export const AdminNavbarLinks: NavbarLink = [
  {
    title: "داشبورد",
    href: "/dashboard/admin",
    startContent: <Home04Icon />,
  },
  {
    title: "مدیریت نویسندگان",
    href: "/dashboard/admin/writers",
    startContent: <UserIcon />,
    links: [
      {
        title: "رتبه بندی ها",
        href: "/dashboard/admin/writers/ranks",
        startContent: <RankingIcon />,
      },
    ],
  },
  {
    title: "تنظیمات",
    href: "/dashboard/admin/settings",
    startContent: <Settings02Icon />,
  },
  {
    title: "گزارشات",
    href: "/dashboard/admin/reports",
    startContent: <ChartRoseIcon />,
  },
];
export const ManagerNavbarLinks: NavbarLink = [
  {
    title: "داشبورد",
    href: "/dashboard/manager",
    startContent: <Home04Icon />,
  },
  {
    title: "بررسی تیم",
    href: "/dashboard/manager/admins",
    startContent: <UserGroupIcon />,
  },
  {
    title: "تحلیل‌ها",
    href: "/dashboard/manager/analytics",
    startContent: <ChartRoseIcon />,
  },
  {
    title: "مدیریت نویسندگان",
    href: "/dashboard/manager/writers",
    startContent: <UserIcon />,
    links: [
      {
        title: "رتبه بندی ها",
        href: "/dashboard/manager/writers/ranks",
        startContent: <RankingIcon />,
      },
    ],
  },
];
export const WriterNavbarLinks: NavbarLink = [
  {
    title: "داشبورد",
    href: "/dashboard/writer",
    startContent: <Home04Icon />,
  },
  {
    title: "مقاله جدید",
    href: "/dashboard/writer/article/new",
    startContent: <LicenseDraftIcon />,
  },
  {
    title: "مقالات من",
    href: "/dashboard/writer/my-articles",
    startContent: <QuillWrite01Icon />,
  },
  {
    title: "درآمد‌ها",
    href: "/dashboard/writer/wallet",
    startContent: <Wallet01Icon />,
  },
];
