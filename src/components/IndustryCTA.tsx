"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function IndustriesCTA() {
  return (
    <section className="border-y bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="max-w-2xl">
            <p className="text-lg font-semibold sm:text-xl lg:text-2xl">
              Your industry deserves a global-standard digital presence.
            </p>
            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              Let's make it happen.
            </p>
          </div>
          <Button size="lg" asChild className="shrink-0 gap-2">
            <Link
              href="/contact"
              aria-label="Request a proposal for your industry"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              Request Proposal
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
