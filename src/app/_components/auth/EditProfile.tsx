"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { LockResetOutlined, DeleteForeverOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteAccountModal } from "../modals/delete/DeleteAccountModal";
import { useAuthContext } from "@/app/_providers/AuthContext";
import { changeUserPassword } from "@/app/_firebase/auth/auth";
import ConfirmationMessage from "./ConfirmationMessage";

const Profile = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  // new password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPasswordMsg, setCurrentPasswordMsg] = useState("");
  const [newPasswordMsg, setNewPasswordMsg] = useState("");
  const [confirmNewPasswordMsg, setConfirmNewPasswordMsg] = useState("");
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(true);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
  const [isConfirmNewPasswordValid, setIsConfirmNewPasswordValid] =
    useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const cancelChanges = () => {
    if (isChangePasswordOpen) setIsChangePasswordOpen(false);
    else router.push("/dashboard");
  };

  const validateInputs = (): boolean => {
    let isValid = true;

    // Validate current password
    if (!currentPassword) {
      setCurrentPasswordMsg("Current password is required");
      setIsCurrentPasswordValid(false);
      isValid = false;
    } else {
      setCurrentPasswordMsg("");
      setIsCurrentPasswordValid(true);
    }

    // Validate new password
    if (!newPassword) {
      setNewPasswordMsg("New password is required");
      setIsNewPasswordValid(false);
      isValid = false;
    } else {
      setNewPasswordMsg("");
      setIsNewPasswordValid(true);
    }

    // Check if new password and confirm new password match
    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordMsg("Passwords do not match");
      setIsConfirmNewPasswordValid(false);
      isValid = false;
    } else {
      setConfirmNewPasswordMsg("");
      setIsConfirmNewPasswordValid(true);
    }

    return isValid;
  };

  const saveChanges = async () => {
    // Reset validation messages
    setCurrentPasswordMsg("");
    setNewPasswordMsg("");
    setConfirmNewPasswordMsg("");

    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    if (user) {
      const result = await changeUserPassword(
        user,
        currentPassword,
        newPassword
      );

      if (result.success) {
        // Handle successful password change
        setShowConfirmation(true);
        setIsChangePasswordOpen(false);
      } else {
        console.error("Failed to change password:", result.error);

        // Specific error handling
        switch (result.code) {
          case "auth/wrong-password":
            setCurrentPasswordMsg("Password is incorrect.");
            setIsCurrentPasswordValid(false);
            break;
          // Handle other specific Firebase error codes here if needed
          default:
            console.error("An unknown error occurred.");
        }
      }
    } else {
      // Handle case where there is no current user
      console.error("No user is currently logged in");
    }
  };

  const resetErrors = () => {
    setCurrentPasswordMsg("");
    setNewPasswordMsg("");
    setConfirmNewPasswordMsg("");
    setIsCurrentPasswordValid(true);
    setIsNewPasswordValid(true);
    setIsConfirmNewPasswordValid(true);
  };

  useEffect(
    () => resetErrors(),
    [currentPassword, newPassword, confirmNewPassword]
  );

  return (
    user && (
      <>
        <Card className="m-12">
          <CardHeader>Edit Profile</CardHeader>
          <Divider />
          <CardBody>
            <h3 className="m-2 mb-5">{user.email}</h3>
            {!isChangePasswordOpen ? (
              <>
                <Button
                  onClick={() => setIsChangePasswordOpen(true)}
                  startContent={<LockResetOutlined />}
                >
                  Change Password
                </Button>
                <Button
                  startContent={<DeleteForeverOutlined />}
                  color="danger"
                  variant="ghost"
                  className="mt-2"
                  onClick={() => setShowDeleteAccountModal(true)}
                >
                  Delete Account
                </Button>
              </>
            ) : (
              <div>
                <Input
                  label="Current Password"
                  type="password"
                  className="my-2"
                  onValueChange={setCurrentPassword}
                  isInvalid={!isCurrentPasswordValid}
                  errorMessage={currentPasswordMsg}
                ></Input>
                <Input
                  label="New Password"
                  type="password"
                  className="my-2"
                  onValueChange={setNewPassword}
                  isInvalid={!isNewPasswordValid}
                  errorMessage={newPasswordMsg}
                ></Input>
                <Input
                  label="Confirm New Password"
                  type="password"
                  className="my-2"
                  onValueChange={setConfirmNewPassword}
                  isInvalid={!isConfirmNewPasswordValid}
                  errorMessage={confirmNewPasswordMsg}
                ></Input>
              </div>
            )}
          </CardBody>
          <Divider />
          <CardFooter className="justify-end">
            <Button className="mx-2" onClick={cancelChanges} variant="solid">
              Cancel
            </Button>
            <Button
              onClick={saveChanges}
              color="primary"
              isDisabled={
                currentPassword === "" ||
                newPassword === "" ||
                confirmNewPassword === ""
              }
            >
              Save
            </Button>
          </CardFooter>
        </Card>
        <DeleteAccountModal
          isOpen={showDeleteAccountModal}
          onClose={() => setShowDeleteAccountModal(false)}
        />
        <ConfirmationMessage
          message="Password changed successfully!"
          isVisible={showConfirmation}
          onClose={() => setShowConfirmation(false)}
        />
      </>
    )
  );
};

export default Profile;
