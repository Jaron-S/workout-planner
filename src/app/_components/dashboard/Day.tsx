import { Droppable } from "@hello-pangea/dnd";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import Exercise from "./Exercise";
import { ExerciseProps } from "@/app/_types";
import { WarningAmber as WarningIcon, InfoOutlined as InfoIcon } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";

interface DayProps {
  day: string;
  key: number;
  exercises: ExerciseProps[];
}

const Day = ({ day, exercises }: DayProps) => {
  return (
    <Card className="w-full min-h-full md:max-w-[225px] flex flex-col">
      <CardHeader className="flex justify-between gap-3">
        {day}
        <Warning exercises={exercises} />
      </CardHeader>
      <Divider />
      <Droppable droppableId={day}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-grow h-full w-full flex flex-col"
          >
            <CardBody className="flex-grow h-full w-full items-center overflow-visible">
              {exercises.map((exercise, index) => (
                <Exercise
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                />
              ))}
            </CardBody>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
};


const Warning = ({ exercises }: { exercises: ExerciseProps[] }) => {

  const warningSelector = (exercises: ExerciseProps[]) => {
    let warnings: string[] = [];
    let highestPriorityColor: string = "success";
  
    // Calculate total sets for the entire workout
    const totalSets = exercises.reduce(
      (acc, exercise) => acc + exercise.sets,
      0
    );
  
    // Count compound and isolation exercises
    const compoundExercises = exercises.filter((exercise) => exercise.compound);
    const isolationExercises = exercises.filter((exercise) => !exercise.compound);
  
    // Check if compound exercises are performed first
    const compoundFirst = exercises.every((exercise, index) => {
      if (exercise.compound) {
        return !exercises.slice(0, index).some((e) => !e.compound);
      }
      return true;
    });
  
    // Calculate total sets per muscle group (weighted by muscle_weightings)
    const muscleGroupSets = exercises.reduce((acc, exercise) => {
      exercise.muscle_weightings.forEach(({ muscle, weighting }) => {
        // Accumulate the weighted sets for each muscle group
        acc[muscle] = (acc[muscle] || 0) + (exercise.sets * weighting);
      });
      return acc;
    }, {} as Record<string, number>);
  
    // Round the set count per muscle group
    Object.keys(muscleGroupSets).forEach(muscle => {
      muscleGroupSets[muscle] = Math.round(muscleGroupSets[muscle]);
    });
  
    // Compound exercises should be first
    if (!compoundFirst) {
      const isolationBeforeCompound = exercises
        .filter((exercise, index) => !exercise.compound && exercises.slice(index + 1).some((e) => e.compound))
        .map(e => e.name);
      warnings.push(
        `Compound exercises should be performed before isolation exercises. Rearrange the following: ${isolationBeforeCompound.join(", ")}.`
      );
      highestPriorityColor = "danger";
    }
  
    // Weekly volume check (total sets)
    if (totalSets < 15) {
      warnings.push(
        `The total number of sets (${totalSets}) is less than 15. Consider increasing weekly volume.`
      );
      highestPriorityColor = "danger";
    } else if (totalSets > 25) {
      warnings.push(
        `The total number of sets (${totalSets}) exceeds 25. Consider reducing weekly volume or splitting sessions.`
      );
      highestPriorityColor = "danger";
    }
  
    // Too few compound exercises
    if (compoundExercises.length < 2) {
      warnings.push(
        `Too few compound exercises (${compoundExercises.length}). Consider adding more compound movements for greater impact.`
      );
      highestPriorityColor = "warning";
    }
  
    // Check for muscle groups that are overloaded (too many sets)
    Object.entries(muscleGroupSets).forEach(([muscle, sets]) => {
      if (sets > 10) {
        warnings.push(
          `Too many sets for ${muscle} (${sets}). Consider reducing volume to avoid overtraining.`
        );
        if (highestPriorityColor === "success") highestPriorityColor = "warning";
      }
    });
  
    // No warnings
    if (warnings.length === 0) {
      warnings.push("All criteria met. Your workout is well-structured.");
    }
  
    return { warnings, highestPriorityColor };
  };
  
  const { warnings, highestPriorityColor } = warningSelector(exercises);

  return (
    <div className="flex justify-end items-center">
      <Tooltip
        showArrow
        content={
          <div className="px-1 py-2 max-w-[200px]">
            {warnings.map((warning, index) => (
              <React.Fragment key={index}>
                <div className="text-small font-bold">{warning}</div>
                {index < warnings.length - 1 && <Divider className="my-2" />}
              </React.Fragment>
            ))}
          </div>
        }
        delay={500}
      >
        {
          highestPriorityColor === "success" ? (
            <CheckIcon
              className={`text-${highestPriorityColor}`}
              fontSize="small"
            />
          ) : highestPriorityColor === "primary" ? (
            <InfoIcon fontSize="small" />
          ) : (
            <WarningIcon
              className={`text-${highestPriorityColor}`}
              fontSize="small"
            />
          )
        }
      </Tooltip>
      <p className="ml-2">{`Sets: ${exercises.reduce(
        (acc, exercise) => acc + exercise.sets,
        0
      )}`}</p>
    </div>
  );
};

export default Day;
