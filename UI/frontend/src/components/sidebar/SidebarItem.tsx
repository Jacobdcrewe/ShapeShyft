import React, { useState } from "react";
import { ISidebarItemModel } from "../../models/ISidebarItemModel";

function SidebarItem(props: any) {
  let item: ISidebarItemModel = props.item;
  let expand: boolean = props.expand;
  const [hovering, setHovering] = useState(item.selected);

  if (!item?.href) {
    return (
      <button className="w-full" onClick={props.handleClick}>
        <div
          className={`h-16 w-full rounded-xl bg-stone-900 p-4 flex flex-none items-center ${
            expand ? "aspect-square" : null
          }`}
          style={{
            backgroundColor: item.selected ? "rgb(41 37 36)" : "rgb(28 25 23)",
            fontWeight: item.selected || hovering ? "400" : "300",
          }}
          onMouseEnter={() => {
            if (!item.selected) {
              setHovering(true);
            }
          }}
          onMouseLeave={() => {
            if (!item.selected) {
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
      <a href={item.href}>
        <div
          className={`h-16 w-full rounded-xl bg-stone-900 p-4 flex flex-none items-center ${
            expand ? "aspect-square" : null
          }`}
          style={{
            backgroundColor: item.selected ? "rgb(41 37 36)" : "rgb(28 25 23)",
            fontWeight: item.selected || hovering ? "400" : "300",
          }}
          onMouseEnter={() => {
            if (!item.selected) {
              setHovering(true);
            }
          }}
          onMouseLeave={() => {
            if (!item.selected) {
              setHovering(false);
            }
          }}
        >
          <div className="flex-none w-6 h-6">
            {hovering ? item.selectedIcon : item.icon}
          </div>
          {expand ? <div className="ml-3">{item.text}</div> : null}
        </div>
      </a>
    );
  }
}

export default SidebarItem;
