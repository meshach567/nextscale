import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Seed Leads ---
  await prisma.lead.createMany({
    data: [
      {
        name: "John Doe",
        email: "john@example.com",
        company: "FinBank Ltd",
        industry: "Banking",
        projectType: "Website Redesign",
        message: "We need a responsive fintech dashboard.",
      },
      {
        name: "Sarah Johnson",
        email: "sarah@realestatepro.com",
        company: "RealEstatePro",
        industry: "Real Estate",
        projectType: "Property Listing Platform",
        message: "We want an interactive property platform.",
      },
      {
        name: "Michael Lee",
        email: "michael@csrconnect.org",
        company: "CSR Connect",
        industry: "CSR",
        projectType: "Community Engagement Portal",
        message: "Need a platform to manage NGO activities.",
      },
    ],
  });

  // --- Seed Analytics ---
  await prisma.analytics.createMany({
    data: [
      {
        page: "Homepage",
        visits: 320,
        serviceClicks: 45,
      },
      {
        page: "Services",
        visits: 210,
        serviceClicks: 30,
      },
      {
        page: "Contact",
        visits: 150,
        serviceClicks: 12,
      },
    ],
  });

  console.log("✅ Database seeding completed!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
