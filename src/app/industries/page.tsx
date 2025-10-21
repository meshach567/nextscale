import { Metadata } from 'next';
import { IndustryCard } from '@/components/IndustryCard';
import { IndustriesCTA } from '@/components/IndustryCTA';
import { industries } from '@/data/industries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Industries — Build and Launch',
  description: 'We build investor-ready websites and scalable platforms for Nigeria\'s top industries: oil & gas, banking, real estate, agriculture, telecoms, and entertainment.',
  openGraph: {
    title: 'Industries We Serve — Build and Launch',
    description: 'Expert digital solutions for Nigeria\'s top industries where billionaires invest.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve — Build and Launch',
    description: 'Expert digital solutions for Nigeria\'s top industries where billionaires invest.',
  },
};

export default function Industries() {
  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <Header />
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Industries We Serve
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              Our expertise spans Nigeria's top industries where billionaires invest.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <IndustryCard
                key={industry.slug}
                {...industry}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <IndustriesCTA />
      <Footer />
    </main>
  );
}