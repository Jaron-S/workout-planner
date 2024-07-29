import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutButton from "./CheckoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const DonateButton = () => {
  const [amount, setAmount] = useState<string>("5");
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => setIsValid(true), [amount]);

  return (
    <Popover>
      <PopoverTrigger>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-yellow-500">
          <FontAwesomeIcon icon={faMugHot} className="text-lg pb-1" />
          <span className="text-small sm:text-medium md:text-large">
            Buy Me a Coffee
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="gap-2 p-4 w-sm">
        <Input
          type="number"
          label="Amount"
          placeholder="0.00"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
          onValueChange={setAmount}
          isInvalid={!isValid}
          errorMessage={
            isValid ? null : "Please enter an amount greater than $0.50"
          }
        />
        <CheckoutButton amount={amount} setIsValid={setIsValid} />
      </PopoverContent>
    </Popover>
  );
};

export default DonateButton;
