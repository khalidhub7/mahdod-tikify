import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { DarkModeToggle } from "./DarkModeToggle";
import { SpotlightNavbar } from "@/components/ui/vengenceui/spotlight-navbar";
import { cn } from "@/lib/utils";

const navLinks = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Dashboard", href: "/dashboard" },
  { id: 3, label: "Login", href: "/login" },
  { id: 4, label: "Register", href: "/register" },
];

const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        "sticky top-0",
        "flex items-center justify-center h-[clamp(3rem,10vw,4rem)]",
        className,
      )}
    >
      {/* rounded-tl-full rounded-br-full */}
      <div
        className="
        w-[95%] md:max-w-5xl h-[80%] px-[clamp(0.5rem,4vw,2.5rem)]
        
        flex items-center justify-between
        rounded
        shadow-brand-header-shadow
        transition-[width] duration-1000
        "
      >
        <Brand className="whitespace-nowrap" />

        <SpotlightNavbar items={navLinks} className="hidden md:flex" />

        {/* settings */}
        <div
          className="
          flex justify-end items-center h-[80%] rounded
          "
        >
          <DarkModeToggle />
        </div>

        {/* MobileMenu */}
        <div
          className="
          flex items-center justify-center md:hidden
          h-full aspect-square 
          "
        >
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export { Header };
