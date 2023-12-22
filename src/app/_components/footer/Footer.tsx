"use client";

import { Link } from "@nextui-org/react";
import DonateButton from "./DonateButton";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const GradientAnimation = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <motion.div
        className="relative flex items-center text-3xl font-bold"
        initial={{ "--gradientPos": "0%" } as any}
        whileHover={
          {
            "--gradientPos": "100%",
          } as any
        }
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        style={
          {
            background: "linear-gradient(to right, #54c3cd 0%, #b2529b 100%)",
            backgroundSize: "150% 100%",
            backgroundPositionX: "var(--gradientPos)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            "--gradientPos": "100%",
          } as any
        }
      >
        {children}
      </motion.div>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="flex w-full border-t-2 border-solid border-dark font-medium text-lg sm:text-base py-8 px-4 mt-8 flex-col items-center justify-center">
      {/* Donation Button */}
      <div className="m-4">
        <DonateButton />
      </div>

      <div className="flex flex-col w-2/3 md:flex-row justify-between items-center">
        {/* Life Nexus Link */}
        <div className="flex flex-col items-center m-4 md:m-0">
          <div className="flex flex-col items-center justify-center text-center">
            Powered by <span className="px-1"></span>
            <div className="flex items-center pt-1 lg:pt-0">
              <Link
                href="https://life-nexus.netflify.app"
                target={"_blank"}
                className="relative flex items-center text-3xl font-bold"
                style={{
                  background:
                    "linear-gradient(to right, #54c3cd 0%, #b2529b 100%)",
                  backgroundSize: "150% 100%",
                  backgroundPositionX: "var(--gradientPos)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <GradientAnimation>Life Nexus</GradientAnimation>
              </Link>
            </div>
          </div>
        </div>
        {/* Porfolio Link */}
        <div className="m-4">
          <Link
            className="flex justify-center text-center"
            href="https://jaron-s.netlify.app/contact"
            target={"_blank"}
            color={"foreground"}
          >
            Say Hello {"\u{1F44B}\u{1F3FB}"}
          </Link>
        </div>
      </div>

      {/* Copyright, Privacy & Terms */}
      <div className="flex flex-col w-full h-full justify-between items-center my-4 md:my-6 lg:my-8">
        <div className="flex flex-col w-full items-center gap-4 sm:w-1/3">
          <Typography>
            {new Date().getFullYear()} &copy; All Rights Reserved
          </Typography>
          <div className="flex w-full justify-center gap-4">
            <Link
              href="/privacy"
              size="sm"
              color="foreground"
              className="font-normal"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              size="sm"
              color="foreground"
              className="font-normal"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
