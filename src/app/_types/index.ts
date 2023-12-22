export type ExerciseProps = {
  id: string;
  name: string;
  sets: number;
  primary_muscle: keyof MuscleGroups;
  primary_weighting: number;
  aux_muscle_1?: keyof MuscleGroups;
  aux_muscle_2?: keyof MuscleGroups;
  aux_muscle_3?: keyof MuscleGroups;
  aux_weighting_1?: number;
  aux_weighting_2?: number;
  aux_weighting_3?: number;
};

export interface RoutineProps {
  id: string;
  targetSets: number;
  lists: ExerciseList[];
}

export interface ExerciseList {
  id: string;
  exercises: ExerciseProps[];
}

export interface MuscleGroups {
  Neck: number;
  Traps: number;
  Shoulders: number;
  Chest: number;
  Biceps: number;
  Triceps: number;
  Forearms: number;
  Lats: number;
  Middle_Back: number;
  Lower_Back: number;
  Abs: number;
  Glutes: number;
  Quads: number;
  Hamstrings: number;
  Calves: number;
}

export interface MuscleGroup {
  id: keyof MuscleGroups;
  sets: number;
  reps: number;
}
