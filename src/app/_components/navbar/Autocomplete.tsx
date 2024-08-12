"use client";

import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import AddIcon from "@mui/icons-material/Add";

import { useGlobalContext } from "@/app/_providers/GlobalContext";
import { ExerciseProps } from "@/app/_types";
import exerciseData from "../../../../public/exercises.json";
import { SearchIcon } from "./SearchIcon";

const Autocomplete = () => {
  const { routine, setRoutine } = useGlobalContext();
  const [inputString, setInputString] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<ExerciseProps | null>(null);

  const options = useMemo(
    () => exerciseData.map((exercise) => exercise.name),
    []
  ) as string[];
  const filteredOptions = useMemo(() => {
    return options.filter(
      (option) =>
        inputString && option.toLowerCase().includes(inputString.toLowerCase())
    );
  }, [inputString, options]);

  const listboxRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const findExercise = (name: string) =>
    exerciseData.find(
      (exercise) => exercise.name.toLowerCase() === name.toLowerCase()
    ) as ExerciseProps;

  const addExercise = () => {
    if (selectedItem === null) {
      return;
    } else if (selectedItem) {
      const id = crypto.randomUUID() as unknown as string;
      const newItem = { ...selectedItem, sets: 3, id };
      const newRoutine = { ...routine };
      newRoutine.lists[0].exercises = [
        ...newRoutine.lists[0].exercises,
        newItem,
      ];
      setRoutine(newRoutine);
    }
  };

  const handleSelect = (name: string) => {
    const item = findExercise(name);
    setSelectedItem(item);
  };

  const handleClear = () => {
    setInputString("");
  };

  const handleKeyDownOnInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && filteredOptions.length > 0) {
      e.preventDefault();
      const firstItem = listboxRef.current?.querySelector("li");
      (firstItem as HTMLElement)?.focus();
    } else if (e.key === "Enter") {
      addExercise();
    }
  };

  const handleKeyDownOnListbox = (e: KeyboardEvent<HTMLUListElement>) => {
    if (
      e.key === "ArrowUp" &&
      document.activeElement === listboxRef.current?.firstChild
    ) {
      e.preventDefault();
      inputRef.current?.focus();
    } else if (e.key === "ArrowDown" && document.activeElement) {
      e.preventDefault();
      const nextElement = (document.activeElement as HTMLElement)
        .nextElementSibling as HTMLElement;
      nextElement?.focus();
    } else if (e.key === "ArrowUp" && document.activeElement) {
      e.preventDefault();
      const prevElement = (document.activeElement as HTMLElement)
        .previousElementSibling as HTMLElement;
      prevElement?.focus();
    }
  };

  const handleKeyDownOnListItem = (e: React.KeyboardEvent, option: string) => {
    if (e.key === "Enter") {
      handleSelect(option);
      setInputString(option);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-72 mr-2">
        <Input
          value={inputString}
          placeholder="Find Exercise"
          isClearable
          isRequired
          size="sm"
          onChange={(e) => {
            handleClear();
            setInputString(e.target.value);
          }}
          onClear={handleClear}
          startContent={
            <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          ref={inputRef}
          onKeyDown={handleKeyDownOnInput}
        />
        {filteredOptions[0] && filteredOptions[0] !== selectedItem?.name && (
          <Listbox
            ref={listboxRef}
            aria-label="Exercise Options"
            variant="solid"
            className="absolute z-50 w-full px-1 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-large rounded-medium"
            onKeyDown={handleKeyDownOnListbox}
          >
            {filteredOptions.map((option, index) => (
              <ListboxItem
                key={index}
                tabIndex={-1}
                onClick={() => {
                  handleSelect(option);
                  setInputString(option); // Update input string to the selected option's name
                }}
                onKeyDown={(e) => handleKeyDownOnListItem(e, option)}
              >
                {option}
              </ListboxItem>
            ))}
          </Listbox>
        )}
      </div>
      <Button
        onClick={addExercise}
        color="secondary"
        variant="bordered"
        isIconOnly
      >
        <AddIcon />
      </Button>
    </div>
  );
};

export default Autocomplete;
