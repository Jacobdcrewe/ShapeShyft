import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useContext } from "react";
import { ISidebarItemModel } from "../../models/ISidebarItemModel";
import SidebarItem from "./SidebarItem";
import Routes from "../Routes";
import { UserContext } from "../ContentRouter";

function Sidebar() {
  const { setLogin } = useContext(UserContext);

  const [expand, setExpand] = useState(() => {
    const setSize = sessionStorage.getItem("expandSidebar");
    return JSON.parse(setSize!) ?? true;
  });

  useEffect(() => {
    sessionStorage.setItem("expandSidebar", JSON.stringify(expand));
  }, [expand]);

  return (
    <aside
      className={`relative transition-all ease-in-out duration-300 rounded-xl text-white left-0 mr-2 ${
        expand ? "w-72" : "w-[5.5rem]"
      } flex-none h-full bg-stone-950 overflow-hidden hidden md:flex md:flex-col p-4`}
    >
      <div className="w-full">
        <div
          className="text-neutral-300 ml-auto w-fit mt-2 mb-4 mx-1 hover:cursor-pointer hover:text-white"
          onClick={() => setExpand(!expand)}
        >
          <ChevronRightIcon
            className={`w-6 h-6 transition-all ease-in-out duration-200 ${
              expand ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>

      {Routes.map((value: ISidebarItemModel) => (
        <div className="w-full mb-4" key={value.href}>
          <SidebarItem item={value} expand={expand} />
        </div>
      ))}
      <div className="w-full mt-auto bottom-0">
        <button className="h-16 w-full rounded-xl bg-stone-900" onClick={() => {setLogin(""); localStorage.removeItem('userLogin')}} >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
