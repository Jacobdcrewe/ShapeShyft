import React, { useState } from "react";

interface PopupProps {
  onClose: () => void; // Function that takes no parameters and returns void
  index: number | null; // Number type or null for index
}

export function Popup({ onClose, index }: PopupProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
        <span
          className="absolute top-2 right-2 cursor-pointer text-2xl"
          onClick={onClose}
        >
          ×
        </span>
        <div className="flex justify-center items-center mb-4">
          <button
            className={`px-4 py-2 rounded-tl rounded-bl ${
              activeTab === 0 ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => setActiveTab(0)}
          >
            Recipe
          </button>
          <button
            className={`px-4 py-2 rounded-tr rounded-br ${
              activeTab === 1 ? "bg-gray-200" : "bg-white"
            }`}
            onClick={() => setActiveTab(1)}
          >
            Nutritional Information
          </button>
        </div>
        {activeTab === 0 ? (
          <div>
            <h2 className="text-2xl mb-4">Recipe {index}</h2>
            <img
              src={
                "https://www.averiecooks.com/wp-content/uploads/2021/01/garlicbutterchicken-5.jpg"
              } // Replace with the actual path to your image
              alt={`Recipe ${index}`}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <p>Popup content for Recipe {index}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">Nutritional Information</h2>
            <p>Nutritional information for Recipe {index}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Popup;
