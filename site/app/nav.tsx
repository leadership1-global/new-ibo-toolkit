"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/welcome", label: "Welcome" },
  { href: "/habits", label: "Habits" },
  { href: "/phases", label: "Phases" },
  { href: "/books", label: "Books" },
  { href: "/core", label: "Core" },
  { href: "/income", label: "Income Calculator" },
  { href: "/checklist", label: "Checklist" },
];

type NavigationProps = {
  children: React.ReactNode;
};

export function Navigation({ children }: NavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className={`rounded-full px-4 py-2 text-2xl font-medium transition-colors duration-200 ${isActive
          ? "bg-slate-900 text-white shadow-sm shadow-slate-900/20 dark:bg-slate-100 dark:text-slate-900 dark:shadow-slate-100/20"
          : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 hover:shadow-md dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
          }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.14),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.14),_transparent_32%),linear-gradient(180deg,_#0f172a_0%,_#1e1b4b_100%)]">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 dark:border-slate-800/80 dark:bg-slate-900/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open navigation menu"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 shadow-sm transition hover:-translate-y-px hover:shadow-md"
            >
              <span className="relative block h-5 w-5">
                <span className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-slate-900 dark:bg-slate-100" />
                <span className="absolute left-0 top-2 h-0.5 w-5 rounded-full bg-slate-900 dark:bg-slate-100" />
                <span className="absolute left-0 top-4 h-0.5 w-5 rounded-full bg-slate-900 dark:bg-slate-100" />
              </span>
            </button>

            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-slate-500">
                Independent Business Owner
              </p>
              <h1 className="bg-gradient-to-r from-sky-600 via-fuchsia-500 to-amber-500 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl">
                IBO Roadmap
              </h1>
            </div>
          </div>


        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">


        <main className="min-w-0 flex-1 pb-6">{children}</main>
      </div>

      <div
        className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-slate-950/45 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-[86vw] max-w-sm border-r border-slate-200/60 bg-white/95 dark:border-slate-800/60 dark:bg-slate-900/95 p-5 backdrop-blur-xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full shadow-none"
            }`}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-slate-500">
                Menu
              </p>
              <h2 className="mt-2 bg-gradient-to-r from-sky-600 via-fuchsia-500 to-amber-500 bg-clip-text text-2xl font-black tracking-tight text-transparent">
                IBO Roadmap
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
