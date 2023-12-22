import { RoutineProps } from "../_types";

export const initialRoutine: RoutineProps = {
  id: "",
  targetSets: 4,
  lists: [
    {
      id: "Search",
      exercises: [],
    },
    {
      id: "Day 1",
      exercises: [
        {
          aux_muscle_1: "Glutes",
          aux_muscle_2: "Hamstrings",
          aux_muscle_3: "Lower_Back",
          aux_weighting_1: 0.7,
          aux_weighting_2: 0.5,
          aux_weighting_3: 0.3,
          id: "1800f92e-bac9-4098-bbfe-a5d48ec28315",
          name: "Squats",
          primary_muscle: "Quads",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Lats",
          aux_muscle_2: "Biceps",
          aux_muscle_3: "Traps",
          aux_weighting_1: 0.3,
          aux_weighting_2: 0.2,
          aux_weighting_3: 0.1,
          id: "4a72fb63-8361-480f-8a2b-7bdc78e49826",
          name: "Bent-over Rows",
          primary_muscle: "Middle_Back",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Lower_Back",
          aux_muscle_2: "Glutes",
          aux_weighting_1: 0.6,
          aux_weighting_2: 0.4,
          id: "eccc056c-d78a-4fce-90f3-b2fa8c0411fc",
          name: "Romanian Deadlifts",
          primary_muscle: "Hamstrings",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Biceps",
          aux_muscle_2: "Middle_Back",
          aux_muscle_3: "Traps",
          aux_weighting_1: 0.3,
          aux_weighting_2: 0.2,
          aux_weighting_3: 0.1,
          id: "c6e82aa3-a1e2-407c-b6a0-b682a295859f",
          name: "Pull-Ups",
          primary_muscle: "Lats",
          primary_weighting: 1,
          sets: 4,
        },
      ],
    },
    {
      id: "Day 2",
      exercises: [
        {
          aux_muscle_1: "Triceps",
          aux_muscle_2: "Shoulders",
          aux_weighting_1: 0.3,
          aux_weighting_2: 0.2,
          id: "5d0eaca4-2fbe-407e-a188-7d3f8f5340c0",
          name: "Bench Press",
          primary_muscle: "Chest",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Traps",
          aux_muscle_2: "Triceps",
          aux_weighting_1: 0.2,
          aux_weighting_2: 0.1,
          id: "3309e9e4-3741-4d76-922c-2e1d2b3872a3",
          name: "Shoulder Press",
          primary_muscle: "Shoulders",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Shoulders",
          aux_muscle_2: "Triceps",
          aux_weighting_1: 0.4,
          aux_weighting_2: 0.3,
          id: "cec4216b-7286-4e1a-bf05-a6601eef1edf",
          name: "Incline Bench Press",
          primary_muscle: "Chest",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Biceps",
          aux_muscle_2: "Middle_Back",
          aux_muscle_3: "Traps",
          aux_weighting_1: 0.3,
          aux_weighting_2: 0.2,
          aux_weighting_3: 0.1,
          id: "1db8f536-ceac-4ebd-be9d-d7b33a79bf55",
          name: "Pull-Ups",
          primary_muscle: "Lats",
          primary_weighting: 1,
          sets: 4,
        },
      ],
    },
    {
      id: "Day 3",
      exercises: [
        {
          aux_muscle_1: "Triceps",
          aux_muscle_2: "Shoulders",
          aux_weighting_1: 0.3,
          aux_weighting_2: 0.2,
          id: "24ba31a3-9ce4-4725-ac47-fef816a1456c",
          name: "Bench Press",
          primary_muscle: "Chest",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Glutes",
          aux_muscle_2: "Hamstrings",
          aux_muscle_3: "Traps",
          aux_weighting_1: 0.7,
          aux_weighting_2: 0.5,
          aux_weighting_3: 0.3,
          id: "bd820ebb-beb0-46bb-985d-639b09d9fbf0",
          name: "Deadlifts",
          primary_muscle: "Lower_Back",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Glutes",
          aux_muscle_2: "Hamstrings",
          aux_muscle_3: "Lower_Back",
          aux_weighting_1: 0.7,
          aux_weighting_2: 0.5,
          aux_weighting_3: 0.3,
          id: "12efafea-2d7e-4253-b2ce-a624f9df98b4",
          name: "Squats",
          primary_muscle: "Quads",
          primary_weighting: 1,
          sets: 4,
        },
        {
          aux_muscle_1: "Middle_Back",
          aux_muscle_2: "Biceps",
          aux_muscle_3: "Traps",
          aux_weighting_1: 0.7,
          aux_weighting_2: 0.5,
          aux_weighting_3: 0.4,
          id: "289340ed-6cfe-4aeb-8079-bfef32f3150e",
          name: "Dumbbell Rows",
          primary_muscle: "Lats",
          primary_weighting: 1,
          sets: 4,
        },
      ],
    },
  ],
};
