export type HouseholdType = "single-male" | "single-female" | "couple" | "couple-with-kids";

export type PvTier = 50 | 100 | 150;

export const HOUSEHOLD_OPTIONS: { id: HouseholdType; label: string }[] = [
  { id: "single-male", label: "Single Male" },
  { id: "single-female", label: "Single Female" },
  { id: "couple", label: "Couple" },
  { id: "couple-with-kids", label: "Couple with Kids" },
];

export const PV_TIERS: PvTier[] = [50, 100, 150];

export const BUNDLES: Record<HouseholdType, Record<PvTier, string[]>> = {
  "single-male": {
    50: [
      "A4300",   // Nutrilite Double X Multivitamin
      "128156",  // XS Grass-Fed Whey Protein
      "111225V", // Artistry Men Gentle Face Wash
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126455",  // Satinique 2-in-1 Shampoo & Conditioner
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
    ],
    100: [
      "123377",  // Nutrilite Perfect Pack
      "128154",  // XS Grass-Fed Whey Protein Chocolate
      "120571",  // Nutrilite Balance Within Probiotic
      "111225V", // Artistry Men Gentle Face Wash
      "111227V", // Artistry Men Post Shave Toner
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126455",  // Satinique 2-in-1 Shampoo & Conditioner
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
    ],
    150: [
      "123377",  // Nutrilite Perfect Pack
      "128156",  // XS Grass-Fed Whey Protein
      "120571",  // Nutrilite Balance Within Probiotic
      "316375",  // XS Pre-Workout
      "126754",  // XS Post-Workout BCAAs + HMB
      "111225V", // Artistry Men Gentle Face Wash
      "111228V", // Artistry Men Facial Moisturizer
      "111227V", // Artistry Men Post Shave Toner
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126455",  // Satinique 2-in-1 Shampoo & Conditioner
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
      "110478",  // Amway Home SA8 Liquid Laundry Detergent
    ],
  },
  "single-female": {
    50: [
      "123372",  // Nutrilite Women's Pack
      "123781V", // Artistry Skin Nutrition Renewing Foaming Cleanser
      "123798V", // Artistry Skin Nutrition Hydrating Gel Cream
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126449",  // Satinique Smooth Moisture Shampoo
      "126451",  // Satinique Smooth Moisture Conditioner
    ],
    100: [
      "123372",  // Nutrilite Women's Pack
      "120571",  // Nutrilite Balance Within Probiotic
      "123781V", // Artistry Skin Nutrition Renewing Foaming Cleanser
      "123798V", // Artistry Skin Nutrition Hydrating Gel Cream
      "125517V", // Artistry Skin Nutrition Vitamin C + HA3 Daily Serum
      "124823V", // Artistry Skin Nutrition Multi-Defense UV Protect SPF 50
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126449",  // Satinique Smooth Moisture Shampoo
      "126451",  // Satinique Smooth Moisture Conditioner
      "125902",  // g&h Nourish Hand Cream
    ],
    150: [
      "123372",  // Nutrilite Women's Pack
      "120571",  // Nutrilite Balance Within Probiotic
      "127725",  // Nutrilite Begin Daily GI Primer
      "123781V", // Artistry Skin Nutrition Renewing Foaming Cleanser
      "123798V", // Artistry Skin Nutrition Hydrating Gel Cream
      "125517V", // Artistry Skin Nutrition Vitamin C + HA3 Daily Serum
      "124823V", // Artistry Skin Nutrition Multi-Defense UV Protect SPF 50
      "123784V", // Artistry Skin Nutrition Renewing Reactivation Eye Cream
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126449",  // Satinique Smooth Moisture Shampoo
      "126451",  // Satinique Smooth Moisture Conditioner
      "125902",  // g&h Nourish Hand Cream
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
      "110478",  // Amway Home SA8 Liquid Laundry Detergent
    ],
  },
  couple: {
    50: [
      "A4300",   // Nutrilite Double X Multivitamin
      "120571",  // Nutrilite Balance Within Probiotic
      "123781V", // Artistry Skin Nutrition Renewing Foaming Cleanser
      "111225V", // Artistry Men Gentle Face Wash
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126449",  // Satinique Smooth Moisture Shampoo
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
    ],
    100: [
      "123372",  // Nutrilite Women's Pack
      "123365",  // Nutrilite Men's Pack
      "120571",  // Nutrilite Balance Within Probiotic
      "123781V", // Artistry Skin Nutrition Renewing Foaming Cleanser
      "123798V", // Artistry Skin Nutrition Hydrating Gel Cream
      "111225V", // Artistry Men Gentle Face Wash
      "111228V", // Artistry Men Facial Moisturizer
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126449",  // Satinique Smooth Moisture Shampoo
      "126455",  // Satinique 2-in-1 Shampoo & Conditioner
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
    ],
    150: [
      "123372",  // Nutrilite Women's Pack
      "123365",  // Nutrilite Men's Pack
      "120571",  // Nutrilite Balance Within Probiotic
      "127725",  // Nutrilite Begin Daily GI Primer
      "123781V", // Artistry Skin Nutrition Renewing Foaming Cleanser
      "125517V", // Artistry Skin Nutrition Vitamin C + HA3 Daily Serum
      "111225V", // Artistry Men Gentle Face Wash
      "111228V", // Artistry Men Facial Moisturizer
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126449",  // Satinique Smooth Moisture Shampoo
      "126455",  // Satinique 2-in-1 Shampoo & Conditioner
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
      "110478",  // Amway Home SA8 Liquid Laundry Detergent
    ],
  },
  "couple-with-kids": {
    50: [
      "A4300",   // Nutrilite Double X Multivitamin
      "126187",  // Nutrilite Organics Kids Complete Superfood Powder
      "120571",  // Nutrilite Balance Within Probiotic
      "124106",  // Glister Multi-Action Toothpaste
      "125890",  // g&h Nourish Body Wash 400 mL
      "125891",  // g&h Nourish Body Lotion
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
      "127877",  // g&h Protect Antiperspirant Deodorant
    ],
    100: [
      "123372",  // Nutrilite Women's Pack
      "123365",  // Nutrilite Men's Pack
      "126187",  // Nutrilite Organics Kids Complete Superfood Powder
      "125890",  // g&h Nourish Body Wash 400 mL
      "125891",  // g&h Nourish Body Lotion
      "123781V", // Artistry Skin Nutrition Renewing Foaming Cleanser
      "111225V", // Artistry Men Gentle Face Wash
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
      "110478",  // Amway Home SA8 Liquid Laundry Detergent
    ],
    150: [
      "123372",  // Nutrilite Women's Pack
      "123365",  // Nutrilite Men's Pack
      "120571",  // Nutrilite Balance Within Probiotic
      "126187",  // Nutrilite Organics Kids Complete Superfood Powder
      "125890",  // g&h Nourish Body Wash 400 mL
      "125891",  // g&h Nourish Body Lotion
      "123781V", // Artistry Skin Nutrition Renewing Foaming Cleanser
      "125517V", // Artistry Skin Nutrition Vitamin C + HA3 Daily Serum
      "111225V", // Artistry Men Gentle Face Wash
      "111228V", // Artistry Men Facial Moisturizer
      "124106",  // Glister Multi-Action Toothpaste
      "127877",  // g&h Protect Antiperspirant Deodorant
      "126449",  // Satinique Smooth Moisture Shampoo
      "126455",  // Satinique 2-in-1 Shampoo & Conditioner
      "E0001",   // Amway Home L.O.C. Multi-Purpose Cleaner
      "110478",  // Amway Home SA8 Liquid Laundry Detergent
      "110488",  // Amway Home Dish Drops
    ],
  },
};
