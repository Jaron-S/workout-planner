"use client";
import { useState } from "react";
import { register } from "@/app/_firebase/auth/auth"; // Importing the registration function
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ProviderButtons from "./ProviderButtons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }

    const { result, error } = await register(email, password);

    if (error) {
      return alert("Unable to create account.\n" + error);
    }

    if (!error) router.push("/dashboard");
  };

  return (
    <Card className="p-8 max-w-[400px]">
      <Link
        href="/dashboard"
        color="foreground"
        className="w-full flex justify-center"
      >
        <FitnessCenterIcon />
        <p className="font-bold text-inherit mx-2">Program Balancer</p>
      </Link>

      <CardHeader className="flex flex-col">
        <h1 className="text-2xl font-bold my-4">Register</h1>
      </CardHeader>
      <Divider />

      <CardBody>
      <ProviderButtons />
        <form onSubmit={handleForm}>
          <div className="mb-4">
            <Input
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <Input
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" color="primary" className="w-full mb-4">
            Register
          </Button>
        </form>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-col text-center">
        <p className="mt-4">{"Already have an account?"}</p>
        <Link href="/login" className="ml-2 hover:underline">
          Login here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Register;
