import { Children } from "@/types";
import React from "react";

export const Page: React.FC<Children> = ({ children }) => {
  return (
    <div
      className="overflow-scroll w-full overflow-x-hidden bg-white dark:bg-gray-800 text-black dark:text-white"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {children}
    </div>
  );
};
