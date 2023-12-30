import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import EditDaysDropdown from "./EditDaysDropdown";
import { useMemo, useState } from "react";
import { useGlobalContext } from "@/app/_providers/GlobalContext";
import { ExerciseProps } from "@/app/_types";

interface EditRoutineProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditRoutineModal = ({ isOpen, onClose }: EditRoutineProps) => {
  const { routine, setRoutine } = useGlobalContext();

  const [selectedKeys, setSelectedKeys] = useState(
    new Set([`${routine.lists.length - 1}`])
  );
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const updateWeek = () => {
    const oldLength = routine.lists.length;
    console.log("Selected value: ", selectedValue);
    const newLength = Number(selectedValue) + 1;
    const newRoutine = { ...routine };
    console.log("Old Routine:", oldLength, routine);

    // Initialize an array to hold all exercises that need to be moved
    let exercisesToMove: ExerciseProps[] = [];

    // If newLength is less than oldLength, move overflow exercises to a temporary array
    if (newLength < oldLength) {
      for (let i = newLength; i < oldLength; i++) {
        exercisesToMove = [...exercisesToMove, ...routine.lists[i].exercises];
      }
      // Trim the excess lists
      newRoutine.lists = newRoutine.lists.slice(0, newLength);
    }
    // If newLength is greater than oldLength, add additional empty lists
    else if (newLength > oldLength) {
      const additionalLists = Array.from(
        { length: newLength - oldLength },
        (_, index) => ({
          id: `Day ${oldLength + index}`,
          exercises: [],
        })
      );
      newRoutine.lists = [...newRoutine.lists, ...additionalLists];
    }

    // Add the temporary array of exercises to the first list
    newRoutine.lists[0].exercises = [
      ...newRoutine.lists[0].exercises,
      ...exercisesToMove,
    ];

    console.log("New Routine:", newLength, newRoutine);

    // Update the routine
    setRoutine(newRoutine);
  };

  const saveChanges = () => {
    updateWeek();
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      radius="lg"
      classNames={{
        body: "py-6",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Routine
            </ModalHeader>
            <ModalBody className="items-center">
              <Input
                autoFocus
                label="Routine Name"
                placeholder="Enter name"
                defaultValue={routine?.id}
                variant="bordered"
              />
              <EditDaysDropdown
                selectedKeys={selectedKeys}
                setSelectedKeys={setSelectedKeys}
                selectedValue={selectedValue}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  saveChanges();
                  onClose();
                }}
              >
                Apply
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
