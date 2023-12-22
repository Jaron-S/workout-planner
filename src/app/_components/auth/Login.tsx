"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { signIn } from "@/app/_firebase/auth/auth";
import { FirebaseError } from "firebase/app";
import ProviderButtons from "./ProviderButtons";
import Logo from "../navbar/Logo";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    const parseError = (error: FirebaseError) => {
      resetErrors();
      switch (error.code) {
        case "auth/invalid-email":
          setIsEmailValid(false);
          setEmailErrorMsg("Email address is not valid.");
          break;
        case "auth/missing-password":
          setIsPasswordValid(false);
          setPasswordErrorMsg("Please enter a password.");
          break;
        case "auth/invalid-login-credentials":
          setIsEmailValid(false);
          setIsPasswordValid(false);
          setPasswordErrorMsg(
            "Login failed. Please ensure your email and password are correct."
          );
          break;
        default:
          setIsEmailValid(false);
          setIsPasswordValid(false);
          setPasswordErrorMsg("An unknown error occurred. Please try again.");
          break;
      }
    };

    event.preventDefault();

    try {
      const { result, error } = await signIn(email, password);

      if (error) {
        parseError(error as FirebaseError);
      } else if (result) {
        resetErrors();
        router.push("/dashboard");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setPasswordErrorMsg(errorMessage);
    }
  };

  function resetErrors() {
    setEmailErrorMsg("");
    setPasswordErrorMsg("");
    setIsEmailValid(true);
    setIsPasswordValid(true);
  }

  useEffect(() => resetErrors(), [email, password]);

  return (
    <Card className="p-8 max-w-sm">
      <Link
        href="/dashboard"
        color="foreground"
        className="w-full flex justify-center"
      >
        <Logo />
        <p className="font-bold text-inherit mx-2">Program Balancer</p>
      </Link>

      <CardHeader className="flex flex-col">
        <h1 className="text-2xl font-bold my-4">Sign In</h1>
        <Divider />
      </CardHeader>
      <CardBody>
        <ProviderButtons />
        <form onSubmit={handleForm} className="flex flex-col items-center">
          <Input
            fullWidth
            label="Email"
            type="email"
            value={email}
            onValueChange={setEmail}
            isInvalid={!isEmailValid}
            errorMessage={emailErrorMsg}
          />

          <Input
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!isPasswordValid}
            errorMessage={passwordErrorMsg}
            className="my-4"
          />

          <Button type="submit" color="primary">
            Sign In
          </Button>
        </form>
      </CardBody>
      <CardFooter className="flex flex-col text-center">
        <div className="flex">
          <p>New here?</p>
          <Link
            color="foreground"
            href="/register"
            className="ml-2 hover:underline"
          >
            Create an account
          </Link>
        </div>
        <Link
          color="foreground"
          href="/reset-password"
          className="hover:underline"
        >
          Forgot your password?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Login;
