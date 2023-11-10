import React, { useState } from "react";
import Popup from "../../recipes/Popup";

export function Recipes() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(
    null
  ); // Initialize as null
  const [searchText, setSearchText] = useState("");

  const openPopup = (index: number) => {
    setPopupOpen(true);
    setSelectedRecipeIndex(index);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedRecipeIndex(null); // Reset the selectedRecipeIndex when closing the popup
  };

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <input
          type="text"
          placeholder="Find a Recipe"
          value={searchText}
          onChange={handleSearchTextChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      <div className="flex flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {Array(25)
          .fill(true)
          .map((item, index) => {
            if (
              searchText.length > 0 &&
              `Recipe ${index}`
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) === -1
            ) {
              return null;
            }
            return (
              <div
                key={index}
                onClick={() => openPopup(index)}
                className="rounded-xl aspect-square px-4 py-2 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] m-1 hover:m-0 transition-all ease-in-out duration-150 brightness-[0.98] hover:brightness-100 cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
                  alt="recipe"
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="text-4xl">{`Recipe ${index}`}</p>
              </div>
            );
          })}
      </div>

      {/* Render the Popup component */}
      {popupOpen && <Popup onClose={closePopup} index={selectedRecipeIndex} />}
    </div>
  );
}

export default Recipes;
