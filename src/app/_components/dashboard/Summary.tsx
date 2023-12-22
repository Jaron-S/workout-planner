import React, { Key, useEffect, useMemo, useState } from "react";
import { useGlobalContext } from "../../_context/GlobalContext";
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
import { MuscleGroup } from "@/app/_types";
import Image from "next/image";
import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import InfoIcon from "@mui/icons-material/Info";

function emptyMuscleGroups(): MuscleGroup[] {
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

const MuscleMapView = (muscleActivation: MuscleGroup[]) => {
  return (
    <Image
      src="/MuscleMap.png"
      alt="Muscle Map"
      width={250}
      height={300}
      layout="responsive"
      className="max-w-[250px]"
    />
  );
};

const RadarView = (muscleActivation: MuscleGroup[]) => {
  const primaryColor = "#006FEE"; // NextUI default primary blue
  const primaryLightColor = "#66AAF9"; // A lighter shade of NextUI blue
  const backgroundColor = "rgba(102, 170, 249, 0.2)"; // Light blue with transparency for the fill

  // Map over muscleActivation to create the chart data
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
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: primaryLightColor,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: "#FFFFFF",
        },
        angleLines: {
          color: "#FFFFFF",
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
        borderColor: "#FFFFFF",
      },
      point: {
        borderColor: "#FFFFFF",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full h-full md:min-h-[250px] flex items-center justify-center overflow-visible">
      <Radar data={data} options={options} />
    </div>
  );
};

const Summary = ({ className }: { className?: string }) => {
  const { routine } = useGlobalContext();
  const [muscleActivation, setMuscleActivation] = useState(emptyMuscleGroups());
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["Radar View"])
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
    let newMuscleActivation = emptyMuscleGroups();

    // Loop through each exercise in the routine
    routine.lists.forEach((list) => {
      if (list.id === "Search") return;
      list.exercises.forEach((exercise) => {
        // Update the primary muscle group activation
        const muscleObj = newMuscleActivation.find(
          (muscle) =>
            muscle.id.toLowerCase() === exercise.primary_muscle?.toLowerCase()
        );
        if (muscleObj) {
          muscleObj.sets += exercise.primary_weighting * exercise.sets;
        }

        // Loop through auxiliary muscles to update their activation
        for (let i = 1; i <= 10; i++) {
          const auxMuscle =
            exercise[`aux_muscle_${i}` as keyof typeof exercise];
          const auxWeighting =
            exercise[`aux_weighting_${i}` as keyof typeof exercise];

          if (
            typeof auxMuscle !== "string" ||
            typeof auxWeighting !== "number"
          ) {
            break;
          }

          const auxMuscleObj = newMuscleActivation.find(
            (muscle) => muscle.id === auxMuscle
          );
          if (auxMuscleObj) {
            auxMuscleObj.sets += auxWeighting * exercise.sets;
          }
        }
      });
    });

    // Update the state to reflect the new muscle activations
    setMuscleActivation(newMuscleActivation);
  };

  useEffect(() => {
    sumMuscleActivation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routine]);

  return (
    <div className={`${className}`}>
      <Card>
        <CardHeader className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-md">Muscle Activation</p>
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
          {selectedValue === "List View" ? (
            ListView(muscleActivation)
          ) : selectedValue === "Muscle Map" ? (
            MuscleMapView(muscleActivation)
          ) : selectedValue === "Radar View" ? (
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
              disabledKeys={["Muscle Map"]}
            >
              <DropdownItem key="Radar View">Radar View</DropdownItem>
              <DropdownItem key="List View">List View</DropdownItem>
              <DropdownItem key="Muscle Map">Muscle Map</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Summary;
