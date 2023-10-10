import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

export function UserLayout() {
  return (
    <>
      <Sidebar />
      <div className="relative flex flex-grow items-center overflow-hidden justify-center rounded-xl bg-neutral-200">
        <div className="w-full h-full flex items-center justify-center overflow-x-hidden overscroll-contain overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
