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
  hidden: {}, // for clarity
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
};

const MobileMenu = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant={"outline"}
            aria-label="Open menu"
            className="
            size-[clamp(2rem,8vw,2.25rem)] cursor-pointer rounded-full
            ring-4 ring-brand-ring
            ring-offset-2 ring-offset-background
            hover:text-purple-600
             "
          />
        }
      >
        <PanelLeftOpen className="size-[clamp(1.125rem,4.5vw,1.25rem)]" />
      </SheetTrigger>

      <SheetContent
        className="
        rounded items-center
        gap-[clamp(4rem,15vw,10rem)]
        m-[clamp(0.25rem,1.5vw,0.5rem)] p-[clamp(0.25rem,1.5vw,0.5rem)]
        
        [&>button]:size-[clamp(2.5rem,10vw,3rem)]
        [&>button]:static [&>button]:bg-accent
        [&>button]:rounded-full [&>button]:cursor-pointer
        [&>button]:ring-2 [&>button]:ring-brand-ring
        [&>button]:ring-offset-2 [&>button]:ring-offset-background
        [&>button]:hover:scale-110 [&>button]:transition-transform
        "
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <nav
          aria-label="Mobile navigation"
          className="mt-[clamp(4rem,15vw,6rem)] w-full"
        >
          <motion.ul
            variants={parentVariants}
            className="flex flex-col gap-[clamp(0.75rem,4vw,1.25rem)]"

            initial="hidden"
            animate="visible"
          >
            {navLinks.map((l) => {
              const Icon = l.icon;

              return (
                <motion.li key={l.href} variants={childVariants}>
                  <SheetClose
                    render={
                      <Link
                        href={l.href}
                        className="
                        p-[clamp(0.5rem,3vw,0.75rem)] mx-[clamp(0.5rem,3vw,0.75rem)]
                        text-[clamp(0.875rem,3.5vw,1rem)]
                        flex gap-[clamp(0.75rem,4vw,1.25rem)] items-center
                        rounded-md text-foreground
                        ring-2 ring-brand-ring
                        ring-offset-2 ring-offset-background
                        hover:bg-accent
                        "
                      />
                    }
                  >
                    <Icon className="size-[clamp(0.875rem,3.5vw,1rem)]" />
                    {l.label}
                    <ChevronRight
                      className="ml-auto size-[clamp(0.875rem,3.5vw,1.0625rem)]"
                      aria-hidden="true"
                    />
                  </SheetClose>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };
