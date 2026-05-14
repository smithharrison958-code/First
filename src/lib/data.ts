export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  imageClass: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  description: string;
  longDescription: string;
  features: string[];
  dimensions?: string;
  care?: string;
  inStock: boolean;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  date: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  imageClass: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}

// ─── Products ────────────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "1",
    slug: "solid-oak-cutting-board",
    name: "Solid Oak Cutting Board",
    price: 89,
    category: "Cutting Boards",
    material: "Oak Wood",
    imageClass: "product-img-oak",
    rating: 4.9,
    reviewCount: 312,
    badge: "Bestseller",
    description: "Hand-finished solid oak cutting board with natural food-safe oil treatment. Zero plastic, zero toxins.",
    longDescription: "Crafted from sustainably harvested North American white oak, this cutting board is built to last a lifetime. Each board is hand-selected for grain pattern, then slow-dried and finished with our proprietary food-safe walnut oil blend. The end-grain construction makes it exceptionally knife-friendly while being self-healing over time.",
    features: [
      "Sustainably harvested North American white oak",
      "End-grain construction for knife longevity",
      "Food-safe walnut oil finish — zero chemicals",
      "Built-in juice groove to catch run-off",
      "Non-slip rubber feet (natural rubber)",
      "Each board has a unique grain pattern",
    ],
    dimensions: "18\" × 12\" × 1.5\"",
    care: "Hand wash only. Re-oil monthly with food-safe oil. Never submerge in water.",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    slug: "stainless-steel-cookware-set",
    name: "Stainless Steel 5-Piece Cookware Set",
    price: 349,
    originalPrice: 420,
    category: "Cookware",
    material: "Stainless Steel",
    imageClass: "product-img-steel",
    rating: 4.8,
    reviewCount: 198,
    badge: "Sale",
    description: "Premium 18/10 stainless steel cookware. No PFAS, no coatings, no compromises.",
    longDescription: "Our 5-piece cookware set is constructed from surgical-grade 18/10 stainless steel — the same alloy used in professional kitchens worldwide. Unlike non-stick pans that shed microplastic and PFAS particles into your food, stainless steel is completely inert, never leaching any chemicals regardless of temperature.",
    features: [
      "18/10 surgical-grade stainless steel",
      "Tri-ply construction for even heat distribution",
      "Oven-safe up to 500°F",
      "Compatible with all cooktops including induction",
      "Riveted stainless handles stay cool",
      "Tempered glass lids included",
    ],
    dimensions: "8\", 10\", 12\" skillet, 2qt & 4qt saucepan",
    care: "Dishwasher safe. Bar Keepers Friend recommended for polish.",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    slug: "borosilicate-glass-storage-set",
    name: "Borosilicate Glass Storage Set",
    price: 79,
    category: "Food Storage",
    material: "Borosilicate Glass",
    imageClass: "product-img-glass",
    rating: 4.9,
    reviewCount: 445,
    badge: "Top Rated",
    description: "12-piece borosilicate glass storage set with airtight bamboo lids. Replace plastic forever.",
    longDescription: "Made from laboratory-grade borosilicate glass, these containers are completely inert — they will never absorb flavors, odors, or leach chemicals. The airtight bamboo lids create a vacuum seal that keeps food fresh 3× longer than plastic alternatives. Borosilicate glass can go from freezer to oven without cracking.",
    features: [
      "Laboratory-grade borosilicate glass",
      "Airtight bamboo lids with silicone gaskets",
      "Freezer, microwave, and oven safe",
      "Dishwasher safe",
      "4 small (16oz), 4 medium (32oz), 4 large (64oz)",
      "Stacks neatly to save cabinet space",
    ],
    dimensions: "Set of 12 — 4 sizes",
    care: "Dishwasher safe. Lids hand wash only.",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    slug: "walnut-cooking-utensil-set",
    name: "Walnut Cooking Utensil Set",
    price: 64,
    category: "Utensils",
    material: "Black Walnut",
    imageClass: "product-img-walnut",
    rating: 4.7,
    reviewCount: 267,
    description: "6-piece black walnut cooking utensils. Naturally antimicrobial and gentle on all cookware.",
    longDescription: "Black walnut is one of the finest woods for kitchen utensils — naturally antimicrobial, incredibly durable, and rich in visual depth. Unlike synthetic spatulas and spoons that shed microplastics at high temperatures, our walnut utensils are completely safe at all cooking temperatures. The natural tannins in walnut resist bacterial growth without any chemical treatments.",
    features: [
      "Premium black walnut — each piece unique",
      "Naturally antimicrobial tannin properties",
      "Safe at all cooking temperatures",
      "Will not scratch stainless or cast iron",
      "Food-safe mineral oil finish",
      "Set of 6: spoon, spatula, slotted spoon, ladle, fork, scraper",
    ],
    dimensions: "12\"–14\" handles",
    care: "Hand wash and dry immediately. Oil monthly.",
    inStock: true,
    featured: false,
  },
  {
    id: "5",
    slug: "stainless-steel-french-press",
    name: "Stainless Steel French Press",
    price: 59,
    category: "Coffee & Tea",
    material: "Stainless Steel",
    imageClass: "product-img-steel",
    rating: 4.8,
    reviewCount: 183,
    description: "Double-wall stainless steel French press. No plastic parts, no BPA — just perfect coffee.",
    longDescription: "Our French press is constructed entirely from 18/8 stainless steel — there is not a single piece of plastic in contact with your coffee. The double-wall vacuum insulation keeps your brew hot for 4+ hours while the triple-layer filter produces a clean, sediment-free cup. The matte finish is scratch-resistant and timelessly beautiful.",
    features: [
      "100% stainless steel — zero plastic parts",
      "Double-wall vacuum insulation (4hr heat retention)",
      "Triple-layer micro-mesh filter",
      "32oz capacity (4 cups)",
      "Ergonomic heat-resistant handle",
      "Wide mouth for easy cleaning",
    ],
    dimensions: "32oz / 950ml",
    care: "Dishwasher safe. All parts disassemble for thorough cleaning.",
    inStock: true,
    featured: false,
  },
  {
    id: "6",
    slug: "solid-maple-butcher-block",
    name: "Solid Maple Butcher Block",
    price: 129,
    category: "Cutting Boards",
    material: "Hard Maple",
    imageClass: "product-img-maple",
    rating: 4.9,
    reviewCount: 156,
    badge: "New",
    description: "Professional-grade hard maple butcher block. Restaurant quality for your home kitchen.",
    longDescription: "Hard maple is considered the gold standard for butcher blocks — used in professional butcheries and restaurant kitchens worldwide. Its tight grain structure makes it resistant to knife scarring while its density means it will last decades. Finished with our own food-safe blend of beeswax and mineral oil.",
    features: [
      "Professional-grade northern hard maple",
      "Thick edge-grain construction",
      "Beeswax & mineral oil food-safe finish",
      "Integrated handles for easy transport",
      "Juice groove on one side",
      "Rubber feet prevent sliding",
    ],
    dimensions: "20\" × 15\" × 2\"",
    care: "Hand wash only. Season regularly with mineral oil or beeswax.",
    inStock: true,
    featured: true,
  },
  {
    id: "7",
    slug: "glass-meal-prep-containers",
    name: "Glass Meal Prep Containers",
    price: 54,
    category: "Food Storage",
    material: "Borosilicate Glass",
    imageClass: "product-img-glass",
    rating: 4.7,
    reviewCount: 389,
    description: "8-piece rectangular glass containers with locking lids — perfect for meal prep.",
    longDescription: "These divided glass containers make meal prep effortless without the health concerns of plastic. The snap-lock lids create a leakproof seal and the borosilicate glass is safe to go from refrigerator to microwave to dishwasher seamlessly. One-compartment and two-compartment options included.",
    features: [
      "Borosilicate glass — microwave and oven safe",
      "4 single-compartment + 4 two-compartment",
      "Snap-lock lids with silicone seals",
      "Leakproof tested",
      "Stackable design",
      "Measurement markings on glass",
    ],
    dimensions: "Set of 8 — 2 sizes",
    care: "Dishwasher safe. Lids top rack only.",
    inStock: true,
    featured: false,
  },
  {
    id: "8",
    slug: "bamboo-fiber-kitchen-towels",
    name: "Bamboo Fiber Kitchen Towels",
    price: 34,
    category: "Textiles",
    material: "Organic Bamboo",
    imageClass: "product-img-bamboo",
    rating: 4.6,
    reviewCount: 521,
    badge: "Eco Pick",
    description: "Ultra-absorbent bamboo fiber towels. Replace paper towels permanently.",
    longDescription: "Bamboo fiber is 40% more absorbent than cotton, naturally antibacterial, and compostable at end of life. Our kitchen towels are woven from OEKO-TEX certified organic bamboo without synthetic dyes. Each set replaces over 3,000 single-use paper towels annually.",
    features: [
      "OEKO-TEX certified organic bamboo fiber",
      "40% more absorbent than cotton",
      "Naturally antibacterial",
      "Set of 6 — 3 solid + 3 striped",
      "Machine washable, gets softer with use",
      "Compostable at end of life",
    ],
    dimensions: "Set of 6 — 18\" × 28\" each",
    care: "Machine wash cold. Tumble dry low. No bleach.",
    inStock: true,
    featured: false,
  },
  {
    id: "9",
    slug: "stainless-steel-mixing-bowls",
    name: "Stainless Steel Mixing Bowls",
    price: 79,
    category: "Bakeware",
    material: "Stainless Steel",
    imageClass: "product-img-steel",
    rating: 4.8,
    reviewCount: 234,
    description: "5-piece nested stainless steel mixing bowls with non-slip bases.",
    longDescription: "Our stainless mixing bowl set is designed for the serious home cook. Polished 18/8 stainless steel is completely non-reactive — perfect for acidic ingredients like citrus or tomato. Each bowl has a silicone base ring that prevents slipping, a pour spout on the rim, and measurement markings.",
    features: [
      "18/8 stainless steel — non-reactive",
      "Set of 5: 1qt, 1.5qt, 3qt, 5qt, 8qt",
      "Silicone non-slip base on each bowl",
      "Pour spout and measurement markings",
      "Mirror polish interior",
      "Nests for compact storage",
    ],
    dimensions: "1, 1.5, 3, 5, 8 quart",
    care: "Dishwasher safe.",
    inStock: true,
    featured: false,
  },
  {
    id: "10",
    slug: "cast-iron-skillet",
    name: "Cast Iron Skillet (Preseasoned)",
    price: 89,
    category: "Cookware",
    material: "Cast Iron",
    imageClass: "product-img-iron",
    rating: 4.9,
    reviewCount: 478,
    badge: "Heritage",
    description: "Pre-seasoned cast iron skillet. The original non-stick — no coatings needed.",
    longDescription: "Cast iron is the original non-stick surface — and unlike PFAS-coated pans, it improves with every use. Our 12\" skillet is pre-seasoned with organic flaxseed oil in our foundry for immediate use. With proper care, this skillet will last multiple generations. Cast iron also adds beneficial dietary iron to your food.",
    features: [
      "Grade-A raw cast iron",
      "Pre-seasoned with organic flaxseed oil",
      "Naturally non-stick surface that improves over time",
      "Oven safe to 700°F",
      "Compatible with all cooktops including induction",
      "Helper handle for safe two-handed lifting",
    ],
    dimensions: "12\" diameter, 2\" deep",
    care: "Hand wash only. Dry thoroughly. Apply thin oil layer after each use.",
    inStock: true,
    featured: true,
  },
  {
    id: "11",
    slug: "ceramic-knife-set",
    name: "Ceramic Knife Set",
    price: 119,
    category: "Knives",
    material: "Zirconia Ceramic",
    imageClass: "product-img-ceramic",
    rating: 4.7,
    reviewCount: 143,
    badge: "Premium",
    description: "5-piece zirconia ceramic knife set. Non-reactive, ultra-sharp, and completely metal-free.",
    longDescription: "Zirconia ceramic blades are harder than steel, hold their edge 10× longer, and are completely non-reactive with food. Unlike steel knives, ceramic will never impart a metallic taste or leach any particles into your food. Our ergonomic handles are made from natural composite material — free from any plastics or synthetic resins.",
    features: [
      "Zirconia ceramic blades — 8.5 on Mohs scale",
      "Ultra-sharp factory edge",
      "Non-reactive with all foods",
      "Natural composite handles — plastic free",
      "Set of 5: chef, bread, utility, paring, boning",
      "Premium magnetic display block included",
    ],
    dimensions: "3\" to 8\" blade lengths",
    care: "Hand wash only. Ceramic is brittle — never twist or flex blade.",
    inStock: true,
    featured: false,
  },
  {
    id: "12",
    slug: "beeswax-food-wraps",
    name: "Beeswax Food Wraps",
    price: 29,
    category: "Food Storage",
    material: "Organic Beeswax",
    imageClass: "product-img-beeswax",
    rating: 4.6,
    reviewCount: 612,
    badge: "Zero Waste",
    description: "Reusable beeswax food wraps. The natural alternative to plastic wrap — infinitely better.",
    longDescription: "Made from GOTS-certified organic cotton infused with sustainably sourced beeswax, pine resin, and jojoba oil, these wraps mold to any shape with the warmth of your hands. They create a breathable but secure seal that keeps food fresh naturally. Each wrap can be used 200+ times and composts at end of life.",
    features: [
      "GOTS-certified organic cotton fabric",
      "Sustainably sourced beeswax + pine resin + jojoba oil",
      "Molds with hand warmth, re-stiffens when cool",
      "200+ uses per wrap",
      "Set of 5: 2 small + 2 medium + 1 extra large",
      "Compostable — zero plastic waste",
    ],
    dimensions: "Set of 5 — various sizes",
    care: "Wash with cool water and mild soap. Never use hot water or microwave.",
    inStock: true,
    featured: false,
  },
];

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (product: Product, count = 4): Product[] =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, count);

export const categories = [
  "All",
  "Cookware",
  "Cutting Boards",
  "Food Storage",
  "Utensils",
  "Knives",
  "Bakeware",
  "Coffee & Tea",
  "Textiles",
];

export const materials = [
  "All",
  "Stainless Steel",
  "Oak Wood",
  "Hard Maple",
  "Black Walnut",
  "Borosilicate Glass",
  "Cast Iron",
  "Zirconia Ceramic",
  "Organic Bamboo",
  "Organic Beeswax",
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    location: "Portland, OR",
    rating: 5,
    text: "I replaced every piece of plastic in my kitchen over 6 months. PureLife Kitchen made it effortless. The quality is genuinely on par with professional equipment. My cutting board is the most beautiful thing in my kitchen.",
    product: "Solid Oak Cutting Board",
    date: "January 2025",
    verified: true,
  },
  {
    id: "2",
    name: "James L.",
    location: "Austin, TX",
    rating: 5,
    text: "The cookware set is incredible. I was skeptical about giving up non-stick but stainless steel, once you learn it, is so much better. Nothing sticks if you heat it properly, and I never have to worry about what I'm eating.",
    product: "Stainless Steel Cookware Set",
    date: "February 2025",
    verified: true,
  },
  {
    id: "3",
    name: "Emily R.",
    location: "New York, NY",
    rating: 5,
    text: "The glass storage set transformed my fridge. Everything is visible, there's zero smell transfer, and my meal prep stays fresh so much longer than it did in plastic. Absolutely worth every penny.",
    product: "Borosilicate Glass Storage Set",
    date: "December 2024",
    verified: true,
  },
  {
    id: "4",
    name: "David K.",
    location: "Seattle, WA",
    rating: 5,
    text: "As a chef, I have high standards. The cast iron skillet is pre-seasoned perfectly — better than most I've seen. After 3 months of daily use it has developed an incredible patina. This is a forever pan.",
    product: "Cast Iron Skillet",
    date: "March 2025",
    verified: true,
  },
  {
    id: "5",
    name: "Priya N.",
    location: "San Francisco, CA",
    rating: 5,
    text: "I started switching after reading about microplastics in blood. PureLife Kitchen made the transition so easy — the products aren't just safer, they're genuinely better. The beeswax wraps are magical.",
    product: "Beeswax Food Wraps",
    date: "January 2025",
    verified: true,
  },
  {
    id: "6",
    name: "Marcus T.",
    location: "Chicago, IL",
    rating: 4,
    text: "The walnut utensil set is gorgeous and functional. My only wish is that they came in an even longer handle for my deep pots. The quality of the wood and finish is exceptional — no complaints there.",
    product: "Walnut Cooking Utensil Set",
    date: "February 2025",
    verified: true,
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "microplastics-in-your-kitchen",
    title: "The Hidden Danger in Your Kitchen: A Complete Guide to Microplastics",
    excerpt: "Recent studies have found microplastics in human blood, breast milk, and even the lungs. Your kitchen may be the #1 source. Here's what you need to know.",
    content: `
<h2>What Are Microplastics?</h2>
<p>Microplastics are plastic particles smaller than 5mm — invisible to the naked eye, yet present in virtually every ecosystem on Earth, including the human body. In 2022, researchers first detected microplastics in human blood. By 2024, they had been found in every organ studied, including the brain.</p>

<h2>Your Kitchen Is a Major Source</h2>
<p>A 2023 study in the journal <em>Environmental Science & Technology</em> found that a standard non-stick pan releases approximately 9,100 microplastic particles into food per minute when scratched with a metal utensil. Even "undamaged" non-stick cookware releases PTFE particles when heated above 260°C — a temperature easily reached in everyday cooking.</p>

<p>Plastic cutting boards are similarly problematic. Research published in <em>Environmental Pollution</em> found that a plastic cutting board sheds between 14 and 71 milligrams of microplastics per year during normal use — all of which ends up in your food.</p>

<h2>The Health Implications</h2>
<p>The health effects of microplastic ingestion are still being actively studied, but early research is alarming. A landmark 2024 study in the <em>New England Journal of Medicine</em> found that cardiovascular patients with high levels of microplastics in arterial plaque had a 4.5× higher risk of heart attack, stroke, or death compared to those with lower levels.</p>

<h2>Simple Swaps That Make All the Difference</h2>
<p>The good news is that eliminating microplastics from your kitchen doesn't require sacrificing functionality. Stainless steel, cast iron, wood, borosilicate glass, and ceramic are all excellent alternatives that perform as well or better than their plastic counterparts.</p>
    `,
    category: "Health & Science",
    author: "Dr. Amelia Chen",
    date: "March 15, 2025",
    readTime: 8,
    imageClass: "product-img-glass",
  },
  {
    id: "2",
    slug: "cast-iron-care-complete-guide",
    title: "The Complete Cast Iron Care Guide: Season, Cook, Repeat",
    excerpt: "Cast iron isn't difficult — it just requires understanding. Master these five principles and your skillet will outlast you.",
    content: `
<h2>Why Cast Iron Is the Original Non-Stick</h2>
<p>Cast iron cookware has been used for over 2,000 years for good reason. When properly seasoned, it develops a natural non-stick surface that actually improves with use — the polar opposite of PFAS-coated pans that degrade and shed chemicals over time.</p>

<h2>The Seasoning Process</h2>
<p>Seasoning is simply baked-in oil that has polymerized into a hard, slick coating. Our skillets come pre-seasoned with organic flaxseed oil, but building additional layers improves performance significantly. After each use, apply a tiny amount of oil and heat until it smokes briefly.</p>

<h2>Cleaning Myths Debunked</h2>
<p>You can use soap on cast iron. Modern dish soaps are not lye-based and will not strip seasoning. The real enemies are soaking in water (causes rust) and high-heat dishwashers. Wash with warm water, a brush, and mild soap, then dry immediately on the stovetop over low heat.</p>

<h2>What to Cook (and What to Avoid)</h2>
<p>Cast iron excels at searing, baking cornbread, frying, and anything that benefits from retained heat. Avoid cooking highly acidic foods (tomatoes, citrus) until your seasoning is very well established — acid can strip new seasoning and impart a metallic flavor.</p>
    `,
    category: "Cooking Tips",
    author: "Marcus Reid",
    date: "February 28, 2025",
    readTime: 6,
    imageClass: "product-img-iron",
  },
  {
    id: "3",
    slug: "zero-waste-kitchen-transition",
    title: "The 30-Day Zero-Plastic Kitchen: A Practical Transition Plan",
    excerpt: "You don't have to replace everything at once. Here's a realistic, budget-conscious 30-day plan to transition your kitchen.",
    content: `
<h2>Start With What You Touch Every Day</h2>
<p>The goal isn't perfection from day one — it's making meaningful progress. Start by identifying the three plastic items you interact with most in cooking. For most people, that's a cutting board, spatula, and food storage containers. Replacing these three has the biggest health impact.</p>

<h2>Week 1: Food Storage Revolution</h2>
<p>Replace plastic containers and bags with glass. This is often the easiest switch because glass storage is objectively better — you can see contents, there's no smell transfer, food lasts longer, and it goes from fridge to oven. Start with a 12-piece borosilicate glass set.</p>

<h2>Week 2: The Cutting Surface</h2>
<p>Your cutting board is ground zero for microplastic ingestion. Replace plastic with solid wood (oak, maple) or bamboo. End-grain boards are best for knives; edge-grain for heavy chopping.</p>

<h2>Week 3: Cooking Utensils</h2>
<p>Every plastic spatula, spoon, and scraper you have is shedding plastic into your hot food. Replace with wood or stainless steel. This is surprisingly affordable — a quality wood utensil set costs less than $70.</p>

<h2>Week 4: Cookware</h2>
<p>This is the biggest investment but also the most impactful. Non-stick cookware is the primary source of PFAS exposure in most kitchens. Transition to stainless steel, cast iron, or ceramic-coated alternatives.</p>
    `,
    category: "Lifestyle",
    author: "Sophie Williams",
    date: "February 10, 2025",
    readTime: 7,
    imageClass: "product-img-bamboo",
  },
  {
    id: "4",
    slug: "wood-vs-plastic-cutting-boards",
    title: "Wood vs. Plastic Cutting Boards: The Science Is Settled",
    excerpt: "For decades, we were told plastic cutting boards were more hygienic than wood. New research proves the opposite is true.",
    content: `
<h2>The Conventional Wisdom Was Wrong</h2>
<p>The FDA long recommended plastic cutting boards over wood, based on the assumption that smooth plastic surfaces were easier to sanitize. A landmark 1994 UC Davis study by food scientist Dean Cliver turned this assumption on its head — and subsequent research has only reinforced his findings.</p>

<h2>Wood's Natural Antimicrobial Properties</h2>
<p>Cliver discovered that bacteria drawn into the grain of wooden cutting boards die off rapidly and never re-emerge. Plastic boards, by contrast, retain bacteria in knife grooves and are nearly impossible to fully sanitize once scarred. The natural tannins and oils in hardwoods like oak, walnut, and maple are genuinely antimicrobial.</p>

<h2>The Microplastic Problem</h2>
<p>A 2023 study added a new dimension to this debate: every time you cut on a plastic board, you're shedding microplastics into your food. Researchers estimated that a well-used plastic cutting board can release over 50mg of microplastics per year — particles that end up in your meals and, ultimately, your body.</p>
    `,
    category: "Health & Science",
    author: "Dr. Amelia Chen",
    date: "January 22, 2025",
    readTime: 5,
    imageClass: "product-img-oak",
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "Why should I switch away from non-stick cookware?",
    answer: "Traditional non-stick cookware is coated with PTFE (Teflon) or similar fluoropolymers. When heated above 260°C — or scratched — these coatings release PFAS chemicals and microplastic particles into your food. PFAS are 'forever chemicals' that accumulate in your body over time. Our stainless steel and cast iron alternatives are completely inert and improve with age.",
    category: "Health",
  },
  {
    id: "2",
    question: "Is stainless steel cookware really non-stick?",
    answer: "With the right technique, yes. The key is preheating your pan properly before adding oil, then letting food come to room temperature before cooking. When you do this, most foods release effortlessly. Stainless steel also develops better flavor compounds (the Maillard reaction) than non-stick, making your food taste better.",
    category: "Cookware",
  },
  {
    id: "3",
    question: "How do you source your wood products sustainably?",
    answer: "All our wood products are sourced from FSC-certified forests in North America — primarily the Great Lakes region for maple and walnut, and Pacific Northwest for oak. Our supplier uses selective harvesting practices, replanting at a 3:1 ratio. We provide full chain-of-custody documentation for any wholesale customers.",
    category: "Sustainability",
  },
  {
    id: "4",
    question: "What is borosilicate glass and why is it better?",
    answer: "Borosilicate glass contains boron trioxide, which makes it extremely resistant to thermal shock — it won't crack when going from freezer to microwave. It's also chemically inert, meaning it won't leach any compounds into your food regardless of temperature or acidity. Standard tempered glass can release trace sodium and silica compounds under extreme conditions; borosilicate does not.",
    category: "Materials",
  },
  {
    id: "5",
    question: "How do I care for my wooden cutting board?",
    answer: "Hand wash with mild soap and warm water — never submerge or put in the dishwasher. Dry immediately with a towel, then stand upright to air-dry completely. Once a month (or when the wood looks dry), apply a generous coat of food-safe mineral oil or our conditioning blend, let it soak in for 4 hours, then wipe off excess. Properly maintained, your board will last decades.",
    category: "Care",
  },
  {
    id: "6",
    question: "Are your products dishwasher safe?",
    answer: "Our stainless steel products are dishwasher safe, though hand washing keeps them looking their best longer. Borosilicate glass containers are dishwasher safe (lids on top rack only). Bamboo lids for glass containers should be hand-washed. Wood and cast iron products should always be hand washed.",
    category: "Care",
  },
  {
    id: "7",
    question: "What is your return policy?",
    answer: "We offer a 60-day return window for all products in their original condition. For defective items, we offer lifetime replacement. Simply contact us at hello@purelifekitchen.com with your order number and we'll make it right — no questions asked.",
    category: "Orders",
  },
  {
    id: "8",
    question: "Do you offer free shipping?",
    answer: "Yes — free standard shipping on all orders over $75 within the continental United States. Expedited 2-day shipping is available for an additional $12. International shipping is available to Canada, UK, EU, and Australia.",
    category: "Orders",
  },
  {
    id: "9",
    question: "How do I season my cast iron skillet?",
    answer: "Your skillet arrives pre-seasoned and ready to use. To build additional layers: wash and dry the skillet, apply a very thin layer of flaxseed or vegetable oil all over (inside and out), then bake upside-down in a 450°F oven for 1 hour. Repeat this process 2–3 times for a robust initial seasoning. After that, simply cooking with fat maintains the seasoning naturally.",
    category: "Care",
  },
  {
    id: "10",
    question: "Are beeswax wraps safe for all foods?",
    answer: "Beeswax wraps are safe for all plant-based and cooked foods. However, they should not be used directly on raw meat, poultry, or fish — use a glass container or plate for these. The wraps should never be used in the microwave or with hot foods, as the warmth will cause them to lose their shape temporarily.",
    category: "Care",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────

export const microplasticStats: Stat[] = [
  {
    value: "5g",
    label: "Plastic Ingested Weekly",
    description: "The average person ingests approximately 5 grams of microplastics per week — the equivalent of a credit card.",
  },
  {
    value: "74%",
    label: "Of People Have Plastic in Blood",
    description: "A 2022 study found microplastics in the blood of 74% of tested individuals, including those who considered themselves health-conscious.",
  },
  {
    value: "9,100",
    label: "Particles Per Minute",
    description: "A scratched non-stick pan releases up to 9,100 microplastic particles per minute into your food while cooking.",
  },
  {
    value: "50mg",
    label: "Per Year from Cutting Boards",
    description: "A plastic cutting board sheds up to 50mg of microplastics per year during normal use — all ending up in your food.",
  },
];

export const brandStats = [
  { value: "50,000+", label: "Plastic-Free Kitchens" },
  { value: "12", label: "Curated Products" },
  { value: "4.8★", label: "Average Rating" },
  { value: "60-day", label: "Return Policy" },
];
