import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Black_Ops_One } from "next/font/google";

const blackOps = Black_Ops_One({
  subsets: ["latin"],
  weight: "400",
});

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "#about", label: "About" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

const Header = () => {
  return (
    <header className="flex items-center justify-center h-16">
      <div
        className="
        relative
        flex items-center justify-between
        w-[95%] max-w-6xl
        h-[80%] md:h-3/4
        pl-16 pr-56
        rounded-tl-full rounded-br-full
        bg-stone-100
        shadow-(--shadow-brand)
        "
      >
        <Link href="/" aria-label="Home" className=" flex items-center gap-3">
          <Avatar
            className="
            rounded-full
            outline-4 outline-zinc-300
            hover:opacity-75
            hover:scale-110 transition-transform duration-200
            "
          >
            <AvatarImage src="/avatar.png" alt="Logo" />
            <AvatarFallback>av</AvatarFallback>
          </Avatar>

          <span
            className={cn(
              "text-blue-500 text-sm sm:text-base md:text-lg",
              blackOps.className,
            )}
          >
            mahdod tikify
          </span>
        </Link>

        <nav className="flex items-center">
          <ul className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    inter.className,
                    "rounded-full p-2 text-sm text-neutral-500",
                    "outline-4 outline-transparent",
                    "hover:bg-neutral-400 hover:outline-neutral-300 hover:text-white",
                    "transition-colors duration-300",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <MobileMenu />
        </nav>
      </div>
    </header>
  );
};

export { Header };
