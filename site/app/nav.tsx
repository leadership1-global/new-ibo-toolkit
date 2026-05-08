"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
      <Link
        href={href}
        className={`transition-colors ${
          isActive
            ? "text-blue-300 font-semibold border-b-2 border-blue-300 pb-1"
            : "hover:text-blue-300"
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-6">
        <NavLink href="/">IBO Roadmap</NavLink>
        <NavLink href="/books">Recommended Books</NavLink>
        <NavLink href="/habits">Habits</NavLink>
        <NavLink href="/phases">Phases</NavLink>
        <NavLink href="/core-run">Daily Core Run</NavLink>
      </div>
    </nav>
  );
}
