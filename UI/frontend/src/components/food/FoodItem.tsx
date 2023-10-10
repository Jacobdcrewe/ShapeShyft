import { FoodItemProps } from "../pages/user/FoodAndCalories";
// food item component
export const FoodItem = (props: FoodItemProps) => {
    return (
        <div className="flex border-t border-b border-neutral-400 bg">
            <div className="flex flex-col">
                <p>{props.name}</p>
                <p>{props.amount} {props.unit}</p>
            </div>
            <div className="flex items-center ml-auto">
                {props.calories}
            </div>
        </div>
    );
}
