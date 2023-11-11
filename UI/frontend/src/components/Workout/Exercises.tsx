import React, { useState, useRef, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../../assets/css/index.css";
import ExerciseCard from "./ExerciseCard";

const Exercises = () => {
  const [rowsOfExercises, setRowsOfExercises] = useState(2);
  const endOfListRef = useRef<HTMLDivElement>(null);

  const scrollToNewExercises = () => {
    if (endOfListRef.current) {
      endOfListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (rowsOfExercises > 2) { 
      scrollToNewExercises();
    }
  }, [rowsOfExercises]);

  const addRowOfExercises = () => {
    if (rowsOfExercises < 5) {
      setRowsOfExercises(rowsOfExercises + 1);
    }
  };

  const generateExerciseCards = () => {
    let allCards = [];
    for (let i = 0; i < rowsOfExercises * 3; i++) {
      allCards.push(
        <CSSTransition key={i} timeout={500} classNames="item">
          <ExerciseCard
          name={`Exercise ${i + 1}`} 
          difficulty="Intermediate" 
          muscles="Chest" 
          equipment="Dumbbells" 
        />
        </CSSTransition>
      );
    }
    
    allCards.push(
      <div key="endOfList" ref={endOfListRef} aria-hidden="true" />
    );
    return allCards;
  };

  return (
    <div className="mt-12 mb-8 px-16">
      <div className="text-4xl font-bold">
        Today's Top Workouts
      </div>
      <TransitionGroup className="flex flex-row flex-wrap justify-center gap-8 mt-12">
        {generateExerciseCards()}
      </TransitionGroup>
      {rowsOfExercises * 3 < 15 && (
        <div className="mt-8 flex justify-center">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={addRowOfExercises}
          >
            More
          </button>
        </div>
      )}
    </div>
  );
};

export default Exercises;