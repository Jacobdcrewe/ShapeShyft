import React, { useState, useEffect } from "react";

import SearchWorkout from "../../Workout/SearchWorkout";
import Exercises from "../../Workout/Exercises";
import Welcome from "../../Workout/Welcome";
import DailyStepsModal from "../../Workout/DailyStepsModal";
import DailyStepsDisplay from "../../Workout/DailyStepsDisplay"; 
import WorkoutCounter from "../../Workout/WorkoutCounter";

const Exercise: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [steps, setSteps] = useState<number>(0); 

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const handleModalClose = (inputSteps: string) => {
    const numericSteps = parseInt(inputSteps, 10); 
    if (!isNaN(numericSteps)) {
      setModalOpen(false);
      setSteps(numericSteps);
    } else {
      console.error('Input steps is not a valid number');
    }
  };
  
  
  return (
    <div className="container mx-auto px-4">
      <Welcome />
      <div className="flex justify-between items-center space-x-4">
        <DailyStepsDisplay stepsTaken={steps} />
        <WorkoutCounter />
      </div>
      <SearchWorkout />
      <Exercises />
      <DailyStepsModal open={modalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default Exercise;