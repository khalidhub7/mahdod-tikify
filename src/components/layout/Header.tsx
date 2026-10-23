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
      <div
        className="
        bg-background/75
        w-[95%] md:max-w-5xl h-[80%] px-[clamp(0.5rem,4vw,2.5rem)]
        
        flex items-center justify-between
        rounded-lg sm:rounded-tl-full sm:rounded-br-full
        shadow-brand-header-shadow
        "
      >
        <Brand className="whitespace-nowrap" />

        <SpotlightNavbar items={navLinks} className="hidden md:flex" />

        {/* settings */}
        <div className="rounded hidden md:flex items-center">
          <DarkModeToggle />
        </div>

        {/* MobileMenu */}
        <div className="flex md:hidden">
          <MobileMenu>
            {/* settings */}
            <div
              className="
            p-[clamp(0.5rem,3vw,1rem)]
            w-full rounded
            border-b-[clamp(1px,0.3vw,2px)]
            "
            >
              <DarkModeToggle />
            </div>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
};

export { Header };
