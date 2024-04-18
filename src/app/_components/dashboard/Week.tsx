import React from "react";
import Day from "./Day";
import { useGlobalContext } from "../../_providers/GlobalContext";

const Week = ({ className }: { className?: string }) => {
  const { routine } = useGlobalContext();
  const numDays = routine.lists.length - 1;

  return (
    <div
      className={`flex flex-wrap xl:flex-nowrap w-full xl:h-full justify-center items-start px-2 ${
        numDays > 4 ? (numDays > 5 ? "gap-1" : "gap-2") : "gap-4"
      } ${className}`}
    >
      {routine.lists.map((list) => {
        if (list.id === "Search") return;
        return (
          <Day
            key={list.id as unknown as number}
            day={list.id}
            exercises={list.exercises}
          />
        );
      })}
    </div>
  );
};

export default Week;
