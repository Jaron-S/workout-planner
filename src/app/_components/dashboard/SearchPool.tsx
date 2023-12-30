import { ExerciseProps } from "@/app/_types";
import Exercise from "./Exercise";
import { Droppable } from "@hello-pangea/dnd";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Autocomplete from "../navbar/Autocomplete";

interface SearchPoolProps {
  exercises: ExerciseProps[];
  className?: string;
}

const SearchPool = ({ exercises, className }: SearchPoolProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const dropDirection = isSmallScreen ? "vertical" : "horizontal";

  return (
    <div className={`flex w-full h-full ${className}`}>
      <Card className="w-full">
        <CardHeader>
          <h3>Exercise Pool:</h3>
        </CardHeader>

        <Divider />
        <CardBody>
          <div className="p-2">
            <Autocomplete />
          </div>
          <Droppable droppableId={"Search"} direction="vertical">
            {(provided) => (
              <div
                className="flex flex-col w-full h-full min-h-[200px] overflow-hidden items-center"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {exercises.map((exercise, index) => {
                  return (
                    <Exercise
                      key={exercise.id}
                      exercise={exercise}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardBody>
      </Card>
    </div>
  );
};

export default SearchPool;
