"use client";

import React from "react";
import { AuthContextProvider } from "./AuthContext";
import { GlobalContextProvider } from "./GlobalContext";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProvidersWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AuthContextProvider>
      <GlobalContextProvider>
        <NextUIProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ position: "absolute", top: 0, right: 0, zIndex: 9999 }}
          />
          {children}
        </NextUIProvider>
      </GlobalContextProvider>
    </AuthContextProvider>
  );
};

export default ProvidersWrapper;
