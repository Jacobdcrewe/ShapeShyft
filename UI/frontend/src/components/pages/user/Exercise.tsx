import React from "react";
import { Box } from "@mui/material";

import SearchWorkout from "../../Workout/SearchWorkout";
import Exercises from "../../Workout/Exercises";

export function Exercise() {
  return (
    <Box>
      <SearchWorkout />
      <Exercises />
    </Box>
  );
}
export default Exercise;
