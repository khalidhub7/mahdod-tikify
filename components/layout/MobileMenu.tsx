"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Ellipsis, ChevronRight } from "lucide-react";

const navLinks = [
  { id: 1, href: "/dashboard", label: "Dashboard" },
  { id: 2, href: "#about", label: "About" },
];

const authLinks = [
  { id: 3, href: "/login", label: "Login" },
  { id: 4, href: "/register", label: "Register" },
];

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-controls="mobile-menu"
            className="
              absolute right-16 -translate-y-1/2
              size-10 cursor-pointer
              hover:scale-105 transition-transform duration-200
            "
          >
            <Ellipsis size={22} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[90vw] max-w-xs mr-2 mt-2 md:hidden"
          id="mobile-menu"
        >
          <DropdownMenuGroup className="flex flex-col gap-2 p-2 ">
            <DropdownMenuLabel className="text-sm text-center">
              Guest
            </DropdownMenuLabel>

            {navLinks.map((l) => (
              <DropdownMenuItem
                className="px-5 py-2 shadow-(--shadow-brand) mb-2"
                key={l.id}
              >
                <Link href={l.href} className="flex items-center gap-2 w-full">
                  <ChevronRight size={10} />
                  <span>{l.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup className="flex flex-col gap-2 p-2">
            {authLinks.map((l) => (
              <DropdownMenuItem
                className="px-5 py-2 shadow-(--shadow-brand) mb-2"
                key={l.id}
              >
                <Link href={l.href} className="flex items-center gap-2 w-full">
                  <ChevronRight size={10} />
                  <span>{l.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { MobileMenu };
