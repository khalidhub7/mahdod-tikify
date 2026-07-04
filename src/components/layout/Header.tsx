"use client";
import { Brand } from "./Brand";
import { motion } from "motion/react";
import { MobileMenu } from "./MobileMenu";
import { RippleLink } from "../ui/magicui/ripple-link";

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
      flex items-center justify-center
      h-16
      "
    >
      <div
        className="
        flex items-center justify-between
        pl-12 md:pr-40
        w-[95%] md:w-5xl h-[80%]
        rounded-tl-full rounded-br-full
        shadow-[0_0_15px_rgba(0,0,0,0.5)]
        transition-[width] duration-300
        "
      >
        <Brand className="" />

        <nav
          className="
          hidden md:flex items-center h-[90%]
          "
          aria-label="Main navigation"
        >
          <ul
            className="
          flex list-none gap-3
          "
          >
            {navLinks.map((l) => {
              return (
                <li key={l.id}>
                  <MotionLink
                    href={l.href}
                    whileTap={{ scale: 0.9 }}
                    rippleColor="rgba(37,99,235,0.3)"
                    className="
                flex items-center justify-center
                w-24 p-1 rounded-lg
                bg-zinc-50 text-sm 
                hover:ring-1 hover:ring-offset-1 hover:font-bold
                hover:bg-zinc-100 hover:ring-taupe-300 hover:text-blue-400
                shadow-lg
                "
                  >
                    {l.label}
                  </MotionLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          className="
        md:hidden flex items-center justify-center 
        h-full aspect-square mr-10
        "
        >
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export { Header };
