import React from "react";
import { Progress } from "@nextui-org/react";

export default function LoadingWidget() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col gap-6 w-full max-w-md text-white p-12">
        <Progress size="lg" isIndeterminate label="Loading..." />
      </div>
    </div>
  );
}
