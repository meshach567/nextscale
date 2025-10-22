import BookACall from "@/components/BookACall";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import QuickContact from "@/components/QuickContact";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get in touch
          </h1>
          <p className="text-xl text-slate-600">
            Let's discuss your project today.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <ContactForm />

          {/* Sidebar */}
          <div className="space-y-6">
            <BookACall />
            <QuickContact />
          </div>
        </div>
      </main>
    </div>
  );
}
