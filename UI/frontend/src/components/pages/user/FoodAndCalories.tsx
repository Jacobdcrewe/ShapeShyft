import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { FoodItem } from "../../food/FoodItem";
import { UserContext } from "../../ContentRouter";
import { GET, POST } from "../../../composables/api";
import urls from "../../../composables/urls.json";

export interface FoodItemProps {
  name: string;
  unit: string;
  calories: number;
  fat?: number;
  carbs?: number;
  protein?: number;
  number_of_units: number;
  link?: string;
}

export interface UserFoodItemProps extends FoodItemProps {
  mealType: string;
}

export function FoodAndCalories() {
  const { login } = useContext(UserContext);
  const [foodItems, setFoodItems] = useState<UserFoodItemProps[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItemProps[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [breakfast, lunch, dinner, snack] = await Promise.all([
        GET(`${urls.food}/BREAKFAST`, login),
        GET(`${urls.food}/LUNCH`, login),
        GET(`${urls.food}/DINNER`, login),
        GET(`${urls.food}/SNACK`, login),
      ]);
      const foodItems = [
        ...breakfast.map((f: FoodItemProps) => ({
          ...f,
          mealType: "BREAKFAST",
        })),
        ...lunch.map((f: FoodItemProps) => ({ ...f, mealType: "LUNCH" })),
        ...dinner.map((f: FoodItemProps) => ({ ...f, mealType: "DINNER" })),
        ...snack.map((f: FoodItemProps) => ({ ...f, mealType: "SNACK" })),
      ];
      setFoodItems(foodItems);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const fetchSearchResults = async (query: string) => {
    if (query.length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    const response = await GET(
      `${urls.food_search}?query=${encodeURIComponent(query)}`,
      login
    );
    setSearchResults(response.items);
    setShowDropdown(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setNewFoodItem({ ...newFoodItem, name: value });

    if (value) {
      fetchSearchResults(value);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelectFoodItem = (item: FoodItemProps) => {
    setNewFoodItem({ ...item, number_of_units: 1, mealType: "" });
    setSearchQuery(item.name);
    setShowDropdown(false);
  };

  const handleDeleteFoodItem = (itemName: string) => {
    setFoodItems(foodItems.filter((item) => item.name !== itemName));
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newFoodItem, setNewFoodItem] = useState<UserFoodItemProps>({
    name: "",
    number_of_units: 0,
    unit: "",
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    mealType: "",
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setNewFoodItem({
      name: "",
      number_of_units: 0,
      unit: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
      mealType: "",
    });
  };

  const handleAddFoodItem = async () => {
    const {
      name,
      unit,
      calories,
      fat,
      carbs,
      protein,
      number_of_units: number_of_units,
      mealType: type,
      link,
    } = newFoodItem;
    const body = {
      name,
      unit,
      calories,
      fat,
      carbs,
      protein,
      number_of_units,
      type,
      link,
    };
    await POST(`${urls.food}/`, body, login);
    setFoodItems([...foodItems, newFoodItem]);
    closeModal();
  };

  const calculateTotalCaloriesMealType = (mealType: string) => {
    return foodItems
      .filter((item) => item.mealType === mealType.toUpperCase())
      .reduce((total, item) => total + item.calories * item.number_of_units, 0);
  };

  const calculateTotalCalories = () => {
    return foodItems.reduce((total, item) => total + item.calories * item.number_of_units, 0);
  };
  

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-4xl mb-8">Your Calorie Intake for <span className="font-bold">{currentDate}</span>: <span className="font-bold">{calculateTotalCalories()}</span> kcal</h1>
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
          <h2 className="text-xl font-semibold mb-4 w-full">
            Add New Food Item
          </h2>
          <label className="block mb-2 w-full">Name:</label>
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleNameChange}
              className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
              placeholder="Search a Food..."
            />
            {showDropdown && (
              <ul className="absolute z-10 w-full border border-gray-200 bg-white max-h-60 overflow-auto">
                {searchResults.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectFoodItem(item)}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <label className="block mb-2 w-full">Amount:</label>
          <input
            type="number"
            value={newFoodItem.number_of_units}
            onChange={(e) =>
              setNewFoodItem({
                ...newFoodItem,
                number_of_units: parseFloat(e.target.value),
              })
            }
            className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
            placeholder="Enter an Amount..."
          />

          <label className="block mb-2 w-full">Unit:</label>
          <div className="mb-4 w-full font-bold text-l">{newFoodItem.unit}</div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 text-lg">Calories:</label>
              <div className="font-bold text-xl">{newFoodItem.calories}</div>
            </div>

            <div>
              <label className="block mb-2 text-lg">Fat:</label>
              <div className="font-bold text-xl">{newFoodItem.fat}</div>
            </div>

            <div>
              <label className="block mb-2 text-lg">Carbs:</label>
              <div className="font-bold text-xl">{newFoodItem.carbs}</div>
            </div>

            <div>
              <label className="block mb-2 text-lg">Protein:</label>
              <div className="font-bold text-xl">{newFoodItem.protein}</div>
            </div>
          </div>

          <label className="block mb-2 w-full">Meal Type:</label>
          <select
            value={newFoodItem.mealType}
            onChange={(e) =>
              setNewFoodItem({ ...newFoodItem, mealType: e.target.value })
            }
            className="border border-gray-300 px-2 py-1 rounded mb-4 w-full"
          >
            <option value="" disabled>
              Select a meal type
            </option>
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="SNACK">Snack</option>
          </select>

          <button
            className={`bg-violet-800 text-white px-4 py-2 rounded mt-4 ${
              newFoodItem.number_of_units <= 0 ||
              isNaN(newFoodItem.number_of_units) ||
              newFoodItem.name.trim() === "" ||
              newFoodItem.mealType === ""
                ? "disabled:opacity-50 bg-gray-400" // Additional styling for disabled state
                : ""
            }`}
            onClick={handleAddFoodItem}
            disabled={
              newFoodItem.number_of_units <= 0 ||
              isNaN(newFoodItem.number_of_units) ||
              newFoodItem.name.trim() === "" ||
              newFoodItem.mealType === ""
            }
          >
            Add Food Item
          </button>
        </div>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 ">
        {["Breakfast", "Lunch", "Dinner", "Snack"].map((mealType) => (
          <div
            className="rounded-xl h-96 px-4 py-2 bg-neutral-50 overflow-hidden shadow-[0px 0px 10px rgba(0,0,0,0.2)]"
            key={mealType}
          >
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-semibold">
                {mealType}
                {mealType === "Breakfast" && <span> 🥞</span>}
                {mealType === "Lunch" && <span> 🥙</span>}
                {mealType === "Dinner" && <span> 🍛</span>}
                {mealType === "Snack" && <span> 🍎</span>}
              </h1>
              <span className="text-2l font-bold">
                {calculateTotalCaloriesMealType(mealType)} cal
              </span>
            </div>
            <div className="overflow-y-auto h-72">
              {foodItems
                .filter((item) => item.mealType === mealType.toUpperCase())
                .map((item, index) => (
                  <FoodItem
                    key={index}
                    name={item.name}
                    number_of_units={item.number_of_units}
                    unit={item.unit}
                    calories={item.calories}
                    protein={item.protein}
                    carbs={item.carbs}
                    fat={item.fat}
                    mealType={item.mealType}
                    onDelete={() => handleDeleteFoodItem(item.name)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center p-10 ">
        <button
          className="shadow-[0px_0px_10px_rgba(0,0,0,0.4)] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.6)] whitespace-nowrap rounded-full text-white w-1/8 bg-violet-800 brightness-[0.95] hover:brightness-100 px-6 py-2 scale-100 hover:scale-[1.01] transition-transform ease-in-out duration-150"
          onClick={openModal}
        >
          Add Food Item
        </button>
      </div>
    </div>
  );
}

export default FoodAndCalories;
