import DashboardAside from "@/components/ui/layout/DashboardAside";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <DashboardAside />
      <section>
        <header>header</header>
        {children}
      </section>
    </div>
  );
}
