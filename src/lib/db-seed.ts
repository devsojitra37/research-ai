import { prisma } from "@/lib/db";
import { plans as configPlans } from "@/config";

export async function seedDatabase() {
  try {
    // Seed plans if none exist
    const planCount = await prisma.plan.count();
    if (planCount === 0) {
      console.log("Seeding database plans...");
      for (const [index, plan] of configPlans.entries()) {
        await prisma.plan.create({
          data: {
            name: plan.name,
            slug: plan.slug,
            description: plan.description,
            monthlyPrice: plan.monthlyPrice,
            yearlyPrice: plan.yearlyPrice,
            currency: "INR",
            monthlyCredits: plan.limits.monthlyCredits,
            maxDocuments: plan.limits.documentsPerMonth,
            features: JSON.stringify(plan.features),
            sortOrder: index,
          },
        });
      }
      console.log("Database plans seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
