const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // 1. Clean Database
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.subcategory.deleteMany();
  await prisma.category.deleteMany();
  await prisma.token.deleteMany();
  await prisma.user.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.testimonial.deleteMany();

  console.log("Cleared old database records.");

  // 2. Create Users
  const adminPasswordHash = await bcrypt.hash("adminpassword123", 10);
  const customerPasswordHash = await bcrypt.hash("customerpassword123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@sugandhika.com",
      passwordHash: adminPasswordHash,
      firstName: "Sugandhika",
      lastName: "Admin",
      role: "ADMIN",
      isVerified: true,
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: "customer@gmail.com",
      passwordHash: customerPasswordHash,
      firstName: "Vicky",
      lastName: "Sharma",
      role: "CUSTOMER",
      isVerified: true,
    },
  });

  console.log("Created Admin & Customer accounts.");

  // 3. Create Categories & Subcategories
  const repellentCat = await prisma.category.create({
    data: {
      name: "Mosquito Repellent",
      slug: "mosquito-repellent",
      description: "Organic, chemical-free herbal mosquito repellents safe for your family and pets.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
    },
  });

  const aromatherapyCat = await prisma.category.create({
    data: {
      name: "Aromatherapy & Wellness",
      slug: "aromatherapy-wellness",
      description: "Natural incense and aromatherapy oils for deep relaxation and air purification.",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600",
    },
  });

  const incenseSub = await prisma.subcategory.create({
    data: {
      name: "Incense Sticks",
      slug: "incense-sticks",
      description: "Herbal slow-burning incense sticks.",
      categoryId: repellentCat.id,
    },
  });

  const spraysSub = await prisma.subcategory.create({
    data: {
      name: "Repellent Sprays",
      slug: "repellent-sprays",
      description: "Personal and room protection organic sprays.",
      categoryId: repellentCat.id,
    },
  });

  const diffuserSub = await prisma.subcategory.create({
    data: {
      name: "Essential Oils",
      slug: "essential-oils",
      description: "Diffuser concentrates.",
      categoryId: aromatherapyCat.id,
    },
  });

  console.log("Created Categories and Subcategories.");

  // 4. Create Products
  const prod1 = await prisma.product.create({
    data: {
      title: "Sugandhika Natural Mosquito Repellent Incense Sticks",
      slug: "sugandhika-natural-incense-sticks",
      sku: "SUG-REP-INC-01",
      barcode: "8901234567891",
      price: 350.0,
      salePrice: 320.0,
      discount: 8.57,
      categoryId: repellentCat.id,
      subcategoryId: incenseSub.id,
      stock: 120,
      weight: 150,
      size: "20 Sticks Pack",
      dimensions: "10 x 2 x 2 inches",
      shortDescription: "Protect your home naturally with Sugandhika Natural Mosquito Repellent Incense Sticks made from citronella, neem, eucalyptus, lemongrass and herbal ingredients.",
      longDescription: "Sugandhika Natural Mosquito Repellent Incense Sticks are crafted using a blend of pure essential oils and ancient Ayurvedic herbs. Our incense sticks provide long-lasting defense against mosquitoes without relying on harmful synthetic chemicals like DEET. It creates a calming atmosphere while ensuring protection for children and pets.",
      ingredients: ["Citronella", "Neem", "Lemongrass", "Eucalyptus", "Natural Wood Powder", "Herbal Resin"],
      benefits: ["Natural & Herbal", "100% Chemical Free", "Safe for Kids & Pets", "Handmade & Eco Friendly", "Pleasant Herbal Aroma"],
      directions: ["Light the tip of the incense stick.", "Wait 10 seconds for it to glow.", "Blow out the flame gently.", "Place it in a secure incense holder."],
      safetyInstructions: ["Keep away from children and flammable items.", "Do not leave burning incense unattended.", "Use in a well-ventilated area."],
      specifications: {
        weight: "150g",
        pieces: "20 sticks",
        burnTime: "45 minutes per stick",
        storage: "Store in a cool, dry place.",
      },
      tags: ["mosquito", "herbal", "natural", "incense", "chemical-free"],
      averageRating: 4.8,
      isFeatured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800", isFeatured: true },
          { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" },
        ],
      },
    },
  });

  const prod2 = await prisma.product.create({
    data: {
      title: "Sugandhika Herbal Mosquito Repellent Spray",
      slug: "sugandhika-herbal-spray",
      sku: "SUG-REP-SPR-02",
      price: 299.0,
      stock: 80,
      weight: 100,
      size: "100ml Bottle",
      categoryId: repellentCat.id,
      subcategoryId: spraysSub.id,
      shortDescription: "A convenient body and room spray for outdoor and indoor mosquito protection.",
      longDescription: "This non-greasy, refreshing herbal spray protects you on the go. Formulated with pure eucalyptus oil, neem extracts, and citronella, it forms an invisible protective barrier against mosquitoes for up to 6 hours.",
      ingredients: ["Eucalyptus Oil", "Neem Hydrosol", "Citronella Extract", "Purified Water"],
      benefits: ["Easy Application", "On-the-go Protection", "Safe for Skin", "DEET Free"],
      directions: ["Shake well before use.", "Spray on exposed skin or around the room.", "Avoid contact with eyes."],
      safetyInstructions: ["For external use only.", "Avoid spraying on cuts or wounds.", "Keep out of reach of infants."],
      specifications: {
        volume: "100ml",
        protectionTime: "Up to 6 hours",
        packaging: "Spray Bottle",
      },
      tags: ["spray", "mosquito", "outdoor", "skin-friendly"],
      averageRating: 4.5,
      isFeatured: true,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800", isFeatured: true },
        ],
      },
    },
  });

  const prod3 = await prisma.product.create({
    data: {
      title: "Sugandhika Pure Citronella Essential Oil",
      slug: "sugandhika-citronella-oil",
      sku: "SUG-OIL-CIT-03",
      price: 450.0,
      stock: 45,
      weight: 15,
      size: "15ml Dropper",
      categoryId: aromatherapyCat.id,
      subcategoryId: diffuserSub.id,
      shortDescription: "100% pure steam-distilled citronella oil for vaporizers and diffusers.",
      longDescription: "Our pure steam-distilled Citronella Essential Oil is highly concentrated. Perfect for use in electric or candle diffusers to repel mosquitoes while infusing your living spaces with a crisp, stimulating citrus aroma.",
      ingredients: ["100% Pure Citronella Essential Oil"],
      benefits: ["Highly Concentrated", "Air Purifying", "Stress Relief", "Natural Repellent"],
      directions: ["Add 5-8 drops in a water-filled diffuser bowl.", "Diffuse for 30-60 minutes."],
      safetyInstructions: ["Do not apply directly to skin undiluted.", "Do not ingest.", "Keep away from pets' direct contact."],
      specifications: {
        volume: "15ml",
        extractionMethod: "Steam Distilled",
        origin: "Nepal",
      },
      tags: ["essential-oil", "diffuser", "citronella", "wellness"],
      averageRating: 4.7,
      isFeatured: false,
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800", isFeatured: true },
        ],
      },
    },
  });

  console.log("Created Products.");

  // 5. Create Reviews
  await prisma.review.create({
    data: {
      userId: customer.id,
      productId: prod1.id,
      rating: 5,
      title: "Excellent incense sticks!",
      comment: "These sticks smell amazing, not like those chemical coils that choke you. Plus, they actually work! Very few mosquitoes in the living room now. Recommended!",
    },
  });

  // 6. Create FAQs
  await prisma.fAQ.createMany({
    data: [
      {
        question: "Are Sugandhika products safe for babies?",
        answer: "Yes, Sugandhika products are made from 100% herbal ingredients such as Citronella, Neem, and Lemongrass. They do not contain DEET, d-trans-allethrin, or other toxic chemicals, making them safe for kids, babies, and pets when used as directed.",
        category: "Safety",
      },
      {
        question: "How long do the incense sticks burn?",
        answer: "Each Sugandhika incense stick burns for approximately 45 minutes, and the natural aroma continues to repel mosquitoes for another 2 to 3 hours after burning.",
        category: "Product Usage",
      },
      {
        question: "Do you offer cash on delivery?",
        answer: "Yes, we offer Cash on Delivery (COD) inside Kathmandu valley and other major cities in Nepal. You can also pay online via eSewa, Khalti, or Credit cards (Stripe).",
        category: "Payments & Delivery",
      },
    ],
  });

  // 7. Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Aarav Adhikari",
        role: "Parent of 2, Kathmandu",
        content: "I was looking for a chemical-free mosquito solution for my toddlers. Sugandhika incense sticks burn gently and keep the room bug-free. The smell is incredibly refreshing!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        isFeatured: true,
      },
      {
        name: "Shreya Thapa",
        role: "Nature Lover, Pokhara",
        content: "The repellent spray is my constant hiking companion. No itchy bites, and I love that it supports organic local Nepalese farming.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        isFeatured: true,
      },
    ],
  });

  console.log("Seeding completed successfully! 🎉");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
