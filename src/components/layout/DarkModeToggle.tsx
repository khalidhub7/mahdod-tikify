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
        "w-[calc(2*var(--toggle-k)+2*var(--toggle-l))]",
        "h-[calc(var(--toggle-k)+2*var(--toggle-l))]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute rounded-full bg-background",
          "left-(--toggle-l)",
          "size-(--toggle-k)",
          "transition-transform duration-200",
          isDark ? "translate-x-(--toggle-k)" : "translate-x-0",
        )}
      />
      <Sun
        aria-hidden="true"
        className={cn(
          "z-10 absolute",
          "w-[calc(var(--toggle-k)*0.75)] h-[calc(var(--toggle-k)*0.75)]",
          "top-1/2 -translate-y-1/2",
          "left-[calc(var(--toggle-l)+var(--toggle-k)/2-var(--toggle-k)*0.375)]",
          isDark ? "invisible" : "text-yellow-400",
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          "z-10 absolute",
          "w-[calc(var(--toggle-k)*0.75)] h-[calc(var(--toggle-k)*0.75)]",
          "top-1/2 -translate-y-1/2",
          "right-[calc(var(--toggle-l)+var(--toggle-k)/2-var(--toggle-k)*0.375)]",
          isDark ? "text-purple-400" : "invisible",
        )}
      />
    </button>
  );
};
