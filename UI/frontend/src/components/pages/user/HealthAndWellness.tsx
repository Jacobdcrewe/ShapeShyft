import React, { useContext, useState, useEffect } from "react";
import { POST } from "../../../composables/api";
import { GET } from "../../../composables/api";
import { UserContext } from "../../ContentRouter";
import file from "../../../composables/urls.json";
import "./HealthAndWellness.css";

export function HealthAndWellness() {
  // For the API
  const [user, setUser] = useState("(example of making api call) click me!");
  const { login } = useContext(UserContext);

  // State for counters
  const [waterCount, setWaterCount] = useState(0); // Allow both number and null

  // State for Sleep Start and End
  const [sleepStart, setSleepStart] = useState("");
  const [sleepEnd, setSleepEnd] = useState("");
  const [sleepDuration, setSleepDuration] = useState("");

  // State for user information

  const [weight, setWeight] = useState(0); // Initialize weight
  const [height, setHeight] = useState(0); // Initialize height

  const handleWeightChange = async (newWeight: number) => {
    setWeight(newWeight);
    await sendBmiDataToBackend(newWeight, height);
  };

  const handleHeightChange = async (newHeight: number) => {
    setHeight(newHeight);
    await sendBmiDataToBackend(weight, newHeight);
  };

  // Function to send BMI data to backend
  const sendBmiDataToBackend = async (weight: number, height: number) => {
    try {
      // Replace with your actual API call
      const response = await POST(file.POST_bmi, { weight, height }, login);
      setBmiResponse(
        `Weight: ${weight} kg, Height: ${height} cm, BMI: ${response.bmi}`
      );
    } catch (error) {
      console.error("Error sending BMI data:", error);
      setBmiResponse("Failed to fetch BMI data.");
    }
  };

  // State to store the backend response
  const [bmiResponse, setBmiResponse] = useState("");

  // Calculate BMI
  const calculateBMI = () => {
    if (weight <= 0 || height <= 0) {
      return "N/A";
    }
    const bmi = weight / (height * height * 0.0001); // Adjusting for pounds and inches
    return bmi.toFixed(2);
  };

  // Reminder logic for water consumption
  const checkWaterIntake = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 8 && currentHour <= 23) {
      const hoursPassed = currentHour - 8;
      const glassesShouldHaveDrunk = Math.floor(hoursPassed / 3);
      if (waterCount < glassesShouldHaveDrunk) {
        alert("Remember to drink more water!");
      }
    }
  };

  // Placeholder for personalized health tips fetched from the backend
  const [personalizedHealthTips, setPersonalizedHealthTips] = useState("");

  interface WaterTrackerMessageProps {
    waterCount: number;
  }

  <br></br>;
  function WaterTrackerMessage({ waterCount }: WaterTrackerMessageProps) {
    let message = "";

    switch (waterCount) {
      case 0:
        message = "Let's start the day by drinking some water";
        break;
      case 1:
        message = "Keep going! You're on track";
        break;
      case 2:
        message = "Nice! Staying healthy";
        break;
      case 3:
        message = "Great! Let's get hydrated";
        break;
      case 4:
        message = "Awesome! Halfway to go for the day";
        break;
      case 5:
        message = "Whoohoo!";
        break;
      case 6:
        message = "Let's gooo";
        break;
      case 7:
        message = "One more to go! Couldn't be more proud";
        break;
      case 8:
        message =
          "Perfect, you made it! Congrats for keeping healthy and hydrated";
        break;
      default:
        if (waterCount > 8) {
          message = "Oh, okay dear I think you already made it :)";
        }
        break;
    }

    return <p>{message}</p>;
  }

  useEffect(() => {
    // Fetch water count from the backend when the component is mounted
    GetWaterCount();

    // Check every hour
    const interval = setInterval(() => {
      checkWaterIntake();
    }, 3600000); // Check every hour (3600000 milliseconds)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [waterCount]);

  useEffect(() => {
    const duration = calculateSleepDuration();
    setSleepDuration(duration);
  }, [sleepStart, sleepEnd]);

  const GetWaterCount = async () => {
    try {
      const val = await GET(file.get_water, login);
      const today = new Date().toISOString().split("T")[0];
      const water = val.find((item: any) => {
        return new Date(item.date).toISOString().split("T")[0] === today;
      });
      if (water && water.amt !== undefined) {
        setWaterCount(water.amt);
      } else {
        setWaterCount(0); // Fallback to 0 if response does not have waterCount
      }
    } catch (e) {
      console.error("Error: fetching water count from backend failed.", e);
      setWaterCount(0);
    }
  };

  // Fetching data from the backend
  useEffect(() => {
    // replace with your actual backend request
    const fetchPersonalizedHealthTips = async () => {
      try {
        // Simulated fetch request
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                data: "Your personalized health and fitness tips will appear here.",
              }),
            1000
          )
        );
        setPersonalizedHealthTips(file.me);
      } catch (error) {
        console.error("Error fetching personalized health tips: ", error);
      }
    };

    fetchPersonalizedHealthTips();
  }, []);

  const PostWaterCount = async (updatedCount: any) => {
    try {
      const val = await POST(file.POST_water, { amt: updatedCount }, login);
      if (val.success) {
        // Successful POST is printed on console
        console.log(val);
      }
    } catch (e) {
      console.error("Error: connection to the backend has failed.", e);
    }
  };

  const handleWaterCountChange = (delta: any) => {
    const updatedCount = waterCount + delta;
    console.log(updatedCount);
    setWaterCount(updatedCount);
    PostWaterCount(updatedCount); // Send the updated count to the backend
  };

  const displayExampleAlert = () => {
    alert(
      "This is an example of the alert you get when you don't drink enough water during the day"
    );
  };
  const postSleepData = async () => {
    const start = new Date(`01/01/2000 ${sleepStart}`);
    const end = new Date(`01/01/2000 ${sleepEnd}`);
    console.log(start, end);
    const sleepData = {
      s_time: sleepStart,
      e_time: sleepEnd,
    };

    try {
      const val = await POST(file.POST_sleep, sleepData, login);
      if (val.success) {
        console.log("Sleep data posted successfully:", val);
      }
    } catch (e) {
      console.error("Error posting sleep data:", e);
    }
  };

  const calculateSleepDuration = () => {
    if (sleepStart && sleepEnd) {
      const startTime: Date = new Date(`01/01/2000 ${sleepStart}`);
      const endTime: Date = new Date(`01/01/2000 ${sleepEnd}`);

      // Check if the dates are valid
      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        return ""; // Return empty string or handle invalid date
      }

      if (endTime < startTime) {
        // Assumes sleep went overnight to the next day
        endTime.setDate(endTime.getDate() + 1);
      }

      const duration = endTime.getTime() - startTime.getTime();
      const hours = Math.floor(duration / 3600000); // convert milliseconds to hours
      const minutes = Math.floor((duration % 3600000) / 60000); // remaining milliseconds to minutes

      return `${hours} hours and ${minutes} minutes`;
    }
    return "";
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h1 className="text-4xl font-semibold mb-6 text-black-700">
        Health and Wellness
      </h1>

      <div className="bg-white p-6 rounded-md shadow-md">
        {/* First Section - Counters */}
        <section className="mb-8 border-b pb-6">
          <h2 className="text-4xl font-semibold mb-4 text-blue-600">
            Track Your Health
          </h2>
          <h3 className="text-2xl font-semibold mb-4 text-blue-600">
            Water Tracker{" "}
          </h3>
          <div className="flex items-center mb-4 space-x-4">
            <p className="w-1/4 text-lg">Water (Glasses)</p>
            <button
              className={`${
                waterCount <= 0
                  ? "bg-gray-400 text-gray-200"
                  : "bg-blue-500 text-white"
              } px-3 py-2 rounded-full`}
              onClick={() => handleWaterCountChange(-1)}
              disabled={waterCount <= 0}
            >
              -
            </button>
            <span className="w-1/4 text-center text-xl">{waterCount}</span>
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-full"
              onClick={() => handleWaterCountChange(1)}
            >
              +
            </button>
          </div>
          <WaterTrackerMessage waterCount={waterCount} />

          {/* Example Alert Button */}
          <button
            onClick={displayExampleAlert}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Show Example Alert
          </button>
        </section>

        <section className="mb-8 border-b pb-6">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              Sleep Tracker{" "}
            </h3>
            <p className="w-1/4">Sleep Start Time</p>
            <input
              type="time"
              value={sleepStart}
              onChange={(e) => setSleepStart(e.target.value)}
              className="w-1/4 border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-4">
            <p className="w-1/4">Sleep End Time</p>
            <input
              type="time"
              value={sleepEnd}
              onChange={(e) => setSleepEnd(e.target.value)}
              className="w-1/4 border border-gray-300 rounded p-2"
            />
          </div>
          <button
            onClick={postSleepData}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Submit Sleep Data
          </button>
        </section>

        {/* Second Section - User Information */}
        <section className="mt-8">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">
            User Information
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-lg">Weight (Kg)</p>
              <input
                min="0"
                type="number"
                value={weight}
                onChange={(e) => handleWeightChange(Number(e.target.value))}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <p className="text-lg">Height (cm)</p>
              <input
                min="0"
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-lg">BMI</p>
            <span className="w-1/4 p-2 border border-gray-300 rounded">
              {calculateBMI()}
            </span>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            BMI Response from Backend
          </h2>
          <div>
            <p className="text-lg">{bmiResponse}</p>
          </div>
        </section>

        <section className="mt-8">
          {/* BMI Calculator */}
          <div>
            <p className="text-lg">BMI Chart</p>
            <img
              src="https://www.pnbmetlife.com/content/dam/pnb-metlife/images/icons/bmi-calculator/meter.png"
              alt="BMI chart"
              className="mt-4 rounded-md shadow"
            />
          </div>
        </section>
      </div>
      <div>
        {/* New Section for Personalized Health & Fitness Tips */}
        <section className="my-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Personalized Health & Fitness Tips
          </h2>
          <div className="space-y-4">
            {personalizedHealthTips ? (
              <p className="text-gray-700">{personalizedHealthTips}</p>
            ) : (
              <p className="text-gray-500">Loading your personalized tips...</p>
            )}
            {/* More space for additional info */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HealthAndWellness;
