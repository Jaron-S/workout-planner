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
          id: "1800f92e-bac9-4098-bbfe-a5d48ec28315",
          name: "Squats",
          sets: 4,
          muscle_weightings: [
            { muscle: "Quads", weighting: 1 },
            { muscle: "Glutes", weighting: 0.7 },
            { muscle: "Hamstrings", weighting: 0.5 },
            { muscle: "Lower_Back", weighting: 0.3 },
          ],
          plane_of_motion: "SagittalPush",
        },
        {
          id: "4a72fb63-8361-480f-8a2b-7bdc78e49826",
          name: "Bent-over Rows",
          sets: 4,
          muscle_weightings: [
            { muscle: "Middle_Back", weighting: 1 },
            { muscle: "Lats", weighting: 0.3 },
            { muscle: "Biceps", weighting: 0.2 },
            { muscle: "Traps", weighting: 0.1 },
          ],
          plane_of_motion: "SagittalPull",
        },
        {
          id: "eccc056c-d78a-4fce-90f3-b2fa8c0411fc",
          name: "Romanian Deadlifts",
          sets: 4,
          muscle_weightings: [
            { muscle: "Hamstrings", weighting: 1 },
            { muscle: "Lower_Back", weighting: 0.6 },
            { muscle: "Glutes", weighting: 0.4 },
          ],
          plane_of_motion: "SagittalPull",
        },
        {
          id: "c6e82aa3-a1e2-407c-b6a0-b682a295859f",
          name: "Pull-Ups",
          sets: 4,
          muscle_weightings: [
            { muscle: "Lats", weighting: 1 },
            { muscle: "Biceps", weighting: 0.3 },
            { muscle: "Middle_Back", weighting: 0.2 },
            { muscle: "Traps", weighting: 0.1 },
          ],
          plane_of_motion: "FrontalPull",
        },
      ],
    },
    {
      id: "Day 2",
      exercises: [
        {
          id: "5d0eaca4-2fbe-407e-a188-7d3f8f5340c0",
          name: "Bench Press",
          sets: 4,
          muscle_weightings: [
            { muscle: "Chest", weighting: 1 },
            { muscle: "Triceps", weighting: 0.3 },
            { muscle: "Shoulders", weighting: 0.2 },
          ],
          plane_of_motion: "SagittalPush",
        },
        {
          id: "3309e9e4-3741-4d76-922c-2e1d2b3872a3",
          name: "Shoulder Press",
          sets: 4,
          muscle_weightings: [
            { muscle: "Shoulders", weighting: 1 },
            { muscle: "Traps", weighting: 0.2 },
            { muscle: "Triceps", weighting: 0.1 },
          ],
          plane_of_motion: "SagittalPush",
        },
        {
          id: "cec4216b-7286-4e1a-bf05-a6601eef1edf",
          name: "Incline Bench Press",
          sets: 4,
          muscle_weightings: [
            { muscle: "Chest", weighting: 1 },
            { muscle: "Shoulders", weighting: 0.4 },
            { muscle: "Triceps", weighting: 0.3 },
          ],
          plane_of_motion: "SagittalPush",
        },
        {
          id: "1db8f536-ceac-4ebd-be9d-d7b33a79bf55",
          name: "Pull-Ups",
          sets: 4,
          muscle_weightings: [
            { muscle: "Lats", weighting: 1 },
            { muscle: "Biceps", weighting: 0.3 },
            { muscle: "Middle_Back", weighting: 0.2 },
            { muscle: "Traps", weighting: 0.1 },
          ],
          plane_of_motion: "FrontalPull",
        },
      ],
    },
    {
      id: "Day 3",
      exercises: [
        {
          id: "24ba31a3-9ce4-4725-ac47-fef816a1456c",
          name: "Bench Press",
          sets: 4,
          muscle_weightings: [
            { muscle: "Chest", weighting: 1 },
            { muscle: "Triceps", weighting: 0.3 },
            { muscle: "Shoulders", weighting: 0.2 },
          ],
          plane_of_motion: "SagittalPush",
        },
        {
          id: "bd820ebb-beb0-46bb-985d-639b09d9fbf0",
          name: "Deadlifts",
          sets: 4,
          muscle_weightings: [
            { muscle: "Lower_Back", weighting: 1 },
            { muscle: "Glutes", weighting: 0.7 },
            { muscle: "Hamstrings", weighting: 0.5 },
            { muscle: "Traps", weighting: 0.3 },
          ],
          plane_of_motion: "SagittalPull",
        },
        {
          id: "12efafea-2d7e-4253-b2ce-a624f9df98b4",
          name: "Squats",
          sets: 4,
          muscle_weightings: [
            { muscle: "Quads", weighting: 1 },
            { muscle: "Glutes", weighting: 0.7 },
            { muscle: "Hamstrings", weighting: 0.5 },
            { muscle: "Lower_Back", weighting: 0.3 },
          ],
          plane_of_motion: "SagittalPush",
        },
        {
          id: "289340ed-6cfe-4aeb-8079-bfef32f3150e",
          name: "Dumbbell Rows",
          sets: 4,
          muscle_weightings: [
            { muscle: "Lats", weighting: 1 },
            { muscle: "Middle_Back", weighting: 0.7 },
            { muscle: "Biceps", weighting: 0.5 },
            { muscle: "Traps", weighting: 0.4 },
          ],
          plane_of_motion: "SagittalPull",
        },
      ],
    },
  ],
};
