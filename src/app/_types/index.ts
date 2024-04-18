export type ExerciseProps = {
  id: string;
  name: string;
  sets: number;
  muscle_weightings: MuscleGroupWeighting[];
  plane_of_motion: keyof PlanesOfMotion;
};

type MuscleGroupWeighting = {
  muscle: keyof MuscleGroups;
  weighting: number;
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

export interface PlanesOfMotion {
  SagittalPush: number;
  SagittalPull: number;
  FrontalPush: number;
  FrontalPull: number;
  TransversePush: number;
  TransversePull: number;
}
