"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export const DarkModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"

      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
      isolate
      flex items-center justify-evenly
      relative w-14 h-7 rounded-full cursor-pointer
      bg-zinc-200 dark:bg-gray-600
      focus-visible:scale-90
      "

      whileHover={{ scale: 0.9 }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute left-0.5 size-6 rounded-full bg-background"
        animate={{ x: isDark ? 26 : 2 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      <Sun
        aria-hidden="true"
        size={16}
        className={`z-10 ${isDark ? "invisible" : "text-yellow-500"}`}
      />
      <Moon
        aria-hidden="true"
        size={16}
        className={`z-10 ${isDark ? "text-purple-500" : "invisible"}`}
      />
    </motion.button>
  );
};
