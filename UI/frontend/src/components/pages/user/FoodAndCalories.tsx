import React, { useState } from "react";
import Modal from 'react-modal';
import { FoodItem } from "../../food/FoodItem";

export interface FoodItemProps {
  name: string;
  amount: number;
  unit: string;
  calories: number;
  mealType: string;
}

export function FoodAndCalories() {
  const [foodItems, setFoodItems] = useState<FoodItemProps[]>([
    {
      name: "Mansaf",
      amount: 10,
      unit: "cups",
      calories: 2000,
      mealType: "Breakfast",
    },
    {
      name: "Cheese",
      amount: 10,
      unit: "grams",
      calories: 250,
      mealType: "Breakfast",
    },
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newFoodItem, setNewFoodItem] = useState<FoodItemProps>({
    name: "",
    amount: 0,
    unit: "",
    calories: 0,
    mealType: "",
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setNewFoodItem({
      name: "",
      amount: 0,
      unit: "",
      calories: 0,
      mealType: "",
    });
  };

  const handleAddFoodItem = () => {
    setFoodItems([...foodItems, newFoodItem]);
    closeModal();
  };

  const calculateTotalCalories = (mealType: string) => {
    return foodItems
      .filter(item => item.mealType === mealType)
      .reduce((total, item) => total + item.calories, 0);
  }

  return (
    <div className="w-full h-full">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={openModal}>
        Add Food Item
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Food Item Modal"
        className="bg-white w-3/4 md:w-1/2 lg:w-1/3 mx-auto mt-20 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        shouldCloseOnOverlayClick={true}
      >
        <div className="p-4 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 w-full">Add New Food Item</h2>
          <label className="block mb-2 w-full">Name (Should be able to search this from api):</label>
          <input
            type="text"
            value={newFoodItem.name}
            onChange={(e) => setNewFoodItem({ ...newFoodItem, name: e.target.value })}
            className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
          />
          <label className="block mb-2 w-full">Amount:</label>
          <input
            type="number"
            value={newFoodItem.amount}
            onChange={(e) => setNewFoodItem({ ...newFoodItem, amount: parseFloat(e.target.value) })}
            className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
          />

          <label className="block mb-2 w-full">Unit (WE NEED TO DISCUSS THIS):</label>
          <input
            type="text"
            value={newFoodItem.unit}
            onChange={(e) => setNewFoodItem({ ...newFoodItem, unit: e.target.value })}
            className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
          />

          <label className="block mb-2 w-full">Calories (THIS SHOULD BE CALCULATED):</label>
          <input
            type="number"
            value={newFoodItem.calories}
            onChange={(e) => setNewFoodItem({ ...newFoodItem, calories: parseFloat(e.target.value) })}
            className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
          />

          <label className="block mb-2 w-full">Meal Type:</label>
          <select
            value={newFoodItem.mealType}
            onChange={(e) => setNewFoodItem({ ...newFoodItem, mealType: e.target.value })}
            className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
          >
            <option value="" disabled>Select a meal type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
          </select>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleAddFoodItem}
          >
            Add Food Item
          </button>
        </div>
      </Modal>

      <div className="p-4">
        {["Breakfast", "Lunch", "Dinner", "Snacks"].map((mealType) => (
          <div className='p-4' key={mealType}>
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">{mealType}</h1>
              <span className="text-2l font-bold">{calculateTotalCalories(mealType)} cal</span>
            </div>
            {foodItems
              .filter((item) => item.mealType === mealType)
              .map((item, index) => (
                <FoodItem
                  key={index}
                  name={item.name}
                  amount={item.amount}
                  unit={item.unit}
                  calories={item.calories}
                  mealType={item.mealType}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodAndCalories;
