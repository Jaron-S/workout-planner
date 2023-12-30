"use client";

import { useEffect } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { ExerciseList, RoutineProps } from "@/app/_types";
import { useGlobalContext } from "@/app/_providers/GlobalContext";
import exercisesData from "../../../../public/exercises.json";
import Summary from "./Summary";
import Week from "./Week";
import SearchPool from "./SearchPool";
import RoutineSettingsButton from "./RoutineSettingsButton";

const Dashboard = () => {
  const { routine, setRoutine, exerciseIds, setExerciseIds } =
    useGlobalContext();

  // load initial data
  useEffect(() => {
    if (!exerciseIds[0])
      setExerciseIds(exercisesData.map((exercise) => exercise.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const sourceList = routine.lists.find(
      (list: { id: string }) => list.id === source.droppableId
    ) as ExerciseList;
    const destList = routine.lists.find(
      (list: { id: string }) => list.id === destination.droppableId
    ) as ExerciseList;
    const sourceListIndex =
      sourceList.id === "Search" ? 0 : Number(sourceList.id[-1]);
    const destListIndex =
      destList.id === "Search" ? 0 : Number(sourceList.id[-1]);

    // Remove from source list and insert into destination list
    const [movedExercise] = sourceList.exercises.splice(source.index, 1);
    destList.exercises.splice(destination.index, 0, movedExercise);

    // Create a new state object for the routine
    const newState = JSON.parse(JSON.stringify(routine));
    newState.lists[sourceListIndex] = sourceList;
    newState.lists[destListIndex] = destList;
    setRoutine(newState);
  };

  return (
    <div className="h-full w-full flex flex-col sm:grid grid-cols-8 grid-rows-12 gap-4 items-center justify-center p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* Title & Summary*/}
        <div className="h-full w-full flex flex-col col-start-1 row-start-1 col-span-8 sm:col-start-5 sm:col-span-4 md:col-start-6 md:col-span-4 xl:col-start-7">
          <div className="flex justify-between items-center w-full mb-2 pl-1">
            <h1 className="font-bold text-xl break-words">
              {routine.id
                ? routine.id
                    .split("_")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")
                : "New Routine"}
            </h1>
            <RoutineSettingsButton />
          </div>
          <Summary />
        </div>
        <SearchPool
          className="row-start-2 col-start-1 col-span-8 sm:row-start-2 sm:col-start-5 sm:col-span-4 md:col-start-6 md:col-span-4 xl:row-start-9 xl:col-start-7"
          exercises={routine.lists[0].exercises}
        />
        <Week className="row-start-3 col-start-1 col-span-8 sm:row-start-1 sm:row-span-2 sm:col-span-4 sm:col-start-1 md:row-span-6 md:col-span-5 xl:col-span-6" />
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
