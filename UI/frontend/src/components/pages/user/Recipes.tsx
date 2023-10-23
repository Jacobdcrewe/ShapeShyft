import React, { useState } from "react";
import Popup from "../../recipes/Popup";

export function Recipes() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(
    null
  ); // Initialize as null

  const openPopup = (index: number) => {
    setPopupOpen(true);
    setSelectedRecipeIndex(index);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedRecipeIndex(null); // Reset the selectedRecipeIndex when closing the popup
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {Array(13)
          .fill(true)
          .map((item, index) => (
            <div
              key={index}
              onClick={() => openPopup(index)}
              className="rounded-xl aspect-square px-4 py-2 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] m-1 hover:m-0 transition-all ease-in-out duration-150 brightness-[0.98] hover:brightness-100 cursor-pointer"
            >
              <p className="text-7xl">Recipe {index}</p>
            </div>
          ))}
      </div>

      {/* Render the Popup component */}
      {popupOpen && <Popup onClose={closePopup} index={selectedRecipeIndex} />}
    </div>
  );
}

export default Recipes;
