"use client";
import { Brand } from "./Brand";
import { motion } from "motion/react";
import { MobileMenu } from "./MobileMenu";
import { RippleLink } from "../ui/magicui/ripple-link";
import { DarkModeToggle } from "./DarkModeToggle";

const navLinks = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Dashboard", href: "/dashboard" },
  { id: 3, label: "Login", href: "/login" },
  { id: 4, label: "Register", href: "/register" },
];

const MotionLink = motion.create(RippleLink);

const Header = () => {
  return (
    <header
      className="
      flex items-center justify-center h-16
      "
    >
      <div
        className="
        flex items-center justify-around
        w-[95%] md:w-5xl h-[80%]
        rounded-tl-full rounded-br-full
        shadow-[0_0_15px_rgba(0,0,0,0.5)]
        transition-[width] duration-1000
        "
      >
        <Brand/>

        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex gap-4">
            {navLinks.map((l) => {
              return (
                <li key={l.id}>
                  <MotionLink
                    href={l.href}
                    whileTap={{ scale: 0.9 }}
                    className="
                    w-24 p-1 text-sm shadow-sm
                    border-r-2 border-l-2 border-taupe-200 
                    hover:text-blue-600 hover:border-taupe-300
                    "
                    rippleColor="rgba(37,99,235,0.25)"
                  >
                    {l.label}
                  </MotionLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* other settings */}
        <div
          className="
          flex justify-center items-center
          w-36 h-[80%] rounded-full "
        >
          <DarkModeToggle/>
        </div>

        {/* MobileMenu */}
        <div
          className="
          md:hidden flex items-center justify-center
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