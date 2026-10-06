import Link from "next/link";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
        {/* Main footer */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div className="min-w-0">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-text"
            >
              Orange ERP
            </Link>

            <p className="mt-1 max-w-md text-xs leading-5 text-text-muted">
              Labour and project management for construction teams.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-muted sm:justify-end">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex flex-col gap-1 border-t border-border pt-4 text-[11px] leading-4 text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Orange ERP</p>

          <p className="sm:text-right">
            Your data stays in your workspace. Contact: hello@orange-erp.in
          </p>
        </div>
      </div>
    </footer>
  );
}
