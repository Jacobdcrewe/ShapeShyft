import React, { useState } from "react";

export function HealthAndWellness() {
  // State for counters
  const [waterCount, setWaterCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);

  // State for user information
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  // Calculate BMI
  const calculateBMI = () => {
    if (weight <= 0 || height <= 0) {
      return "N/A";
    }
    const bmi = weight / (height * height * 0.0001); // Adjusting for pounds and inches
    return bmi.toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Health and Wellness</h1>

      {/* First Section - Counters */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Track Your Health</h2>
        <div className="flex items-center mb-2">
          <p className="w-1/4">Water (Glasses)</p>
          <button
            className={`${
              waterCount <= 0
                ? "bg-gray-400 text-gray-200"
                : "bg-blue-500 text-white"
            } px-2 py-1 rounded-full mr-2`}
            onClick={() => setWaterCount(waterCount - 1)}
            disabled={waterCount <= 0}
          >
            -
          </button>
          <span className="w-1/4 text-center">{waterCount}</span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-full ml-2"
            onClick={() => setWaterCount(waterCount + 1)}
          >
            +
          </button>
        </div>

        <div className="flex items-center mb-2">
          <p className="w-1/4">Excersize (hrs)</p>
          <button
            className={`${
              exerciseCount <= 0
                ? "bg-gray-400 text-gray-200"
                : "bg-blue-500 text-white"
            } px-2 py-1 rounded-full mr-2`}
            onClick={() => setExerciseCount(exerciseCount - 0.25)}
            disabled={exerciseCount <= 0}
          >
            -
          </button>
          <span className="w-1/4 text-center">{exerciseCount}</span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-full ml-2"
            onClick={() => setExerciseCount(exerciseCount + 0.25)}
          >
            +
          </button>
        </div>

        <div className="flex items-center mb-2">
          <p className="w-1/4">Food (Calories)</p>
          <button
            className={`${
              foodCount <= 0
                ? "bg-gray-400 text-gray-200"
                : "bg-blue-500 text-white"
            } px-2 py-1 rounded-full mr-2`}
            onClick={() => setFoodCount(foodCount - 1)}
            disabled={foodCount <= 0}
          >
            -
          </button>
          <span className="w-1/4 text-center">{foodCount}</span>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-full ml-2"
            onClick={() => setFoodCount(foodCount + 1)}
          >
            +
          </button>
        </div>
      </section>

      {/* Second Section - User Information */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">User Information</h2>
        <div className="mb-4">
          <p className="w-1/4">Weight (Kg)</p>
          <input
            min="0"
            type="number"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
            className="w-1/4 border border-gray-300 rounded p-2"
          />
        </div>
        <div className="mb-4">
          <p className="w-1/4">Height (cm)</p>
          <input
            min="0"
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="w-1/4 border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <p className="w-1/4">BMI</p>
          <span className="w-1/4 border border-gray-300 rounded p-2">
            {calculateBMI()}
          </span>
        </div>
      </section>
    </div>
  );
}

export default HealthAndWellness;
