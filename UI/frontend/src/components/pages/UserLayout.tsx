import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

export function UserLayout() {
  return (
    <>
      <Sidebar />
      <div className="flex flex-grow items-center justify-center rounded-xl bg-neutral-200 p-4">
        <Outlet />
      </div>
    </>
  );
}

export default UserLayout;
