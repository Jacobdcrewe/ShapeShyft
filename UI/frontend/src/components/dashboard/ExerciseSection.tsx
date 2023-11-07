import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import days from "../../composables/days.json";

export function ExerciseSection() {
  let today = new Date();
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    data.push({
      date: days[day.getDay()],
      hours: Math.round(Math.random() * 18),
    });
  }

  return (
    <div className="w-full">
      <p className="px-8 mb-3 text-3xl">Hours of Exercise in the Past Week</p>
      <ResponsiveContainer width="100%" height="100%" className="min-h-[270px]">
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="hours" stroke="rgb(109 40 217)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExerciseSection;
