import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import EditDaysDropdown from "../edit/EditDaysDropdown";
import { useGlobalContext } from "@/app/_providers/GlobalContext";
import { useState, useMemo, useEffect } from "react";
import { ExerciseList, RoutineProps } from "@/app/_types";

interface CreateRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRoutineModal = ({
  isOpen,
  onClose,
}: CreateRoutineModalProps) => {
  const { routine, setRoutine, routineIds } = useGlobalContext();
  const [name, setName] = useState<string>();
  const [isNameValid, setIsNameValid] = useState<boolean>(true);

  const [selectedKeys, setSelectedKeys] = useState(
    new Set([`${routine.lists.length - 1}`])
  );
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const validateName = (name: string) => {
    if (routineIds.includes(name)) return false;
    return true;
  };

  const handleCreate = () => {
    // Validation
    if (!name) return setIsNameValid(false);
    else if (!validateName(name)) return setIsNameValid(false);

    // Create routine
    const lists: ExerciseList[] = [
      {
        id: "Search",
        exercises: [],
      },
    ];
    for (let i = 1; i <= Number(selectedValue); i++) {
      lists.push({
        id: `Day ${i}`,
        exercises: [],
      });
    }
    const newRoutine: RoutineProps = {
      id: name,
      targetSets: 10,
      lists,
    };

    setRoutine(newRoutine);
    onClose();
  };

  useEffect(() => setIsNameValid(true), [isNameValid]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      backdrop="opaque"
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
              Create a New Routine
            </ModalHeader>
            <ModalBody className="flex items-center">
              <Input
                autoFocus
                label="Routine Name"
                placeholder="Enter name"
                onValueChange={setName}
                variant="bordered"
                isInvalid={!isNameValid}
                errorMessage={
                  isNameValid ? null : "Please enter a unique name."
                }
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
              <Button color="primary" onPress={handleCreate}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
