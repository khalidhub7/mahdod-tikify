import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // sync with system preference & localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggle}
      className="
      flex items-center justify-evenly
      relative w-14 h-6 rounded-full cursor-pointer
      bg-zinc-200 dark:bg-gray-600
      focus-visible:brightness-90
      "
    >
      {/* sliding thumb */}
      <div
        className={cn(
          "absolute left-0.5 size-5 rounded-full",
          "bg-white dark:bg-gray-900",
          "transition-transform duration-500 ease-out",
          isDark ? "translate-x-7" : "translate-x-1",
        )}
      />

      {/* sun icon */}
      <Sun
        size={16}
        className={cn(
          "z-10 transition-opacity duration-300",
          isDark ? "text-gray-400" : "text-yellow-500",
        )}
      />

      {/* moon icon */}
      <Moon
        size={16}
        className={cn(
          "z-10 transition-opacity duration-300",
          isDark ? "text-purple-300" : "opacity-30 text-purple-600",
        )}
      />
    </button>
  );
};

export { DarkModeToggle };
