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
    <Card className="w-full min-h-full md:max-w-[225px]">
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
            className="h-full w-full"
          >
            <CardBody className="h-full w-full items-center overflow-visible">
              {exercises.map((exercise, index) => (
                <Exercise key={exercise.id} exercise={exercise} index={index} />
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
  // Calculate total sets
  const totalSets = exercises.reduce((acc, exercise) => acc + exercise.sets, 0);

  // Count compound exercises
  const compoundExercises = exercises.filter((exercise) => exercise.compound);
  const compoundExerciseCount = compoundExercises.length;

  // Count isolation exercises
  const isolationExercises = exercises.filter((exercise) => !exercise.compound);
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

  // Warning selector function
  const warningSelector = (
    totalSets: number,
    compoundExerciseCount: number,
    isolationExerciseCount: number,
    compoundFirst: boolean,
    muscleGroups: Record<string, number>
  ) => {
    let warningMsg;
    let warningColor;

    if (!compoundFirst) {
      warningMsg = (
        <div className="px-1 py-2 max-w-[200px]">
          <div className="text-small font-bold">
            Compound exercises should be first.
          </div>
          <Divider className="my-1" />
          <div className="text-tiny">
            Consider rearranging your workout to start with compound exercises
            for optimal performance.
          </div>
        </div>
      );
      warningColor = "danger";
    } else if (totalSets < 15) {
      warningMsg = (
        <div className="px-1 py-2 max-w-[200px]">
          <div className="text-small font-bold">Less than 15 sets.</div>
          <Divider className="my-1" />
          <div className="text-tiny">
            Consider increasing weekly volume or reducing the number of days.
          </div>
        </div>
      );
      warningColor = "danger";
    } else if (totalSets > 25) {
      warningMsg = (
        <div className="px-1 py-2 max-w-[200px]">
          <div className="text-small font-bold">Over 25 sets.</div>
          <Divider className="my-1" />
          <div className="text-tiny">
            Consider reducing weekly volume or increasing the number of days.
          </div>
        </div>
      );
      warningColor = "danger";
    } else if (compoundExerciseCount > 3) {
      warningMsg = (
        <div className="px-1 py-2 max-w-[200px]">
          <div className="text-small font-bold">
            Too many compound exercises.
          </div>
          <Divider className="my-1" />
          <div className="text-tiny">
            Consider reducing the number of compound exercises to avoid
            excessive fatigue.
          </div>
        </div>
      );
      warningColor = "warning";
    } else if (isolationExerciseCount > 4) {
      warningMsg = (
        <div className="px-1 py-2 max-w-[200px]">
          <div className="text-small font-bold">
            Too many isolation exercises.
          </div>
          <Divider className="my-1" />
          <div className="text-tiny">
            Consider reducing the number of isolation exercises to focus on more
            impactful movements.
          </div>
        </div>
      );
      warningColor = "warning";
    } else if (Object.values(muscleGroups).some((count) => count > 3)) {
      warningMsg = (
        <div className="px-1 py-2 max-w-[200px]">
          <div className="text-small font-bold">
            Too many exercises per muscle group.
          </div>
          <Divider className="my-1" />
          <div className="text-tiny">
            Consider reducing the number of exercises targeting the same muscle
            group.
          </div>
        </div>
      );
      warningColor = "warning";
    } else {
      warningMsg = (
        <div className="px-1 py-2 max-w-[200px]">
          <div className="text-small font-bold">All criteria met.</div>
          <Divider className="my-1" />
          <div className="text-tiny">
            Your workout is well-structured and within the optimal range for
            progress and fatigue management.
          </div>
        </div>
      );
      warningColor = "success";
    }

    return { warningMsg, warningColor };
  };

  const { warningMsg, warningColor } = warningSelector(
    totalSets,
    compoundExerciseCount,
    isolationExerciseCount,
    compoundFirst,
    muscleGroups
  );

  return (
    <div className="flex justify-end items-center">
      <Tooltip showArrow content={warningMsg} delay={500}>
        {warningColor !== "success" ? (
          <WarningAmberIcon
            className={`text-${warningColor}`}
            fontSize="small"
          />
        ) : (
          <CheckIcon className={`text-${warningColor}`} fontSize="small" />
        )}
      </Tooltip>
      <p className="ml-2">{`Sets: ${totalSets}`}</p>
    </div>
  );
};

export default Day;
