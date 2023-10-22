import React, { useContext, useState } from "react";
import { UserContext } from "../../ContentRouter";
import { GET } from "../../../composables/api";
import file from "../../../composables/urls.json";

export function Dashboard() {
  const [user, setUser] = useState("(example of making api call) click me!");
  const { login } = useContext(UserContext);

  const exampleFunction = async () => {
    const val = await GET(file.me, login);
    setUser(JSON.stringify(val));
  };
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
        <div
          className="rounded-xl h-32 px-4 py-2 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] hover:cursor-pointer md:col-span-2"
          onClick={exampleFunction}
        >
          <p>{user}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
