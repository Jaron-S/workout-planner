import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@nextui-org/react";

const EditDaysDropdown = ({
  selectedKeys,
  setSelectedKeys,
  selectedValue,
}: any) => {
  // handles type safety
  const handleSelectionChange = (keys: Selection) => {
    if (typeof keys === "string") {
      setSelectedKeys(new Set([keys]));
    } else if (keys instanceof Set) {
      const stringKeys = new Set<string>();
      keys.forEach((key) => stringKeys.add(String(key)));
      setSelectedKeys(stringKeys);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger className="max-w-[150px]">
        <Button variant="bordered" className="capitalize" color="default">
          {selectedValue} Days/Week
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        <DropdownItem key="2">2 Days/Week</DropdownItem>
        <DropdownItem key="3">3 Days/Week</DropdownItem>
        <DropdownItem key="4">4 Days/Week</DropdownItem>
        <DropdownItem key="5">5 Days/Week</DropdownItem>
        <DropdownItem key="6">6 Days/Week</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default EditDaysDropdown;
