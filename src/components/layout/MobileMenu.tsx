"use client";
import Link from "next/link";
import { Sheet } from "@/components/ui/shadcn/sheet";
import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/shadcn/button";
import { LogIn, UserPlus, ChevronRight } from "lucide-react";
import { House, LayoutDashboard, PanelLeftOpen } from "lucide-react";
import { SheetClose, SheetContent } from "@/components/ui/shadcn/sheet";
import { SheetTrigger, SheetTitle } from "@/components/ui/shadcn/sheet";

const navLinks = [
  { label: "Home", href: "/", icon: House },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Login", href: "/login", icon: LogIn },
  { label: "Register", href: "/register", icon: UserPlus },
];

// exit animation isn't used because Sheet handles unmounting internally
// don't try to use AnimatePresence in shadcn comps

const parentVariants: Variants = {
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.5, when: false },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            size={"lg"}
            variant={"outline"}
            aria-label="Open menu"
            className="
            ring-4 ring-brand-ring ring-offset-2 ring-offset-background
            size-8 cursor-pointer rounded-full hover:text-purple-600
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
        [&>button]:ring-2 [&>button]:ring-brand-ring
        [&>button]:ring-offset-2 [&>button]:ring-offset-background
        [&>button]:rounded-full [&>button]:cursor-pointer
        [&>button]:size-12 [&>button]:bg-accent
        [&>button]:hover:scale-90
        "
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav aria-label="Mobile navigation" className="mt-24 w-full">
          <motion.ul
            variants={parentVariants}
            className="flex flex-col gap-5"

            initial="hidden"
            animate="visible"
          >
            {navLinks.map((l) => {
              const Icon = l.icon;

              return (
                <motion.li
                  key={l.href}
                  variants={childVariants}
                  whileHover={{ scale: 0.9 }}
                >
                  <SheetClose
                    render={
                      <Link
                        href={l.href}
                        className="
                        flex gap-5 items-center

                        rounded-md p-3 mx-3 text-base text-foreground
                        ring-2 ring-brand-ring ring-offset-2 ring-offset-background
                        hover:bg-accent
                        "
                      />
                    }
                  >
                    <Icon className="size-4" /> {l.label}
                    <ChevronRight
                      className="ml-auto"
                      size={17}
                      aria-hidden="true"
                    />
                  </SheetClose>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };
