"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"

      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex items-center",
        "bg-zinc-200 dark:bg-gray-600",
        "isolate relative rounded-full cursor-pointer",
        "w-[calc(2*clamp(1.25rem,3.5vw,1.5rem)+2*clamp(0.125rem,0.5vw,0.25rem))]",
        "h-[calc(clamp(1.25rem,3.5vw,1.5rem)+2*clamp(0.125rem,0.5vw,0.25rem))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute rounded-full bg-background",
          "left-[clamp(0.125rem,0.5vw,0.25rem)]",
          "size-[clamp(1.25rem,3.5vw,1.5rem)]",
          "transition-transform duration-200",
          isDark
            ? "translate-x-[clamp(1.25rem,3.5vw,1.5rem)]"
            : "translate-x-0",
        )}
      />
      <Sun
        aria-hidden="true"
        className={cn(
          "z-10 absolute",
          "w-[clamp(0.75rem,2.5vw,1rem)] h-[clamp(0.75rem,2.5vw,1rem)]",
          "top-1/2 -translate-y-1/2",
          "left-[calc(clamp(0.125rem,0.5vw,0.25rem)+clamp(1.25rem,3.5vw,1.5rem)/2-clamp(0.75rem,2.5vw,1rem)/2)]",
          isDark ? "invisible" : "text-yellow-400",
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          "z-10 absolute",
          "w-[clamp(0.75rem,2.5vw,1rem)] h-[clamp(0.75rem,2.5vw,1rem)]",
          "top-1/2 -translate-y-1/2",
          "right-[calc(clamp(0.125rem,0.5vw,0.25rem)+clamp(1.25rem,3.5vw,1.5rem)/2-clamp(0.75rem,2.5vw,1rem)/2)]",
          isDark ? "text-purple-400" : "invisible",
        )}
      />
    </button>
  );
};
