import React from "react";
import AsideDropDown from "./AsideDropDown";

const DashboardAside = () => {
  return (
    <aside className="w-64 h-screen bg-background p-4 flex flex-col">
      <div className="flex items-center mb-6">
        <AsideDropDown />
      </div>

      <div className="relative mb-6">{/* search input */} </div>

      {/* Navbar */}
    </aside>
  );
};

export default DashboardAside;
