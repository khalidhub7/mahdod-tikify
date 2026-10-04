import { cn } from "@/lib/utils";
import { Brand } from "./Brand";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={cn(
        "flex items-center justify-center h-20 border-t",
        className,
      )}
    >
      <Brand />
    </footer>
  );
};

export { Footer };
