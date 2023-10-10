import React, { useState } from "react";
import { ISidebarItemModel } from "../../models/ISidebarItemModel";
import { NavLink, useLocation } from "react-router-dom";

export interface SideBarItemsProps {
  item: ISidebarItemModel;
  expand: boolean;
}

export function SidebarItem(props: any) {
  let item: ISidebarItemModel = props.item;
  let expand: boolean = props.expand;
  const location = useLocation();
  const isActive = location.pathname === item.href;
  const [hovering, setHovering] = useState(isActive);

  if (!item?.href) {
    return (
      <button className="w-full" onClick={props.handleClick}>
        <div
          className={`h-16 w-full rounded-xl bg-stone-900 p-4 flex flex-none items-center ${
            expand ? "aspect-square" : null
          }`}
          style={{
            backgroundColor: isActive ? "rgb(41 37 36)" : "rgb(28 25 23)",
            fontWeight: isActive || hovering ? "400" : "300",
          }}
          onMouseEnter={() => {
            if (!isActive) {
              setHovering(true);
            }
          }}
          onMouseLeave={() => {
            if (!isActive) {
              setHovering(false);
            }
          }}
        >
          <div className="flex-none w-6 h-6">
            {hovering ? item.selectedIcon : item.icon}
          </div>
          {expand ? <div className="ml-3">{item.text}</div> : null}
        </div>
      </button>
    );
  } else {
    return (
      <NavLink to={item.href}>
        <div
          className={`h-16 w-full rounded-xl bg-stone-900 p-4 flex flex-none items-center ${
            expand ? "aspect-square" : null
          }`}
          style={{
            backgroundColor: isActive ? "rgb(41 37 36)" : "rgb(28 25 23)",
            fontWeight: isActive || hovering ? "400" : "300",
          }}
          onMouseEnter={() => {
            if (!isActive) {
              setHovering(true);
            }
          }}
          onMouseLeave={() => {
            if (!isActive) {
              setHovering(false);
            }
          }}
        >
          <div className="flex-none w-6 h-6">
            {hovering ? item.selectedIcon : item.icon}
          </div>
          {expand ? <div className="ml-3">{item.text}</div> : null}
        </div>
      </NavLink>
    );
  }
}

export default SidebarItem;
