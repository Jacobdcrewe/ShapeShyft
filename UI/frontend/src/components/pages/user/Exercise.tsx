import React from "react";
import { Box } from "@mui/material";

import SearchWorkout from "../../Workout/SearchWorkout";
import Exercises from "../../Workout/Exercises";
import Welcome from "../../Workout/Welcome";

export function Exercise() {
  return (
    <Box>
      <Welcome />
      <SearchWorkout />
      <Exercises />
    </Box>
  );
}
export default Exercise;
