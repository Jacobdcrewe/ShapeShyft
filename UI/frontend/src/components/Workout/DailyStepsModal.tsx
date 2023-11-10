import React, { useState } from "react";

interface DailyStepsModalProps {
  open: boolean;
  onClose: (steps: string) => void;
}

const DailyStepsModal: React.FC<DailyStepsModalProps> = ({ open, onClose }) => {
  const [steps, setSteps] = useState<string>('');

  const handleClose = () => {
    onClose(steps); 
  };

  const handleStepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(event.target.value);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-4 rounded-md w-full max-w-lg mx-auto">
        <div className="flex justify-between items-center">
          <h2 id="daily-steps-modal-title" className="text-xl font-semibold">
            Did you walk today?
          </h2>
          <button 
            onClick={() => onClose('')}
            className="text-black font-semibold leading-none hover:text-gray-600 focus:outline-none"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <input
          autoFocus
          className="border-2 border-gray-300 p-2 rounded-md w-full mt-4"
          id="steps"
          placeholder="Number of steps"
          type="number"
          value={steps}
          onChange={handleStepsChange}
        />
        <div className="mt-4 flex justify-end">
          <button 
            className="bg-gradient-to-t from-indigo-950 to-pink-950 overflow-hidden text-white font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={handleClose}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default DailyStepsModal;
