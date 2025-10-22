// lucide icons — ensure names exist in lucide-react
import {
  ArrowRight,
  Code,
  Headphones,
  Layers,
  Palette,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const industries = [
    {
      name: "Oil & Gas",
      description: "Enterprise platforms for energy sector leaders",
      icon: "🛢️",
      color: "from-blue-600 to-blue-800",
    },
    {
      name: "Banking",
      description: "Secure fintech solutions for financial institutions",
      icon: "🏦",
      color: "from-green-600 to-green-800",
    },
    {
      name: "Real Estate",
      description: "Property management and marketplace platforms",
      icon: "🏢",
      color: "from-purple-600 to-purple-800",
    },
    {
      name: "Agriculture",
      description: "AgriTech solutions for modern farming",
      icon: "🌾",
      color: "from-yellow-600 to-yellow-800",
    },
    {
      name: "Telecoms",
      description: "Customer portals and service platforms",
      icon: "📡",
      color: "from-indigo-600 to-indigo-800",
    },
    {
      name: "Entertainment",
      description: "Streaming and content delivery systems",
      icon: "🎬",
      color: "from-pink-600 to-pink-800",
    },
  ];

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description:
        "Custom web applications built with modern frameworks and best practices",
      link: "/services#web-dev",
      color: "bg-primary",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "User-centered design that drives engagement and conversions",
      link: "/services#ui-ux",
      color: "bg-secondary",
    },
    {
      icon: Layers,
      title: "Platform Development",
      description: "Scalable enterprise platforms for complex business needs",
      link: "/services#platforms",
      color: "bg-accent",
    },
    {
      icon: Sparkles,
      title: "Brand Identity",
      description: "Complete branding solutions from logo to style guides",
      link: "/services#branding",
      color: "bg-primary",
    },
    {
      icon: Headphones,
      title: "Support & Maintenance",
      description: "24/7 technical support and ongoing platform optimization",
      link: "/services#support",
      color: "bg-secondary",
    },
  ];

  const projects = [
    {
      title: "Banking Portal Redesign",
      description:
        "Modern customer portal for leading Nigerian bank with 300% engagement increase",
      image: "/project-1.png",
      category: "Fintech",
      metrics: "300% ↑ Engagement",
    },
    {
      title: "Oil & Gas Management System",
      description:
        "Enterprise resource planning platform for energy company operations",
      image: "/project-2.png",
      category: "Enterprise",
      metrics: "50% ↓ Costs",
    },
    {
      title: "Real Estate Marketplace",
      description:
        "Property listing and management platform with advanced search capabilities",
      image: "/project-3.png",
      category: "Real Estate",
      metrics: "200% ↑ Listings",
    },
  ];

  const testimonials = [
    {
      quote:
        "BuiltAndLaunch transformed our digital presence and delivered beyond expectations. Our customer engagement has increased by 300%.",
      author: "Adebayo Okonkwo",
      position: "CEO, FirstBank Digital",
      company: "Banking",
    },
    {
      quote:
        "Professional, responsive, and highly skilled. They understood our industry needs and built a platform that scales with our growth.",
      author: "Chioma Adeleke",
      position: "COO, Landmark Properties",
      company: "Real Estate",
    },
    {
      quote:
        "The team delivered a robust platform that handles our complex operations seamlessly. Best investment we made this year.",
      author: "Ibrahim Yusuf",
      position: "MD, PetroStream Energy",
      company: "Oil & Gas",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <Hero />

      {/* Industries Snapshot */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We specialize in building digital platforms for Nigeria's most
              profitable industries, delivering solutions that drive real
              business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Card
                key={industry.name}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/50"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{industry.icon}</div>
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div
                        className={`h-6 w-6 rounded bg-gradient-to-br ${industry.color}`}
                      ></div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {industry.name}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {industry.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    <span>Explore Solutions</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Core Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to launch, we provide end-to-end digital solutions
              that transform businesses and drive measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-background/80 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`h-12 w-12 rounded-lg ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group-hover:gap-3"
                    >
                      Learn More{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Recent Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how we've helped industry leaders transform their digital
              presence and achieve unprecedented growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/50"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                      {project.category === "Fintech" && "🏦"}
                      {project.category === "Enterprise" && "🏢"}
                      {project.category === "Real Estate" && "🏠"}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-primary/90 text-white px-3 py-1 text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-accent/90 text-white px-3 py-1 text-xs font-bold">
                      {project.metrics}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    <span>View Case Study</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 hover:bg-muted"
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2"
              >
                View All Projects <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what industry leaders say
              about working with BuiltAndLaunch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.author}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-background/80 backdrop-blur-sm"
              >
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Sparkles
                        key={`sparkle-${i}`}
                        className="h-5 w-5 text-accent fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 italic leading-relaxed text-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}
                        </p>
                        <p className="text-xs text-primary font-medium">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="relative py-24 bg-gradient-to-r from-primary via-primary/90 to-accent text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to scale your business with a{" "}
            <span className="bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
              modern platform?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Let's build your digital empire together. Join Nigeria's most
            successful companies who trust BuiltAndLaunch for their digital
            transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-xl"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Request Proposal
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <a
                href={
                  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Book Strategy Call
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
