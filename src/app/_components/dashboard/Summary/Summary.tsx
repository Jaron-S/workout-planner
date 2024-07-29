"use client";

import React, { Key, useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../../../_providers/GlobalContext";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Listbox,
  ListboxItem,
  Tooltip,
} from "@nextui-org/react";
import {
  ExerciseProps,
  MuscleGroup,
  MuscleGroups,
  PlanesOfMotion,
} from "@/app/_types";
import { Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
} from "chart.js";
import "chart.js/auto";
import InfoIcon from "@mui/icons-material/Info";
import RoutineSettingsButton from "../RoutineSettingsButton";

function initialMuscleGroups(): MuscleGroup[] {
  return [
    { id: "Neck", sets: 0, reps: 0 },
    { id: "Traps", sets: 0, reps: 0 },
    { id: "Shoulders", sets: 0, reps: 0 },
    { id: "Chest", sets: 0, reps: 0 },
    { id: "Biceps", sets: 0, reps: 0 },
    { id: "Triceps", sets: 0, reps: 0 },
    { id: "Forearms", sets: 0, reps: 0 },
    { id: "Abs", sets: 0, reps: 0 },
    { id: "Lats", sets: 0, reps: 0 },
    { id: "Middle_Back", sets: 0, reps: 0 },
    { id: "Lower_Back", sets: 0, reps: 0 },
    { id: "Glutes", sets: 0, reps: 0 },
    { id: "Quads", sets: 0, reps: 0 },
    { id: "Hamstrings", sets: 0, reps: 0 },
    { id: "Calves", sets: 0, reps: 0 },
  ];
}

function initialPlanesOfMotion(): PlanesOfMotion {
  return {
    SagittalPush: 0,
    SagittalPull: 0,
    FrontalPush: 0,
    FrontalPull: 0,
    TransversePush: 0,
    TransversePull: 0,
  };
}

const ListView = (muscleActivation: MuscleGroup[]) => {
  // sort
  const sortedMuscleActivation = [...muscleActivation];
  sortedMuscleActivation.sort((a, b) => b.sets - a.sets);

  return (
    <Listbox>
      {sortedMuscleActivation.map((muscleGroup) => {
        const setNumber = Math.round(muscleGroup.sets);
        const hoverColor =
          setNumber >= 10 ? "success" : setNumber >= 7 ? "warning" : "danger";
        return (
          <ListboxItem key={muscleGroup.id} color={hoverColor}>
            <span className="font-semibold">
              {muscleGroup.id.replace(/_/g, " ")}:{" "}
            </span>
            <span>{setNumber}</span>
          </ListboxItem>
        );
      })}
    </Listbox>
  );
};

const PlanesOfMotionView = (planesOfMotion: PlanesOfMotion) => {
  const primaryColor = "#006FEE"; // You can still use this for borders or other purposes

  // Define an array of background colors, one for each category
  const backgroundColors = [
    "rgba(255, 99, 132, 0.6)", // Red
    "rgba(54, 162, 235, 0.6)", // Blue
    "rgba(255, 206, 86, 0.6)", // Yellow
    "rgba(75, 192, 192, 0.6)", // Green
    "rgba(153, 102, 255, 0.6)", // Purple
    "rgba(255, 159, 64, 0.6)", // Orange
  ];

  const data = {
    labels: [
      "Sagittal Push",
      "Sagittal Pull",
      "Frontal Push",
      "Frontal Pull",
      "Transverse Push",
      "Transverse Pull",
    ],
    datasets: [
      {
        label: "# of Sets",
        data: [
          planesOfMotion.SagittalPush,
          planesOfMotion.SagittalPull,
          planesOfMotion.FrontalPush,
          planesOfMotion.FrontalPull,
          planesOfMotion.TransversePush,
          planesOfMotion.TransversePull,
        ],
        fill: true,
        backgroundColor: backgroundColors, // Apply the array of colors here
        borderWidth: 1,
        pointBackgroundColor: primaryColor,
        pointBorderColor: "#fff",
        pointRadius: 4,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.5)",
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.5)",
        },
        pointLabels: {
          color: "#ecedee",
          font: {
            size: 14,
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: "#ecedee",
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as "top" | "bottom" | "left" | "right",
        labels: {
          color: "#ecedee",
        },
      },
    },
  };

  return (
    <div className="w-full md:min-h-[250px] max-h-full flex items-center justify-center overflow-visible">
      <PolarArea data={data} options={options} />
    </div>
  );
};

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

const RadarView = (muscleActivation: MuscleGroup[]) => {
  const primaryColor = "#006FEE";
  const backgroundColor = "rgba(102, 170, 249, 0.4)";

  const labels = muscleActivation.map((group) => group.id.replace("_", " "));
  const dataValues = muscleActivation.map((group) => Math.round(group.sets));

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sets",
        data: dataValues,
        fill: true,
        backgroundColor: backgroundColor,
        borderColor: primaryColor,
        pointBackgroundColor: primaryColor,
        pointBorderColor: "#fff",
        borderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.5)",
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.5)",
        },
        pointLabels: {
          color: "#ecedee",
          font: {
            size: 14,
          },
        },
        ticks: {
          backdropColor: "transparent",
          color: "#ecedee",
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
      point: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex items-center justify-center overflow-visible">
      <Radar data={data} options={options} className="" />
    </div>
  );
};

const Summary = ({ className }: { className?: string }) => {
  const { routine } = useGlobalContext();
  const [muscleActivation, setMuscleActivation] = useState<MuscleGroup[]>(
    initialMuscleGroups()
  );
  const [planesOfMotionCounts, setPlanesOfMotionCounts] =
    useState<PlanesOfMotion>(initialPlanesOfMotion());
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["Muscle Group Distribution"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: any) => {
    setSelectedKeys(keys);
  };

  // adds up all the muscle activation
  const sumMuscleActivation = () => {
    const activationSum = initialMuscleGroups();

    routine.lists.forEach((list) => {
      if (list.id === "Search") return;

      list.exercises.forEach((exercise: ExerciseProps) => {
        exercise.muscle_weightings &&
          exercise.muscle_weightings.forEach((weighting) => {
            const foundIndex = activationSum.findIndex(
              (mg) => mg.id === weighting.muscle
            );
            if (foundIndex !== -1) {
              activationSum[foundIndex].sets +=
                weighting.weighting * exercise.sets;
            }
          });
      });
    });

    setMuscleActivation(activationSum);
  };

  // adds up planes of motion
  const sumPlanesOfMotion = () => {
    const counts = initialPlanesOfMotion();

    routine.lists.forEach((list) => {
      if (list.id === "Search") return; // skipping lists with id "Search"

      list.exercises.forEach((exercise: ExerciseProps) => {
        const sets = (counts[exercise.plane_of_motion] += exercise.sets);
      });
    });

    setPlanesOfMotionCounts(counts);
  };

  useEffect(() => {
    sumMuscleActivation();
    sumPlanesOfMotion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routine]);

  return (
    <div
      className={` h-full flex flex-col items-center justify-start ${className}`}
    >
      {/* Title */}
      <div className="w-full flex justify-between items-center mb-2 pl-4">
        <h1 className="font-bold text-xl break-words">
          {routine.id
            ? routine.id
                .split("_")
                .map(
                  (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join(" ")
            : "New Routine"}
        </h1>
        <RoutineSettingsButton />
      </div>
      {/* Summary */}
      <div className="w-full flex justify-center">
        <Card className="w-full">
          <CardHeader className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-md">Exercise Activation</p>
              <p className="text-small text-default-500">(sets per week)</p>
            </div>
            <Tooltip
              content={
                <div className="px-1 py-2 max-w-[200px]">
                  <div className="text-small font-bold">Need help?</div>

                  <div className="text-tiny">
                    Click here to learn more about routine design.
                  </div>
                </div>
              }
            >
              <Link href="/guide" color="foreground">
                <InfoIcon />
              </Link>
            </Tooltip>
          </CardHeader>
          <Divider />
          <CardBody className="flex items-center overflow-hidden">
            {selectedValue === "Muscle Group List" ? (
              ListView(muscleActivation)
            ) : selectedValue === "Planes of Motion" ? (
              PlanesOfMotionView(planesOfMotionCounts)
            ) : selectedValue === "Muscle Group Distribution" ? (
              RadarView(muscleActivation)
            ) : (
              <></>
            )}
          </CardBody>
          <Divider />
          <CardFooter className="flex justify-center items-center my-2">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Summary View Selector"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
              >
                <DropdownItem key="Muscle Group Distribution">
                  Muscle Group Distribution
                </DropdownItem>
                <DropdownItem key="Muscle Group List">
                  Muscle Group List
                </DropdownItem>
                <DropdownItem key="Planes of Motion">
                  Planes of Motion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Summary;
