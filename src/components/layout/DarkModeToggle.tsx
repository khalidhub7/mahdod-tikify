import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

const DarkModeToggle = () => {
  const onClickHandler = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <Button
      variant={"secondary"}
      className="
      h-6
      relative flex gap-2 cursor-pointer
      rounded-full p-1
      bg-zinc-200 dark:bg-gray-600
    "

      onClick={onClickHandler}
    >
      <Sun size={20} className="text-yellow-300" />
      <Moon
        size={20}
        className="text-purple-600 fill-purple-600 stroke-purple-600"
      />
      <div
        className="
        h-4 aspect-square rounded-full absolute
        bg-olive-400
        
        -translate-x-3 dark:translate-x-3

        transition-all duration-700
        "
      ></div>
    </Button>
  );
};

export { DarkModeToggle };