"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-link";

  const handleBookCall = () => {
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="border-y bg-muted/40">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="max-w-2xl">
            <p className="text-lg font-medium sm:text-xl">
              Not sure what service fits? Book a free call.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Let's discuss your project and find the perfect solution for your
              business.
            </p>
          </div>
          <Button
            size="lg"
            onClick={handleBookCall}
            className="shrink-0 gap-2"
            aria-label="Book a free consultation call"
          >
            <Calendar className="h-5 w-5" aria-hidden="true" />
            Book Call
          </Button>
        </div>
      </div>
    </section>
  );
}
