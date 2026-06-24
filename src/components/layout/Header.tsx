import Link from "next/link";
import { Brand } from "./Brand";

const navLinks = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Dashboard", href: "/dashboard" },
  { id: 3, label: "Login", href: "/login" },
  { id: 4, label: "Register", href: "/register" },
];

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
        w-[90%] max-w-5xl h-[80%]
        rounded-tl-full rounded-br-full
        shadow-[0_0_15px_rgba(59,130,246,0.5)]
        "
      >
        <Brand className="ml-8" />

        <nav className="">
          <ul className="flex list-none gap-10">
            {navLinks.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.href}
                  className="
                  shadow-[0_0_25px_var(--color-taupe-200)]
                  p-2
                  rounded-full
                  text-black-500 text-md
                  "
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* other options to add later like dark mode switch */}
        <div></div>
        {/* empty now */}
      </div>
    </header>
  );
};

export { Header };
