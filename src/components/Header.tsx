"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">NS</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                NextScale
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="/industries"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile hamburger */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
              aria-label="Open menu"
              aria-controls="mobile-drawer"
              onClick={() => setOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>

            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </nav>
      </div>

      {open && (
        <button
          type="button"
          title="Close menu"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 opacity-100 transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Mobile drawer (slides from left to right) */}
      <nav
        id="mobile-drawer"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85%] -translate-x-full border-r bg-background md:bg-gradient-to-b md:from-background md:to-muted p-6 shadow-xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : ""
        }`}
      >
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="flex h-full flex-col">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base text-foreground/90 transition-colors hover:bg-muted"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base text-foreground/90 transition-colors hover:bg-muted"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base text-foreground/90 transition-colors hover:bg-muted"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/industries"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base text-foreground/90 transition-colors hover:bg-muted"
              >
                Industries
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base text-foreground/90 transition-colors hover:bg-muted"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-base text-foreground/90 transition-colors hover:bg-muted"
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="mt-auto pt-4">
            <Button asChild className="w-full h-11 text-base">
              <Link href="/auth" onClick={() => setOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
