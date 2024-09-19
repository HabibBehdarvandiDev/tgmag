import DashboardAside from "@/components/ui/layout/dashboard/DashboardAside/DashboardAside";
import DashboardHeader from "@/components/ui/layout/dashboard/header/Header";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <DashboardAside />
      <section className="w-full h-screen overflow-auto scrollbar-hide">
        <DashboardHeader />
        <main className="p-4">{children}</main>
      </section>
    </div>
  );
}
