"use client";

import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const user_role = localStorage.getItem("user_role");

  const router = useRouter();

  return router.push(`/dashboard/${user_role}`);
};

export default DashboardPage;
