"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/shadcn/button";
import { Sheet } from "@/components/ui/shadcn/sheet";
import { LogIn, UserPlus, ChevronRight } from "lucide-react";
import { Menu, House, LayoutDashboard } from "lucide-react";
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
        <SheetTrigger asChild className="h-8 w-8">
          <Button
            size={"lg"}
            variant={"outline"}
            className="
            cursor-pointer rounded-full
            ring-4 ring-offset-2 ring-zinc-300
            hover:ring-offset-zinc-100
            hover:bg-zinc-200 hover:ring-zinc-100
            "
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        
        
        <SheetContent
          className="
          gap-40 items-center
          m-2 p-2 rounded-lg
          ring ring-offset-1 ring-zinc-800
          
          [&>button]:static
          [&>button]:ring-2 [&>button]:ring-offset-2 [&>button]:ring-zinc-100
          [&>button]:rounded-full [&>button]:cursor-pointer
          [&>button]:size-16 [&>button]:bg-accent
          [&>button]:hover:bg-muted [&>button]:hover:scale-75
          [&>button]:hover:ring-blue-400
          [&>button]:transition-all [&>button]:duration-300
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
                  <SheetClose asChild>
                    <Link
                      href={l.href}
                      className="
                      flex gap-5 items-center
                      rounded-full p-4 mx-4 text-base
                      text-muted-foreground
                      hover:bg-accent hover:text-accent-foreground

                      shadow-lg border border-blue-300
                      hover:scale-90
                      transition-all duration-200
                      "
                    >
                      {l.icon} {l.label}
                      <ChevronRight
                        className="ml-auto"
                        size={17}
                        aria-hidden="true"
                      />
                    </Link>
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
