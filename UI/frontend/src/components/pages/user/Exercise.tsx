import React, { useState, useEffect } from "react";

import SearchWorkout from "../../Workout/SearchWorkout";
import Exercises from "../../Workout/Exercises";
import Welcome from "../../Workout/Welcome";
import DailyStepsModal from "../../Workout/DailyStepsModal";
import DailyStepsDisplay from "../../Workout/DailyStepsDisplay"; 
import WorkoutCounter from "../../Workout/WorkoutCounter";
import ExerciseContext from "../../Workout/ExerciseContext";
import { ExerciseCardProps } from "../../Workout/ExerciseCard";
import HorizontalScrollbar from "../../Workout/HorizontalScrollbar";
import SearchResults from "../../Workout/SearchResults";

interface ExerciseContextValue {
  exercises: ExerciseCardProps[];
  setExercises: React.Dispatch<React.SetStateAction<ExerciseCardProps[]>>;
  showResults: boolean;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const Exercise: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [steps, setSteps] = useState<number>(0);
  const [exercises, setExercises] = useState<ExerciseCardProps[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

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

  interface ExerciseContextValue {
    exercises: ExerciseCardProps[];
    setExercises: React.Dispatch<React.SetStateAction<ExerciseCardProps[]>>;
  }

  const initialExerciseContext: ExerciseContextValue = {
    exercises: [],
    setExercises: () => {},
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
      <ExerciseContext.Provider
        value={{ exercises, setExercises } as ExerciseContextValue || initialExerciseContext}
      >
      </ExerciseContext.Provider>
      {showResults && (
        <SearchResults exercises={exercises} />
      )}
    </div>
  );
};

export default Exercise;