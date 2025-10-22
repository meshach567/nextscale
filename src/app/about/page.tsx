/**
 * About Page - Build and Launch
 * Contact: contact@buildandlaunch.ng
 *
 * README:
 * - Replace placeholder image paths with actual images in /public directory
 * - Update NEXT_PUBLIC_CALENDLY_URL in .env.local with your Calendly link
 * - Customize copy as needed while maintaining tone
 * - Ensure /public/founder.jpg and /public/og/about.png exist
 */

import { ArrowRight, Lightbulb, Phone, Rocket, Shield } from "lucide-react";
import type { Metadata } from "next";
// Image import removed - unused
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// Badge import removed - unused
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// SEO Metadata
export const metadata: Metadata = {
  title: "About — Build and Launch",
  description:
    "We close the digital gap for Nigeria's high-value industries — building investor-ready websites, scalable fintech flows and secure platforms.",
  openGraph: {
    title: "About — Build and Launch",
    description:
      "We close the digital gap for Nigeria's high-value industries — building investor-ready websites, scalable fintech flows and secure platforms.",
    type: "website",
    images: ["/og/about.png"],
    locale: "en_NG",
    siteName: "Build and Launch",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Build and Launch",
    description:
      "We close the digital gap for Nigeria's high-value industries — building investor-ready websites, scalable fintech flows and secure platforms.",
    images: ["/og/about.png"],
  },
};

// Core Value Card Component
function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-gray-200 hover:border-gray-300 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Stats Component
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </div>
  );
}

// CTA Buttons Component (Client Component for interactivity)
function CTAButtons() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "#";

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        asChild
        size="lg"
        className="bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Link href="/contact">
          Get a Quote
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
          <Phone className="mr-2 h-4 w-4" />
          Book a Call
        </a>
      </Button>
    </div>
  );
}

export default function About() {
  return (
    <>
      {/* JSON-LD Structured Data (static and controlled content - safe to inject) */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Build and Launch",
          url: "https://buildandlaunch.ng",
          logo: "https://buildandlaunch.ng/logo.png",
          description:
            "We close the digital gap for Nigeria's high-value industries",
          address: {
            "@type": "PostalAddress",
            addressCountry: "NG",
            addressLocality: "Lagos",
          },
        })}
      </script>

      <main className="min-h-screen bg-white">
        <Header />
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                We build digital experiences for Nigeria's highest-value
                industries.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                We design investor-ready platforms and scalable products for oil
                & gas, banking, real estate, agriculture and fintech.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Mission Statement */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Mission Statement
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  At Build and Launch, our mission is to close the digital gap
                  in Nigeria's highest-value industries. We design
                  investor-ready platforms, secure fintech flows, and scalable
                  web systems that earn trust, increase transparency, and unlock
                  real business value.
                </p>
              </div>

              {/* Core Values */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Core Values
                </h2>
                <div className="space-y-4">
                  <ValueCard
                    icon={Shield}
                    title="Trust"
                    description="Security-first engineering and transparent reporting that builds confidence."
                  />
                  <ValueCard
                    icon={Rocket}
                    title="Scalability"
                    description="Architectures and build processes that grow with your business needs."
                  />
                  <ValueCard
                    icon={Lightbulb}
                    title="Innovation"
                    description="Practical, product-led design that solves real industry problems."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Founder
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              {/* Founder Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 relative">
                  {/* Replace with actual image when available */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                    MA
                  </div>
                  {/* <Image
                    src="/founder.jpg"
                    alt="Meshach Arinze, Founder of Build and Launch"
                    width={160}
                    height={160}
                    className="object-cover"
                  /> */}
                </div>
              </div>

              {/* Founder Text */}
              <div className="flex-1 space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Meshach Arinze founded Build and Launch after seeing major
                  enterprises invest heavily in infrastructure but neglect
                  digital experiences. With 4 years building production web apps
                  and products across fintech and enterprise projects, Meshach
                  started the agency to bring global-standard web platforms to
                  Nigeria's most important sectors.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  He believes great product design and rock-solid engineering
                  together create confidence for investors and ease for
                  customers — and that's what drives every project. His personal
                  commitment to accountability means every client has direct
                  access to leadership, ensuring projects stay aligned with
                  business goals from start to launch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="py-12 md:py-16 border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
              <StatItem value="2" label="Demo Case Studies" />
              <StatItem value="99%" label="Uptime on Demo Sites" />
              <StatItem value="4 weeks" label="Average Project TAT" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-t from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Ready to modernize your digital presence?
            </h2>
            <CTAButtons />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
