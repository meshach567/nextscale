import type { Metadata } from "next";

import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Services — Your Agency Name",
  description:
    "Tailored solutions for billion-dollar industries in Nigeria. Web design, UI/UX, custom platforms, branding, and maintenance services.",
  openGraph: {
    title: "Services — Your Agency Name",
    description: "Tailored solutions for billion-dollar industries in Nigeria.",
  },
};

interface Service {
  title: string;
  desc: string;
  href: string;
}

const services: Service[] = [
  {
    title: "Web Design & Development",
    desc: "Custom, responsive websites built with modern frameworks. Scalable solutions that drive growth and user engagement.",
    href: "/services/web-design-development",
  },
  {
    title: "UI/UX Design",
    desc: "User-centered design that delights customers. Research-backed interfaces optimized for conversion and retention.",
    href: "/services/ui-ux-design",
  },
  {
    title: "Custom Platforms",
    desc: "Bespoke web applications and SaaS products. Enterprise-grade solutions tailored to your business processes.",
    href: "/services/custom-platforms",
  },
  {
    title: "Branding & Strategy",
    desc: "Comprehensive brand identity and digital strategy. Position your business for market leadership.",
    href: "/services/branding-strategy",
  },
  {
    title: "Maintenance & Support",
    desc: "Ongoing technical support and optimization. Keep your digital assets secure, fast, and up-to-date.",
    href: "/services/maintenance-support",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <Header />
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Our Services
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              Tailored solutions for billion-dollar industries in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                desc={service.desc}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <CTA />
      <Footer />
    </main>
  );
}
