"use client";

import { useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Heart } from "lucide-react";

export const KiNav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={
        "px-6 py-4 flex items-center h-16 z-50 bg-transparent absolute top-0 left-0 right-0"
      }
    >
      <div className="flex items-center">
        <span className="text-white text-2xl font-thin tracking-widest">Ki</span>
      </div>
      <div className={"ml-auto flex items-center gap-3"}>
        <Button
          variant={"ghost"}
          className={"flex items-center gap-1.5 text-white hover:bg-white/20"}
        >
          <span>
            <Heart className={"size-4"} />
          </span>
          <span>About Ki</span>
        </Button>
        <Button
          onClick={toggleDark}
          variant={"ghost"}
          className={"flex items-center gap-1.5 text-white hover:bg-white/20"}
        >
          <span>
            {isDarkMode ? (
              <Sun className={"size-4"} />
            ) : (
              <Moon className={"size-4"} />
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default KiNav;
