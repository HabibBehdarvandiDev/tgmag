import React from "react";
import AsideDropDown from "./AsideDropDown";
import DashboardNavbar from "../DashboardNav/DashboardNavbar";
import { Card } from "@nextui-org/react";

const DashboardAside = () => {
  return (
    <Card className="w-64 h-screen bg-background p-4 flex flex-col">
      <div className="flex items-center mb-6">
        <AsideDropDown />
      </div>

      <DashboardNavbar />
    </Card>
  );
};

export default DashboardAside;
