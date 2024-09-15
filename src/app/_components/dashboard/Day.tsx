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
import { WarningAmber as WarningAmberIcon } from "@mui/icons-material";
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

    // Calculate total sets
    const totalSets = exercises.reduce(
      (acc, exercise) => acc + exercise.sets,
      0
    );

    // Count compound exercises
    const compoundExercises = exercises.filter((exercise) => exercise.compound);
    const compoundExerciseCount = compoundExercises.length;

    // Count isolation exercises
    const isolationExercises = exercises.filter(
      (exercise) => !exercise.compound
    );
    const isolationExerciseCount = isolationExercises.length;

    // Check if compound exercises are performed first
    const compoundFirst = exercises.every((exercise, index) => {
      if (exercise.compound) {
        // Once we find a compound exercise, ensure that no isolation exercises are before it
        return !exercises.slice(0, index).some((e) => !e.compound);
      }
      return true;
    });

    // Calculate the total number of exercises per muscle group
    const muscleGroups = exercises.reduce((acc, exercise) => {
      exercise.muscle_weightings.forEach(({ muscle }) => {
        acc[muscle] = (acc[muscle] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    if (!compoundFirst) {
      warnings.push(
        "Compound exercises should be first. Consider rearranging your workout."
      );
      highestPriorityColor = "danger";
    }

    if (totalSets < 15) {
      warnings.push(
        "Less than 15 sets. Consider increasing weekly volume or reducing the number of days."
      );
      highestPriorityColor = "danger";
    } else if (totalSets > 25) {
      warnings.push(
        "Over 25 sets. Consider reducing weekly volume or increasing the number of days."
      );
      highestPriorityColor = "danger";
    }

    if (compoundExerciseCount > 3) {
      warnings.push(
        "Too many compound exercises. Consider reducing the number to avoid excessive fatigue."
      );
      highestPriorityColor =
        highestPriorityColor === "success" ? "warning" : highestPriorityColor;
    }

    if (isolationExerciseCount > 4) {
      warnings.push(
        "Too many isolation exercises. Consider reducing the number to focus on more impactful movements."
      );
      highestPriorityColor =
        highestPriorityColor === "success" ? "warning" : highestPriorityColor;
    }

    if (Object.values(muscleGroups).some((count) => count > 3)) {
      warnings.push(
        "Too many exercises for one muscle group. Consider reducing the number to avoid overtraining."
      );
      highestPriorityColor =
        highestPriorityColor === "success" ? "warning" : highestPriorityColor;
    }

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
        {highestPriorityColor !== "success" ? (
          <WarningAmberIcon
            className={`text-${highestPriorityColor}`}
            fontSize="small"
          />
        ) : (
          <CheckIcon
            className={`text-${highestPriorityColor}`}
            fontSize="small"
          />
        )}
      </Tooltip>
      <p className="ml-2">{`Sets: ${exercises.reduce(
        (acc, exercise) => acc + exercise.sets,
        0
      )}`}</p>
    </div>
  );
};

export default Day;
