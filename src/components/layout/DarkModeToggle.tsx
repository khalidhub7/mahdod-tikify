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
      relative flex gap-2 cursor-pointer
      rounded-full p-1
      bg-zinc-200
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
        h-5 aspect-square rounded-full absolute
        bg-olive-50
        left-1 dark:inset-x-auto dark:right-1
        transition-all duration-1000
        "
      ></div>
    </Button>
  );
};

export { DarkModeToggle };
