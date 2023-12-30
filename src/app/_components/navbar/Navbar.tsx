"use client";

import React from "react";
import {
  Navbar as NavUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Autocomplete from "./Autocomplete";
import { useAuthContext } from "@/app/_providers/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Logo from "./Logo";
import { signOut } from "@/app/_firebase/auth/auth";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/_providers/GlobalContext";

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { resetData } = useGlobalContext();

  const handleLogout = () => {
    router.push("/login");
    signOut();
    resetData();
  };

  const iconClasses =
    "text-xl text-default-700 pointer-events-none flex-shrink-0";

  return (
    <NavUI shouldHideOnScroll className="mb-4">
      <NavbarBrand>
        <Link href="/dashboard" color="foreground">
          <Logo />
          <p className="font-bold text-inherit mx-2">Program Balancer</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 ml-8" justify="center">
        <NavbarItem>
          <Autocomplete />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {user ? (
          <NavbarItem>
            <Dropdown aria-label="Account Dropdown">
              <DropdownTrigger>
                <Button isIconOnly variant="light" aria-label="My Profile">
                  <AccountCircleIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu atria-label="Account Menu Dropdown">
                <DropdownItem
                  key="routines"
                  href="/routines"
                  startContent={<FitnessCenterIcon className={iconClasses} />}
                  atria-label="My Routines"
                >
                  My Routines
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  href="/profile"
                  startContent={<ManageAccountsIcon className={iconClasses} />}
                  atria-label="Edit Profile"
                >
                  Edit Profile
                </DropdownItem>
                <DropdownItem
                  startContent={<LogoutIcon className={iconClasses} />}
                  atria-label="Logout"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden mr-2 lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NavUI>
  );
}
