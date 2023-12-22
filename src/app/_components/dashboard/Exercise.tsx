import { ExerciseProps } from "@/app/_types";
import { Draggable } from "@hello-pangea/dnd";
import { useGlobalContext } from "../../_context/GlobalContext";
import {
  Card,
  CardBody,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

interface ExerciseComponentProps {
  exercise: ExerciseProps;
  index: number;
}

const Exercise = ({ exercise, index }: ExerciseComponentProps) => {
  const { routine, setRoutine } = useGlobalContext();

  const removeExercise = () => {
    const newRoutine = { ...routine };

    // Iterate through all lists to find and remove the selected item.
    newRoutine.lists = newRoutine.lists.map((list) => ({
      ...list,
      exercises: list.exercises.filter((e) => e.id !== exercise.id),
    }));

    setRoutine(newRoutine);
  };

  const handleSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSets = Number(e.target.value);
    const newRoutine = { ...routine };

    newRoutine.lists = newRoutine.lists.map((list) => ({
      ...list,
      exercises: list.exercises.map((ex) =>
        exercise.id === ex.id ? { ...ex, sets: updatedSets } : ex
      ),
    }));
    setRoutine(newRoutine);
  };

  return (
    <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card
            isHoverable
            className="flex w-48 md:w-36 lg:w-42 col-span-1 bg-secondary m-2"
          >
            <CardBody className="flex-col p-2 lg:p-3">
              <p className="mr-10 lg:mr-10 text-medium md:text-small xl:text-medium">
                {!exercise ? "Loading..." : exercise.name}
              </p>

              <div className="flex h-full absolute items-center justify-items-center top-0 right-2 -mx-2 ">
                <Popover>
                  <PopoverTrigger>
                    <EditIcon
                      fontSize="small"
                      className="hover:cursor-pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    {(titleProps) => (
                      <div className="px-1 py-2 w-full">
                        <h3
                          className="text-small font-bold text-foreground"
                          {...titleProps}
                        >
                          Change Volume
                        </h3>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                          <Input
                            defaultValue={exercise.sets.toString()}
                            label="Sets"
                            variant="bordered"
                            onChange={handleSetChange}
                            type="number"
                          />
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>

                <CloseIcon
                  fontSize="small"
                  className="m-1"
                  onClick={removeExercise}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Exercise;
