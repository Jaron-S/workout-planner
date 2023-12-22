import { useGlobalContext } from "@/app/_context/GlobalContext";
import { storeRoutine } from "@/app/_firebase/firestore/addData";
import { updateRoutine } from "@/app/_firebase/firestore/editData";
import { getMyRoutines } from "@/app/_firebase/firestore/getData";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface SaveRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  routineId?: string;
}

// 1. Save the current routine
// 2. Update the routine if it exists already
// 3. Duplicate a routine
export const SaveRoutineModal = ({
  isOpen,
  onClose,
  routineId,
}: SaveRoutineModalProps) => {
  const { routine, setRoutine, routineIds, setRoutineIds } = useGlobalContext();
  const [inputString, setInputString] = useState<string>(routine.id);
  const [isNameInvalid, setIsNameInvalid] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ success: false, message: "" });
  const [readyToSave, setReadyToSave] = useState(false);

  const getRoutines = async () => {
    const result = await getMyRoutines();
    const ids: string[] = [];
    result.map((routine) => {
      ids.push(routine.data.id);
    });
    setRoutineIds(ids);
    return result;
  };

  const isUniqueId = () => {
    if (!inputString) return false;
    else if (routineIds.find((id) => id === inputString)) return false;
    return true;
  };

  const isCurrentRoutine = () => {
    console.log(routine.id);
    console.log(inputString);
    return routine.id.length > 0 && routine.id === inputString;
  };

  const handleSave = async () => {
    if (isCurrentRoutine() || isUniqueId()) {
      setRoutine({
        ...routine,
        id: inputString,
      });
      setReadyToSave(true); // Set a flag to indicate we're ready to save.
    } else if (!isCurrentRoutine()) {
      setIsNameInvalid(true);
    }
  };

  useEffect(() => {
    getRoutines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This effect will run after routine has been updated.
  useEffect(() => {
    if (readyToSave) {
      const saveRoutineAsync = async () => {
        const routineFunction = isCurrentRoutine()
          ? updateRoutine
          : storeRoutine;
        const result = await toast.promise(routineFunction(routine), {
          pending: "Saving Routine",
          success: "Routine Saved 👌",
          error: "Uh oh, something went wrong",
        });

        setSaveStatus(result);
        if (result.success) {
          setRoutineIds([...routineIds, inputString]);
          onClose();
          setSaveStatus({ success: false, message: "" }); // reset save status
        }
      };

      saveRoutineAsync();
      setReadyToSave(false); // Reset the flag after saving.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToSave, routine]);

  return (
    <>
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
                Save Routine
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Routine Name"
                  placeholder="Enter a name"
                  defaultValue={routine.id !== "" ? routine.id : ""}
                  variant="bordered"
                  isInvalid={isNameInvalid}
                  errorMessage={isNameInvalid && "Please enter a unique name"}
                  onChange={(e) => setInputString(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleSave();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
