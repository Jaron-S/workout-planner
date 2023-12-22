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
import { ExerciseProps, MuscleGroup } from "@/app/_types";
import WarningIcon from "@mui/icons-material/Warning";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckIcon from "@mui/icons-material/Check";

interface DayProps {
  day: string;
  key: number;
  exercises: ExerciseProps[];
}

const Day = ({ day, exercises }: DayProps) => {
  const checkSetNumber = () => {
    const totalSets = exercises.map((e) => e.sets).reduce((a, b) => a + b, 0);
    return totalSets;
  };

  return (
    <Card className="w-full md:max-w-[225px]">
      <CardHeader className="flex justify-between gap-3">
        {day}
        <Warning sets={checkSetNumber()} />
      </CardHeader>
      <Divider />
      <Droppable droppableId={day}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-full w-full"
          >
            <CardBody className="h-full w-full items-center overflow-hidden">
              {exercises.map((exercise, index) => {
                return (
                  <Exercise
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                  />
                );
              })}
            </CardBody>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
};

const Warning = ({ sets }: { sets: number }) => {
  const warningMsg =
    sets < 15 ? (
      <div className="px-1 py-2 max-w-[200px]">
        <div className="text-small font-bold">Less than 15 sets.</div>
        <Divider className="my-1" />
        <div className="text-tiny">
          Consider increasing weekly volume or reducing the number of days.
        </div>
      </div>
    ) : sets > 25 ? (
      <div className="px-1 py-2 max-w-[200px]">
        <div className="text-small font-bold">Over 25 sets.</div>
        <Divider className="my-1" />
        <div className="text-tiny">
          Consider reducing weekly volume or increasing the number of days.
        </div>
      </div>
    ) : (
      <div className="px-1 py-2 max-w-[200px]">
        <div className="text-small font-bold">Between 15 and 25 sets.</div>
        <Divider className="my-1" />
        <div className="text-tiny">
          This is within the optimal range for progress and fatigue management.
        </div>
      </div>
    );

  const warningColor =
    sets < 5 || sets > 30
      ? "danger"
      : sets < 15 || sets > 25
      ? "warning"
      : "success";

  if (warningMsg)
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
        <p className="ml-2">{`Sets: ${sets}`}</p>
      </div>
    );
};

export default Day;
