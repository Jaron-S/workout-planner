"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { DeleteRoutineModal } from "../modals/delete/DeleteRoutineModal";
import { getMyRoutines, getRoutine } from "@/app/_firebase/firestore/getData";
import { useGlobalContext } from "@/app/_providers/GlobalContext";
import { RoutineProps } from "@/app/_types";
import { useRouter } from "next/navigation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { storeRoutine } from "@/app/_firebase/firestore/addData";

const Routines = () => {
  const router = useRouter();
  const { routine, setRoutine, routineIds, setRoutineIds } = useGlobalContext();
  const [routines, setRoutines] = useState<RoutineProps[]>();
  const [showDeleteRoutineModal, setShowDeleteRoutineModal] = useState(false);
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(
    null
  );
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([""]));

  const selectRoutine = (id: string) => {
    const selectedRoutine = routines?.find((routine) => {
      return routine.id === id;
    });
    setRoutine(selectedRoutine);
    router.push("/dashboard");
  };

  const removeRoutine = (id: string) => {
    setSelectedRoutineId(id);
    setShowDeleteRoutineModal(true);
  };

  const getRoutines = async () => {
    const result = await getMyRoutines();
    const ids: string[] = [];
    const routineList: RoutineProps[] = [];
    result.map((routine) => {
      ids.push(routine.data.id);
      routineList.push(routine.data);
    });
    setRoutineIds(ids);
    setRoutines(routineList);
  };

  const duplicateRoutine = async (id: string) => {
    function incrementId(id: string) {
      // Regex to match the pattern (n) at the end of the string
      const regex = /\((\d+)\)$/;
      let match;
      let newString = id;

      // Loop until a unique name is found
      while (routines?.some((routine) => routine.id === newString)) {
        match = newString.match(regex);

        if (match) {
          // If the pattern is found, increment the number
          const num = parseInt(match[1], 10) + 1;
          newString = newString.replace(regex, `(${num})`);
        } else {
          // If the pattern is not found, add (2) at the end
          newString = `${newString} (2)`;
        }
      }

      return newString;
    }

    const selectedRoutine = routines?.find((routine) => {
      return routine.id === id;
    });
    selectedRoutine &&
      storeRoutine({
        ...selectedRoutine,
        id: incrementId(selectedRoutine.id as string),
      } as RoutineProps);
    const newRoutine = routines?.find((routine) => {
      return routine.id === id;
    });
    getRoutines();
  };

  useEffect(() => {
    getRoutines();
    routine.id && setSelectedKeys(new Set([routine.id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pl-8 md:px-16 lg:px-32 xl:px-64">
      <h1 className="font-bold text-3xl lg:ml-8 pt-8">My Saved Routines</h1>
      <Listbox
        className="p-4 md:p-6 lg:p-8"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) =>
          setSelectedKeys(keys as SetStateAction<Set<string>>)
        }
      >
        {routineIds.map((id) => (
          <ListboxItem
            key={id}
            className="py-4 sm:p-4 md:p-8"
            variant={"flat"}
            onClick={() => selectRoutine(id)}
          >
            <div className="flex justify-between items-center">
              <div className="max-w-full min-w-0">
                <h3 className="truncate text-medium sm:text-large lg:text-xl">
                  {id}
                </h3>
              </div>
              <div className="flex items-center">
                <ResponsiveEditButton
                  id={id}
                  selectRoutine={selectRoutine}
                  duplicateRoutine={duplicateRoutine}
                />
                <ResponsiveRemoveButton id={id} removeRoutine={removeRoutine} />
              </div>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
      <DeleteRoutineModal
        isOpen={showDeleteRoutineModal}
        onClose={() => setShowDeleteRoutineModal(false)}
        routineId={selectedRoutineId as string}
      />
    </div>
  );
};

const ResponsiveRemoveButton = ({
  id,
  removeRoutine,
}: {
  id: string;
  removeRoutine: (id: string) => void;
}) => {
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("sm");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setButtonSize("md");
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setButtonSize("sm");
      } else {
        setButtonSize("lg");
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Button
      color="danger"
      variant="ghost"
      startContent={<DeleteForeverIcon />}
      isIconOnly
      onClick={() => removeRoutine(id)}
      className="z-30 mr-4"
      size={buttonSize}
    />
  );
};

const ResponsiveEditButton = ({
  id,
  selectRoutine,
  duplicateRoutine,
}: {
  id: string;
  selectRoutine: (id: string) => void;
  duplicateRoutine: (id: string) => void;
}) => {
  const [buttonSize, setButtonSize] = useState<"sm" | "md" | "lg">("sm");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setButtonSize("md");
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setButtonSize("sm");
      } else {
        setButtonSize("lg");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Dropdown aria-label="Edit routine dropdown">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="flat"
          size={buttonSize}
          className="z-30 mr-2 lg:mr-4"
        >
          <ModeEditIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem
          key="select"
          onClick={() => selectRoutine(id)}
          startContent={<ViewColumnIcon />}
        >
          View Routine
        </DropdownItem>
        <DropdownItem
          key="select"
          onClick={() => selectRoutine(id)}
          isDisabled
          startContent={<ModeEditIcon />}
        >
          Change Name
        </DropdownItem>
        <DropdownItem
          key="duplicate"
          onClick={() => duplicateRoutine(id)}
          startContent={<ContentCopyIcon />}
        >
          Duplicate
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Routines;
