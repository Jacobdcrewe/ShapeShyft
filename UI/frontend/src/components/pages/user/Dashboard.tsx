import React, { useContext, useState } from "react";
import { UserContext } from "../../ContentRouter";
import { GET } from "../../../composables/api";
import file from "../../../composables/urls.json";
import UserInfoSection from "../../dashboard/UserInfoSection";
import CalorySection from "../../dashboard/calory/CalorySection";
import ExerciseSection from "../../dashboard/ExerciseSection";
import HealthandWellnessSection from "../../dashboard/HealthandWellnessSection";

export function Dashboard() {
  const [exuser, setExUser] = useState(
    "(example of making api call) click me!"
  );

  const { login } = useContext(UserContext);
  const exampleFunction = async () => {
    const val = await GET(file.me, login);
    setExUser(JSON.stringify(val));
  };

  return (
    <div className="w-full h-full min-w-[330px] overscroll-x-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-xl p-4 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] md:col-span-2">
          <UserInfoSection />
        </div>
        <div className="rounded-xl col-span-1 md:col-span-2 p-4 bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2)] flex flex-col md:flex-row flex-wrap ">
          <CalorySection />
        </div>
        <div className="rounded-xl p-4 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] col-span-1 md:col-span-2 xl:col-span-1 min-h-[270px]">
          <ExerciseSection />
        </div>
        <div className="rounded-xl h-32 p-4 py-2 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] col-span-1 md:col-span-2 xl:col-span-1">
          <HealthandWellnessSection />
        </div>
        <div
          className="rounded-xl h-32 p-4 py-2 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] hover:cursor-pointer md:col-span-2"
          onClick={exampleFunction}
        >
          <p>{exuser}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
