import React from "react";
import { FoodItemProps } from "../pages/user/FoodAndCalories";

export const FoodItem = (props: FoodItemProps) => {
    return (
        <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md my-2">
            <div className="flex flex-col">
                <p className="text-lg font-semibold">{props.name}</p>
                <p className="text-sm text-gray-500">{props.unit}</p>
            </div>
            <div className="text-violet-800 font-bold">
                {props.calories} cal
            </div>
        </div>
    );
}
