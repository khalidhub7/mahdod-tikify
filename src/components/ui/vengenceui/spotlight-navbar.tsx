// from https://www.vengenceui.com/
// refactored by me

"use client";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion, useMotionValue } from "motion/react";
import { type MouseEvent, type CSSProperties } from "react";


type NavItem = { id: number; label: string; href: string };
type SpotlightNavbarProps = { items: NavItem[]; className?: string };

const SpotlightNavbar = ({ items, className }: SpotlightNavbarProps) => {
  // nextJs logic
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // ref
  const navRef = useRef<HTMLElement>(null);
  const navRect = useRef<DOMRect | null>(null);

  // motion value
  const spotX = useMotionValue("0px");
  const spotY = useMotionValue("0px");

  const handleMouseEnter = () => {
    // cache the nav rect
    navRect.current = navRef.current?.getBoundingClientRect() ?? null;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!navRect.current) return;

    // get mouse x, y inside nav
    const x = e.clientX - navRect.current.left;
    const y = e.clientY - navRect.current.top;

    spotX.set(`${x}px`);
    spotY.set(`${y}px`);
  };

  const handleMouseLeave = () => {
    navRect.current = null;
  };

  return (
    <nav
      ref={navRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}

      className={cn(
        "spotlight-nav isolate group",
        "h-11 rounded-full overflow-hidden relative",
        className,
      )}
    >
      {/* Content */}
      <ul className={cn("h-full px-5 flex gap-1 z-30 relative")}>
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.id} className={cn("relative flex items-center")}>
              <Link
                href={item.href}
                className={cn(
                  "p-1 w-24 text-sm text-center font-medium rounded-full ",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",

                  active
                    ? "text-foreground"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white ",
                )}
              >
                {item.label}
              </Link>
              {/* ambience layer */}
              {active ? (
                <motion.div
                  layoutId="active-tab"
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}

                  className="w-full h-0.5 pointer-events-none absolute bottom-0 z-20"
                  style={{
                    background: `
                  radial-gradient(
                    50px circle at 50% 50%,
                    var(--ambience-color, rgba(0, 0, 0, 1)) 10%,
                    transparent 100%
                  )
                  `,
                  }}
                  aria-hidden="true"
                />
              ) : undefined}
            </li>
          );
        })}
      </ul>

      {/* spotlight layer */}
      <motion.div
        className={cn(
          "z-10 inset-0",
          "pointer-events-none absolute",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300",
        )}
        aria-hidden="true"
        style={
          {
            "--spotlight-x": spotX,
            "--spotlight-y": spotY,
            background: `
            radial-gradient(
              90px circle at var(--spotlight-x) var(--spotlight-y),
              var(--spotlight-color, rgba(0, 0, 0, 0.1)) 0%,
              transparent 50%
            )
            `,
          } as CSSProperties
        }
      />
    </nav>
  );
};

export { SpotlightNavbar };
