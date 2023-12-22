"use client";

import { useState } from "react";
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/_firebase/config";

const PasswordResetComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function isValidEmail(email: string) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handleResetPassword = async () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Check your email to reset your password.");
      })
      .catch((error) => {
        setError(
          "Failed to send password reset email. Please check the email provided."
        );
      });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <h1>Reset Password</h1>
      </CardHeader>
      <Divider className="mb-2" />
      <CardBody>
        <Input
          isClearable
          variant="bordered"
          fullWidth
          color="primary"
          size="lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={error}
        />
      </CardBody>

      <CardFooter className="flex flex-col">
        <div className="mb-2">
          <Button
            variant="ghost"
            className="mr-2"
            onClick={() => router.push("/login")}
          >
            Cancel
          </Button>
          <Button
            isDisabled={!isValidEmail(email)}
            color="primary"
            onClick={handleResetPassword}
          >
            Send Email
          </Button>
        </div>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </CardFooter>
    </Card>
  );
};

export default PasswordResetComponent;
