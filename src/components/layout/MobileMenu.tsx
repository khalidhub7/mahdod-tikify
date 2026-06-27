"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Sheet } from "@/components/ui/sheet";
import { LogIn, UserPlus, ChevronRight } from "lucide-react";
import { Ellipsis, House, LayoutDashboard } from "lucide-react";
import { SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

const listVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -20 },
};

// AnimatePresence
const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="h-10 w-10">
          <Button
            size={"lg"}
            variant={"outline"}
            className="
            cursor-pointer rounded-full
            ring-2 ring-offset-1 ring-mauve-200  text-gray-500
            hover:bg-mauve-50 hover:ring-mauve-50
            "
          >
            <Ellipsis className="size-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          className="
          flex items-center gap-40
          m-2 p-2 rounded-2xl
          ring-1 ring-offset-2 ring-blue-500
          
          [&>button]:static
          [&>button]:ring-4 [&>button]:ring-offset-2 [&>button]:ring-transparent
          [&>button]:rounded-full [&>button]:cursor-pointer
          [&>button]:size-16 [&>button]:bg-accent
          [&>button]:hover:bg-muted [&>button]:hover:scale-75
          [&>button]:hover:ring-fuchsia-200
          [&>button]:transition-all [&>button]:duration-300
          "
        >
          <nav className="mt-24 w-full">
            <motion.ul
              variants={listVariants}
              className="flex flex-col "
              initial="closed"
              animate={open ? "open" : "closed"}
            >
              {navLinks.map((l) => (
                <motion.li key={l.id} variants={itemVariants}>
                  <SheetClose asChild>
                    <Link
                      href={l.href}
                      className="
                      w-[90%]
                      flex gap-5 items-center
                      rounded-lg p-4 mx-4 text-base font-medium
                      text-muted-foreground
                      hover:bg-accent hover:text-accent-foreground
                      border-b border-r border-fuchsia-500
                      hover:shadow-lg hover:scale-90
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
