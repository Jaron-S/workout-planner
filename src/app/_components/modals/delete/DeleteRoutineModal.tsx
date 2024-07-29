import { useAuthContext } from "@/app/_providers/AuthContext";
import { useGlobalContext } from "@/app/_providers/GlobalContext";
import { initialRoutine } from "@/app/_data/initialData";
import { removeRoutine } from "@/app/_firebase/firestore/removeData";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface DeleteRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  routineId: string;
}

export const DeleteRoutineModal = ({
  isOpen,
  onClose,
  routineId,
}: DeleteRoutineModalProps) => {
  const { routine, setRoutine, routineIds, setRoutineIds } = useGlobalContext();

  const handleRemoveRoutine = async () => {
    const result = await removeRoutine(routineId);
    if (result.success) {
      setRoutineIds(routineIds.filter((item) => item !== routineId));
      if (routineId === routine.id) setRoutine(initialRoutine);
    }

    onClose();
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
              Confirm Delete Routine
            </ModalHeader>
            <ModalBody className="items-center">
              <p>Are you sure you want to remove the following routine?</p>
              <p className="font-bold text-lg">{routineId}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onPress={handleRemoveRoutine}
                color="danger"
              >
                Remove
              </Button>
              <Button color="primary" variant="solid" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
