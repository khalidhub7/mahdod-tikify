import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

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
      relative w-14 h-6 rounded-lg cursor-pointer
      bg-zinc-200 dark:bg-gray-600
      focus-visible:brightness-90
      "
    >
      {/* sliding thumb */}
      <div
        className={`
          absolute top-0.5 left-0.5
          size-5 rounded-full
          bg-white dark:bg-gray-900
          transition-transform duration-500 ease-out
          ${isDark ? "translate-x-7.5" : "translate-x-0.5"}
        `}
      />

      {/* sun icon */}
      <Sun
        size={16}
        className={`
          absolute left-1.5 top-1/2 -translate-y-1/2
          transition-opacity duration-300
          ${isDark ? "opacity-30 text-gray-400" : "opacity-100 text-yellow-500"}
        `}
      />

      {/* moon icon */}
      <Moon
        size={16}
        className={`
          absolute right-1.5 top-1/2 -translate-y-1/2
          transition-opacity duration-300
          ${isDark ? "opacity-100 text-purple-300" : "opacity-30 text-purple-600"}
        `}
      />
    </button>
  );
};

export { DarkModeToggle };
