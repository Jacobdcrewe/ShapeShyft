import React, { useState } from "react";
import "../../assets/css/index.css";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchWorkout = () => {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (search) {
      // const exerciseData = await fetchData();
    }
  };

  return (
    <div className="flex flex-col items-center mt-9 p-5">
      <h1 className="text-center font-bold mb-12 text-5xl">
        Let's Workout!
      </h1>
      <div className="relative w-full lg:w-[1170px] xs:w-[350px] flex items-center">
        <input
          className="w-full py-3 px-5 bg-white border-none rounded-l-full font-bold focus:outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
          placeholder="Run, lift, yoga? Find it here..."
          type="text"
        />
        <button
          className="bg-gradient-to-t from-indigo-950 to-pink-950 overflow-hidden text-white uppercase lg:w-[173px] xs:w-[80px] py-3 px-5 h-auto lg:text-lg xs:text-sm rounded-r-full transition duration-300 ease-in-out hover:bg-opacity-80"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="relative w-full p-5"></div>
      <div className="relative w-full p-5">
        <HorizontalScrollbar />
      </div>
    </div>
  );
};

export default SearchWorkout;
