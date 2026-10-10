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
            size-[clamp(1.5rem,4.3vw,2.25rem)] cursor-pointer rounded-full
            ring-[clamp(0.125rem,1vw,0.25rem)] ring-brand-ring
            ring-offset-2 ring-offset-background
            hover:text-purple-600
             "
          />
        }
      >
        <PanelLeftOpen className="size-[clamp(0.875rem,4.5vw,1.25rem)]" />
      </SheetTrigger>

      <SheetContent
        className="
        rounded items-center
        gap-[clamp(2rem,15vw,10rem)]
        m-[clamp(0.125rem,1.5vw,0.5rem)] p-[clamp(0.125rem,1.5vw,0.5rem)]
        "
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        {children}
        
        <nav
          aria-label="Mobile navigation"
          className="w-full"
        >
          <motion.ul
            variants={parentVariants}
            className="flex flex-col gap-[clamp(0.5rem,2.625vw,0.75rem)]"

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
                        px-[clamp(0.5rem,2.625vw,0.75rem)] py-[clamp(0.375rem,1.75vw,0.5rem)] mx-[clamp(0.375rem,1.75vw,0.5rem)]
                        text-[clamp(0.75rem,3.5vw,1rem)]
                        flex gap-[clamp(0.5rem,2.625vw,0.75rem)] items-center

                        rounded-full text-foreground
                        ring-2 ring-brand-ring
                        ring-offset-2 ring-offset-background
                        hover:bg-accent
                        "
                      />
                    }
                  >
                    <Icon className="size-[clamp(0.75rem,3.5vw,1rem)]" />
                    {l.label}
                    <ChevronRight
                      className="ml-auto size-[clamp(0.75rem,3.5vw,1rem)]"
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
