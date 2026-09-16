import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { DarkModeToggle } from "./DarkModeToggle";
import { SpotlightNavbar } from "@/components/ui/vengenceui/spotlight-navbar";

const navLinks = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Dashboard", href: "/dashboard" },
  { id: 3, label: "Login", href: "/login" },
  { id: 4, label: "Register", href: "/register" },
];

const Header = () => {
  return (
    <header className="flex items-center justify-center h-16">
      <div
        className="
        w-[95%] md:w-5xl h-[80%]
        flex items-center justify-evenly md:justify-around
        rounded-tl-full rounded-br-full
        shadow-brand-header-shadow
        transition-[width] duration-1000
        "
      >
        <Brand className="" />

        <SpotlightNavbar items={navLinks} className="hidden md:flex h-full" />

        {/* other settings */}
        <div
          className="
          flex justify-end items-center w-36 h-[80%] rounded
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
