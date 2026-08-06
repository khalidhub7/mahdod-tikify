"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Sheet } from "@/components/ui/shadcn/sheet";
import { Button } from "@/components/ui/shadcn/button";
import { House, LayoutDashboard, PanelLeftOpen } from "lucide-react";
import { LogIn, UserPlus, ChevronRight } from "lucide-react";
import {
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";

// learn later: AnimatePresence

const navLinks = [
  { id: 1, label: "Home", href: "/", icon: <House className="size-4" /> },
  {
    id: 2,
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="size-4" />,
  },
  { id: 3, label: "Login", href: "/login", icon: <LogIn className="size-4" /> },
  {
    id: 4,
    label: "Register",
    href: "/register",
    icon: <UserPlus className="size-4" />,
  },
];

// Exit animation isn't used because Sheet handles unmounting internally.
const listVariants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
  closed: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
};
const itemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 10 },
};

// AnimatePresence
const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              size={"lg"}
              variant={"outline"}
              className="
              ring-4 ring-brand-ring
              ring-offset-2 ring-offset-background
              size-8 cursor-pointer rounded-full
              hover:text-purple-600
              "
            />
          }
        >
          <PanelLeftOpen className="size-5" />
        </SheetTrigger>

        <SheetContent
          className="
          m-2 p-2 rounded gap-40 items-center

          [&>button]:static
          [&>button]:ring-4 [&>button]:ring-brand-ring
          [&>button]:ring-offset-2 [&>button]:ring-offset-background
          [&>button]:rounded-2xl [&>button]:cursor-pointer
          [&>button]:size-14 [&>button]:bg-accent
          [&>button]:hover:scale-90
          "
        >
          <nav className="mt-24 w-full">
            <motion.ul
              variants={listVariants}
              className="flex flex-col gap-5"
              initial="closed"
              animate={open ? "open" : "closed"}
            >
              {navLinks.map((l) => (
                <motion.li key={l.id} variants={itemVariants}>
                  <SheetClose
                    render={
                      <Link
                        href={l.href}
                        className="
                        flex gap-5 items-center shadow-lg 

                        rounded-xl p-3 mx-4 text-base text-foreground

                        ring-4 ring-brand-ring
                        ring-offset-2 ring-offset-background
                     
                        hover:scale-90 hover:bg-accent
                        transition-transform duration-500
                        transform-gpu
                        "
                      />
                    }
                  >
                    {l.icon} {l.label}
                    <ChevronRight
                      className="ml-auto"
                      size={17}
                      aria-hidden="true"
                    />
                  </SheetClose>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { MobileMenu };
