"use client";

import Head from "next/head";
import React from "react";

import Profile from "@/app/_components/auth/EditProfile";
import Navbar from "@/app/_components/navbar/Navbar";

const ProfilePage = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Head>
        <title>Profile</title>
      </Head>
      <Navbar />
      <Profile />
    </div>
  );
};

export default ProfilePage;
