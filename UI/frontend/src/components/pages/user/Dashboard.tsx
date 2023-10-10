import React from "react";

export function Dashboard() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-xl md:col-span-2 h-40 px-4 py-2 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] ">
          <p className="text-3xl">Calories</p>
        </div>
        <div className="rounded-xl h-32 px-4 py-2 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] ">
          <p className="text-3xl">Exercise</p>
        </div>
        <div className="rounded-xl h-32 px-4 py-2 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] ">
          <p className="text-3xl">Sleep/Water?</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
