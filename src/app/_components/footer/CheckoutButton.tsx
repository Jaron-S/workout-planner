import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import { Dispatch, SetStateAction } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

const CheckoutButton = ({
  amount,
  setIsValid,
}: {
  amount: string;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleCheckout = async () => {
    const parsedAmount = parseFloat(amount);
    if (parsedAmount < 0.5) setIsValid(false);
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { sessionId } = await response.json();

      const { error } = (await stripe?.redirectToCheckout({
        sessionId,
      })) || { error: "An unexpected error occured" };
      if (error) alert(error);
    } catch (err) {
      console.error("Error in creating checkout session:", err);
    }
  };

  return <Button onClick={handleCheckout}>Donate</Button>;
};

export default CheckoutButton;
