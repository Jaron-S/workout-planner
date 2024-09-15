"use client";

import { useGlobalContext } from "@/app/_providers/GlobalContext";
import { useEffect, useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";

import { EditRoutineModal } from "../modals/edit/EditRoutineModal";
import { CreateRoutineModal } from "../modals/create/CreateRoutineModal";
import { SaveRoutineModal } from "../modals/save/SaveRoutineModal";
import { DeleteRoutineModal } from "../modals/delete/DeleteRoutineModal";
import { useAuthContext } from "@/app/_providers/AuthContext";

const checkUnsavedChanges = () => {
  // Your implementation here
  return true;
};

const RoutineSettingsButton = () => {
  const { user } = useAuthContext();
  const { routine } = useGlobalContext();

  const [showNewRoutineModal, setShowNewRoutineModal] = useState(false);
  const [showEditRoutineModal, setShowEditRoutineModal] = useState(false);
  const [showSaveRoutineModal, setShowSaveRoutineModal] = useState(false);
  const [showDeleteRoutineModal, setShowDeleteRoutineModal] = useState(false);

  const iconClasses = "text-xl text-default-700 pointer-events-none flex-shrink-0";

  const openNewRoutineModal = () => {
    if (checkUnsavedChanges()) {
      setShowNewRoutineModal(true);
    }
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly variant="light" className="m-2">
            <SettingsIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Routine Menu"
          disabledKeys={user ? [] : ["save", "delete"]}
        >
          <DropdownItem
            key="edit"
            startContent={<EditIcon className={iconClasses} />}
            onClick={() => setShowEditRoutineModal(true)}
          >
            Edit Routine
          </DropdownItem>

          <DropdownItem
            key="new"
            startContent={<AddBoxIcon className={iconClasses} />}
            onClick={openNewRoutineModal}
          >
            New Routine
          </DropdownItem>
          <DropdownItem
            key="save"
            startContent={<SaveIcon className={iconClasses} />}
            onClick={() => setShowSaveRoutineModal(true)}
          >
            Save Routine
          </DropdownItem>
          <DropdownItem
            key="delete"
            startContent={<DeleteForeverIcon className={iconClasses} />}
            className="text-danger"
            color="danger"
            onClick={() => setShowDeleteRoutineModal(true)}
          >
            Delete Routine
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Keeping the modal content as per your requirement */}
      <CreateRoutineModal
        isOpen={showNewRoutineModal}
        onClose={() => setShowNewRoutineModal(false)}
      />
      <EditRoutineModal
        isOpen={showEditRoutineModal}
        onClose={() => setShowEditRoutineModal(false)}
      />
      <SaveRoutineModal
        isOpen={showSaveRoutineModal}
        onClose={() => setShowSaveRoutineModal(false)}
      />
      <DeleteRoutineModal
        isOpen={showDeleteRoutineModal}
        onClose={() => setShowDeleteRoutineModal(false)}
        routineId={routine.id as string}
      />
    </>
  );
};

export default RoutineSettingsButton;
