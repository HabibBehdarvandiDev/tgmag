import React from "react";
import AsideDropDown from "./AsideDropDown";
import DashboardNavbar from "../DashboardNav/DashboardNavbar";
import { Card } from "@nextui-org/react";

const DashboardAside = () => {
  return (
    <Card className="w-16 lg:w-64 h-screen bg-background py-4 flex flex-col overflow-hidden">
      <div className="flex items-center mb-6 justify-center lg:justify-start lg:px-4">
        <AsideDropDown />
      </div>

      <DashboardNavbar />
    </Card>
  );
};

export default DashboardAside;
