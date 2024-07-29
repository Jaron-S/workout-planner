"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { RoutineProps } from "../_types";
import { initialRoutine } from "../_data/initialData";
import { Dispatch, SetStateAction } from "react";

interface ContextProps {
  routine: RoutineProps;
  setRoutine: Dispatch<SetStateAction<RoutineProps | undefined>>;
  routineIds: string[];
  setRoutineIds: Dispatch<SetStateAction<string[] | undefined>>;
  exerciseIds: string[];
  setExerciseIds: Dispatch<SetStateAction<string[] | undefined>>;
  resetData: () => void;
}

const GlobalContext = createContext<ContextProps>({
  routine: {
    id: "",
    targetSets: 4,
    lists: [],
  },
  setRoutine: () => {},
  routineIds: [],
  setRoutineIds: () => {},
  exerciseIds: [],
  setExerciseIds: () => {},
  resetData: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [routine, setRoutine] = useState(() => {
    const savedRoutine = localStorage.getItem("routine");
    try {
      if (savedRoutine) return JSON.parse(savedRoutine);
    } catch (error) {
      return undefined;
    }
  });
  const [routineIds, setRoutineIds] = useState<string[]>();
  const [exerciseIds, setExerciseIds] = useState<string[]>();

  const resetState = () => {
    setRoutine(initialRoutine);
    setRoutineIds([]);
    setExerciseIds([]);
  };

  // Persist routine state to local storage
  useEffect(() => {
    localStorage.setItem("routine", JSON.stringify(routine));
  }, [routine]);

  return (
    <GlobalContext.Provider
      value={{
        routine: routine || initialRoutine,
        setRoutine,
        routineIds: routineIds || [],
        setRoutineIds,
        exerciseIds: exerciseIds || [],
        setExerciseIds,
        resetData: resetState,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
