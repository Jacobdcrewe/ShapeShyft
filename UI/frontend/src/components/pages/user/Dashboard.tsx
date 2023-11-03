import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../ContentRouter";
import { GET } from "../../../composables/api";
import file from "../../../composables/urls.json";
import { FireIcon, HeartIcon } from "@heroicons/react/24/solid";
import CaloryItem from "../../dashboard/CaloryItem";
import Box from "@mui/material/Box";
import { Cell, Pie, PieChart } from "recharts";
import Loading from "../../common/Loading";
import {
  EnvelopeIcon,
  FingerPrintIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export function Dashboard() {
  const [exuser, setExUser] = useState(
    "(example of making api call) click me!"
  );
  const [user, setUser] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const { login } = useContext(UserContext);
  const exampleFunction = async () => {
    const val = await GET(file.me, login);
    setExUser(JSON.stringify(val));
  };

  useEffect(() => {
    const fetchData = async () => {
      const val = await GET(file.me, login);
      setUser(val);
    };
    fetchData();
    setLoading(false);
  }, [login]);

  let caloryItem = {
    caloryIntake: 3240,
    caloryBurn: 500,
  };

  let caloryItems = [
    {
      icon: <FireIcon className="w-full h-full text-violet-700" />,
      text: "Calories Burned",
      value: caloryItem.caloryBurn,
    },
    {
      icon: <HeartIcon className="w-full h-full text-rose-700" />,
      text: "Calories Consumed",
      value: caloryItem.caloryIntake,
    },
  ];

  const data = [
    {
      name: "Calories Burned",
      value: caloryItem.caloryBurn,
    },
    {
      name: "Calories Consumed",
      value: caloryItem.caloryIntake,
    },
  ];
  const COLORS = ["rgb(109 40 217)", "rgb(190 18 60)"];
  //https://recharts.org/en-US/examples/CustomActiveShapePieChart

  return (
    <div className="w-full h-full min-w-[330px] overscroll-x-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-xl p-4 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] md:col-span-2">
          {loading ? (
            <div className="flex w-full h-full items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row flex-wrap h-full gap-y-2 gap-x-8 text-lg sm:text-3xl">
              <div className="flex items-center">
                <FingerPrintIcon className="aspect-square h-6 w-6 mr-3 flex-none text-violet-700" />
                <p>
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div className="flex items-center">
                <UserIcon className="aspect-square h-6 w-6 mr-3 flex-none text-violet-700" />
                <p>{user.phone_number}</p>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="aspect-square flex-none h-6 w-6 mr-3 mt-2 text-violet-700" />
                <p>{user.email}</p>
              </div>
            </div>
          )}
        </div>
        <div className="rounded-xl col-span-1 md:col-span-2 p-4 bg-white shadow-[0px_0px_10px_rgba(0,0,0,0.2)] flex flex-col md:flex-row flex-wrap ">
          <div className="w-full md:w-auto flex items-center justify-center mr-10">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <PieChart width={380} height={380}>
                <Pie
                  data={data}
                  innerRadius={100}
                  outerRadius={140}
                  cornerRadius={15}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      className="hover:animate-pulse"
                      style={{ outline: "none" }}
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </Box>
          </div>

          <div className="gap-4 flex flex-col justify-center">
            {caloryItems.map((val: any) => {
              return (
                <div key={val.text} className="hover:animate-pulse">
                  <CaloryItem
                    icon={val.icon}
                    text={val.text}
                    value={val.value}
                  />
                </div>
              );
            })}
          </div>
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
          <p>{exuser}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
