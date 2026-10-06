"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import OrangeLogo from "@/components/layout/orange-logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu on route change + Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open ]);

  return (
    <header className="glass-topbar sticky top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-text focus:outline-2 focus:outline-primary"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center">
          <OrangeLogo />
        </div>

        <nav aria-label="Landing" className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-background font-semibold text-text"
                    : "text-text-muted hover:text-text"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/contact"
            className="btn-nudge press inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="press relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-border bg-surface text-text transition-colors hover:border-primary md:hidden"
        >
          <Menu
            aria-hidden="true"
            className={cn(
              "absolute h-5 w-5 transition-all duration-300 ease-out",
              open ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
            )}
          />
          <X
            aria-hidden="true"
            className={cn(
              "absolute h-5 w-5 transition-all duration-300 ease-out",
              open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
            )}
          />
        </button>
      </div>

      {/* Animated dropdown: height + fade + staggered links */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "border-border bg-surface px-4 transition-[padding,border] duration-300",
              open ? "border-t pb-5 pt-3" : "border-t-0 pb-0 pt-0"
            )}
          >
            <nav aria-label="Mobile" className="flex flex-col" inert={!open}>
              {LINKS.map((l, i) => {
                const active =
                  l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    tabIndex={open ? 0 : -1}
                    style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-2.5 text-[15px] font-medium transition-all duration-300 ease-out hover:bg-background",
                      active ? "text-primary" : "text-text",
                      open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                    )}
                  >
                    {l.label}
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-all duration-300",
                        active ? "text-primary" : "text-text-muted"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>
            <div
              className={cn(
                "transition-all delay-300 duration-300",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              )}
            >
              <Link
                href="/contact"
                tabIndex={open ? 0 : -1}
                className="btn-nudge mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Get started <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
