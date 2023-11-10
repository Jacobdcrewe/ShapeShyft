import React from "react";

interface BodyPart {
  id: number;
  name: string;
}

const bodyParts: BodyPart[] = [
  { id: 1, name: "Arms" },
  { id: 2, name: "Abs" },
  { id: 3, name: "Legs" },
  { id: 4, name: "Chest" },
  { id: 5, name: "Back" },
  { id: 6, name: "Cardio" }
];

const HorizontalScrollbar: React.FC = () => {
  return (
    <div className="w-full h-full overflow-x-auto">
      <div className="flex space-x-5 py-5 px-4">
        {bodyParts.map((part) => (
          <div
            key={part.id}
            className="flex-none w-1/4 md:w-1/5 lg:w-1/4 rounded-xl p-4 bg-white overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.2)] m-1 hover:m-0 transition-all ease-in-out duration-150 brightness-[0.98] hover:brightness-100 cursor-pointer"
          >
            <p className="text-xl">{part.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollbar;
