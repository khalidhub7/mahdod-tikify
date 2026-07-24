import { Button } from "@/components/ui/shadcn/button";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const onClickHandler = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <Button
      variant={"secondary"}
      className="
      relative flex gap-2 cursor-pointer
      rounded-full p-1
      ring-1 ring-offset-1 ring-brand-ring
    "

      onClick={onClickHandler}
    >
      <Sun size={20} className="text-yellow-300" />
      <Moon
        size={20}
        className="
        text-purple-600 fill-purple-600 stroke-purple-600
        "
      />
      <div
        className="
      h-4 aspect-square rounded-full bg-blue-600 absolute
      left-1 dark:inset-x-auto dark:right-1
      transition-all duration-300
      "
      ></div>
    </Button>
  );
};

export { DarkModeToggle };
