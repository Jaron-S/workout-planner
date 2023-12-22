import { useAuthContext } from "@/app/_context/AuthContext";
import { getCurrentAuthProvider } from "@/app/_firebase/auth/auth";
import { removeUser } from "@/app/_firebase/firestore/removeData";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal = ({
  isOpen,
  onClose,
}: DeleteAccountModalProps) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const authProvider = getCurrentAuthProvider();
  const [password, setPassword] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleRemoveAccount = async () => {
    const response = await removeUser(password);
    if (
      response?.code === "auth/wrong-password" ||
      response?.code === "auth/invalid-login-credentials"
    )
      setIsPasswordValid(false);
    else if (response?.error)
      return alert(`Error deleting account: ${response.error}`);
    else {
      router.push("/login");
      onClose();
    }
  };

  useEffect(() => {
    setIsPasswordValid(true);
  }, [password]);

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
              Confirm Delete Account
            </ModalHeader>
            <ModalBody className="items-center">
              <p className="text-center text-default-500">
                Are you sure you want to delete the account associated with the
                following email?
              </p>
              <p className="font-bold text-lg my-4">{user?.email}</p>
              <p className="text-center text-default-500">
                Your saved routines will be lost forever.
              </p>
              {authProvider === "password" && (
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  onValueChange={setPassword}
                  isInvalid={!isPasswordValid}
                  errorMessage={isPasswordValid ? null : "Incorrect password"}
                  className="mt-2"
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onPress={handleRemoveAccount}
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
