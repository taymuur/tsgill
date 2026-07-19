"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[var(--maxw)] items-center justify-between px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {site.brand}
          <span className="text-accent">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {site.nav.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:text-accent ${
                  active ? "text-accent" : "text-text-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          {site.navCta && (
            <Link
              href={site.navCta.href}
              className="ml-2 rounded-full border border-accent px-3.5 py-1.5 text-sm text-accent transition-colors hover:bg-accent hover:text-[var(--bg)]"
            >
              {site.navCta.label}
            </Link>
          )}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-text-muted"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border px-6 py-3 md:hidden">
          {[...site.nav, ...(site.navCta ? [site.navCta] : [])].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-text-muted hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
