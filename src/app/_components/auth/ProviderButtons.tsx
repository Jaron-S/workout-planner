import { Button } from "@nextui-org/react";
import { UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/app/_firebase/auth/auth";
import GoogleIcon from "./GoogleIcon";

const ProviderButtons = () => {
  const router = useRouter();
  const handleSignIn = async (
    providerFunction: () => Promise<UserCredential>
  ) => {
    const credentials = await providerFunction();
    if (credentials) router.push("/dashboard");
  };
  return (
    <div className="flex w-full justify-center mb-4">
      <Button
        isIconOnly
        className="p-2"
        onClick={() => handleSignIn(signInWithGoogle)}
      >
        <GoogleIcon />
      </Button>
    </div>
  );
};

export default ProviderButtons;
