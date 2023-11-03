import React from "react";
import CaloryItem from "./CaloryItem";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { FireIcon, HeartIcon } from "@heroicons/react/24/solid";
export function CalorySection() {
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

  return (
    <>
      <div className="w-full aspect-[3/2] lg:w-2/3 xl:w-1/4 xl:aspect-square flex items-center justify-center mr-10">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="min-h-[270px]"
        >
          <PieChart width={380} height={380}>
            <Pie
              data={data}
              innerRadius="60%"
              outerRadius="90%"
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
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="gap-4 flex flex-col justify-center">
        {caloryItems.map((val: any) => {
          return (
            <div key={val.text} className="hover:animate-pulse">
              <CaloryItem icon={val.icon} text={val.text} value={val.value} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CalorySection;
