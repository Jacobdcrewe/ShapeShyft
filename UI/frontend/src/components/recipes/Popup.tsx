import React from "react";

interface PopupProps {
  onClose: () => void; // Function that takes no parameters and returns void
  index: number | null; // Number type or null for index
}

export function Popup({ onClose, index }: PopupProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center relative">
        <span
          className="absolute top-2 right-2 cursor-pointer text-2xl"
          onClick={onClose}
        >
          &times;
        </span>
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
    </div>
  );
}

export default Popup;
