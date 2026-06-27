"use client";
import Link from "next/link";
import { Brand } from "./Brand";
import { motion } from "motion/react";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Dashboard", href: "/dashboard" },
  { id: 3, label: "Login", href: "/login" },
  { id: 4, label: "Register", href: "/register" },
];

const MotionLink = motion.create(Link);

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
        shadow-[0_0_15px_rgba(59,130,246,0.5)]
        transition-[width] duration-300
        "
      >
        <Brand className="" />

        <nav className="hidden md:block" aria-label="Main navigation">
          <ul
            className="
          flex list-none gap-3
          "
          >
            {navLinks.map((l) => (
              <li key={l.id}>
                <MotionLink
                  href={l.href}
                  whileTap={{ scale: 0.8 }}
                  className="
                flex items-center justify-center
                w-24 p-1
                rounded-lg
                ring-2 ring-offest-2 ring-transparent
                bg-zinc-50 text-sm text-taupe-700 shadow-lg
                hover:bg-zinc-200 hover:ring-blue-200
                transition-colors duration-300
                "
                >
                  {l.label}
                </MotionLink>
              </li>
            ))}
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
