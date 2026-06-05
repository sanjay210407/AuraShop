export const products = [
  {
    id: 1,
    name: "AeroPulse Hybrid Smartwatch",
    price: 189.99,
    rating: 4.8,
    reviewsCount: 124,
    category: "Electronics",
    description: "Experience the perfect fusion of classic horology and modern intelligence. The AeroPulse hybrid smartwatch features an elegant physical dial backed by a vibrant AMOLED display. Tracks heart rate, sleep quality, blood oxygen, and sports activities with an impressive 14-day battery life.",
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=600&auto=format&fit=crop&q=80",
    stock: 15,
    specs: {
      "Battery Life": "Up to 14 days",
      "Water Resistance": "5 ATM",
      "Display": "1.3-inch Hybrid AMOLED",
      "Connectivity": "Bluetooth 5.2"
    },
    reviews: [
      { id: 1, user: "Alex M.", rating: 5, comment: "Absolutely love the hybrid look! Feels like a premium watch, not just a gadget.", date: "2026-05-10" },
      { id: 2, user: "Sarah K.", rating: 4, comment: "Very good battery life, though the app sync takes a few seconds.", date: "2026-05-18" }
    ]
  },
  {
    id: 2,
    name: "SonicEscape Active ANC Headphones",
    price: 249.99,
    rating: 4.7,
    reviewsCount: 98,
    category: "Electronics",
    description: "Immerse yourself in pure high-fidelity audio. Engineered with industry-leading Active Noise Cancellation (ANC), SonicEscape neutralizes ambient sounds, allowing you to focus entirely on your music, work, or calls. Soft memory foam earcups provide premium comfort for long listening sessions.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    stock: 8,
    specs: {
      "Driver Size": "40mm Dynamic",
      "ANC Level": "Up to 38dB",
      "Battery Life": "40 hours (ANC on)",
      "Charging": "USB-C Quick Charge"
    },
    reviews: [
      { id: 1, user: "David L.", rating: 5, comment: "Noise cancellation is incredible. Used it on a 10-hour flight and forgot I was on a plane.", date: "2026-04-22" },
      { id: 2, user: "Elena R.", rating: 4, comment: "Sounds warm and detailed. Highs are crisp, bass is clean. A bit bulky.", date: "2026-05-02" }
    ]
  },
  {
    id: 3,
    name: "KeyCraft Custom Mechanical Keyboard",
    price: 135.00,
    rating: 4.9,
    reviewsCount: 62,
    category: "Electronics",
    description: "Elevate your typing experience. The KeyCraft keyboard is hot-swappable, features pre-lubed linear switches for a buttery-smooth feel, and includes double-shot PBT keycaps. Encased in an elegant CNC-milled aluminum chassis with customizable RGB backlighting.",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80",
    stock: 5,
    specs: {
      "Form Factor": "75% Layout",
      "Switches": "Pre-lubed Gateron Yellow (Linear)",
      "Hot-Swap": "Yes (3-pin & 5-pin support)",
      "Backlight": "South-facing RGB"
    },
    reviews: [
      { id: 1, user: "Marcus G.", rating: 5, comment: "The sound profile is beautiful. Absolute thock out of the box!", date: "2026-05-25" }
    ]
  },
  {
    id: 4,
    name: "UrbanDraft Minimalist Leather Pack",
    price: 110.00,
    rating: 4.6,
    reviewsCount: 84,
    category: "Fashion",
    description: "Carry your essentials in elegant sophistication. Crafted from full-grain vegetable-tanned leather, the UrbanDraft backpack is designed for the modern commuter. Features a padded 15.6-inch laptop pocket, quick-access hidden compartments, and ergonomic shoulder straps.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    stock: 12,
    specs: {
      "Material": "Full-Grain Leather",
      "Capacity": "18 Liters",
      "Laptop Slot": "Up to 16-inch Macbook Pro",
      "Hardware": "Heavy-duty YKK Zippers"
    },
    reviews: [
      { id: 1, user: "Liam W.", rating: 5, comment: "The leather ages beautifully. Getting comments on it everywhere I go.", date: "2026-03-15" }
    ]
  },
  {
    id: 5,
    name: "Nomad Denim Worker Jacket",
    price: 79.50,
    rating: 4.5,
    reviewsCount: 112,
    category: "Fashion",
    description: "Built for versatility and longevity. This worker jacket is tailored from 12oz organic raw denim, designed to break in and form to your body over time. Double-needle stitched flat felled seams ensure maximum durability, featuring classic button cuffs and deep utility pockets.",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80",
    stock: 20,
    specs: {
      "Material": "100% Organic Raw Denim",
      "Weight": "12 oz",
      "Fit": "Regular / Relaxed",
      "Care": "Cold wash, hang dry"
    },
    reviews: [
      { id: 1, user: "Chloe P.", rating: 4, comment: "Stiff at first, but after a month it feels tailored. Gorgeous wash.", date: "2026-04-12" }
    ]
  },
  {
    id: 6,
    name: "Solis Polarized Acetate Sunglasses",
    price: 65.00,
    rating: 4.4,
    reviewsCount: 45,
    category: "Fashion",
    description: "Make a timeless statement under the sun. Crafted with hand-polished cellulose acetate frames and reinforced five-barrel hinges. Outfitted with polarized scratch-resistant lenses that offer full 100% UVA/UVB protection, optimizing visual clarity and contrast.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80",
    stock: 18,
    specs: {
      "Frame Material": "Cellulose Acetate",
      "Lens": "Polarized Category 3",
      "UV Protection": "100% UVA / UVB",
      "Hinge": "Reinforced 5-barrel"
    },
    reviews: []
  },
  {
    id: 7,
    name: "TerraStone Artisan Coffee Set",
    price: 48.00,
    rating: 4.8,
    reviewsCount: 73,
    category: "Home & Living",
    description: "Enhance your morning ritual. This set includes four hand-thrown ceramic mugs with a matching tray. Features a beautiful reactive speckled glaze, meaning every individual piece displays its own unique organic pattern. Dishwasher and microwave safe.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    stock: 10,
    specs: {
      "Included": "4 Mugs, 1 Bamboo Wood Tray",
      "Capacity": "12 oz (350ml) per mug",
      "Material": "Stoneware Ceramic",
      "Finish": "Reactive Speckled Glaze"
    },
    reviews: [
      { id: 1, user: "Grace T.", rating: 5, comment: "They hold heat so well. The texture feels amazing in the hands.", date: "2026-05-15" }
    ]
  },
  {
    id: 8,
    name: "Lumina Smart LED Task Lamp",
    price: 95.00,
    rating: 4.7,
    reviewsCount: 51,
    category: "Home & Living",
    description: "Intelligent lighting designed to reduce eye strain. The Lumina task lamp features a dual-axis rotating arm, auto-brightness sensor that adjusts based on room lighting, and color temperature controls (2700K - 6500K). Syncs with smart assistants for voice control.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80",
    stock: 14,
    specs: {
      "Brightness": "Up to 800 Lumens",
      "Temp Range": "2700K - 6500K",
      "Smart Integrations": "Alexa, Google Home, Apple Homekit",
      "Extra": "Qi Wireless Charger on Base"
    },
    reviews: []
  },
  {
    id: 9,
    name: "ErgoComfort Task Office Chair",
    price: 349.99,
    rating: 4.8,
    reviewsCount: 156,
    category: "Home & Living",
    description: "Reclaim comfort during long workdays. Incorporating dynamic lumbar support that adapts to your back movements, a high-density mesh backrest for airflow, and 3D fully-adjustable armrests. Offers tilt locking and heavy-duty gas lift mechanism.",
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=80",
    stock: 4,
    specs: {
      "Weight Capacity": "Up to 300 lbs",
      "Material": "Reinforced Mesh & Nylon Core",
      "Base": "5-Star Aluminum Alloy",
      "Adjustments": "Seat depth, lumbar, armrest height/angle"
    },
    reviews: [
      { id: 1, user: "Robert D.", rating: 5, comment: "My lower back pain disappeared. Worth every single penny.", date: "2026-02-14" }
    ]
  },
  {
    id: 10,
    name: "EcoStride Premium Yoga Mat",
    price: 55.00,
    rating: 4.7,
    reviewsCount: 39,
    category: "Fitness & Outdoors",
    description: "Find your balance sustainably. Made from 100% natural, biodegradable tree cork and natural rubber base. Provides unparalleled non-slip grip that actually increases as you sweat. Free of toxic glues, PVC, or artificial softening agents.",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&auto=format&fit=crop&q=80",
    stock: 22,
    specs: {
      "Material": "Natural Oak Cork & Tree Rubber",
      "Dimensions": "72in x 24in (183cm x 61cm)",
      "Thickness": "4.5 mm",
      "Weight": "5.5 lbs"
    },
    reviews: []
  },
  {
    id: 11,
    name: "HydroFlow Insulated Flask (32oz)",
    price: 34.00,
    rating: 4.9,
    reviewsCount: 215,
    category: "Fitness & Outdoors",
    description: "Keep your beverages icy cold or steaming hot. Utilizing TempShield double-wall vacuum insulation, this flask keeps drinks cold for up to 24 hours and hot for up to 12. Made with pro-grade 18/8 food-grade stainless steel to ensure pure taste and no flavor transfer.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
    stock: 35,
    specs: {
      "Material": "18/8 Pro-Grade Stainless Steel",
      "Insulation": "Double-wall Vacuum",
      "Cap": "Leak-proof Flex Straw Cap",
      "Finish": "Color Last Powder Coat"
    },
    reviews: [
      { id: 1, user: "Justin V.", rating: 5, comment: "Does exactly what it says. Dropped it twice already, just a tiny scratch, paint is tough.", date: "2026-05-30" }
    ]
  },
  {
    id: 12,
    name: "ApexResistance Heavy Band Set",
    price: 28.50,
    rating: 4.6,
    reviewsCount: 47,
    category: "Fitness & Outdoors",
    description: "A complete mobile gym in a compact carrying bag. Includes 5 stackable latex tubes ranging from 10 lbs to 50 lbs, two foam handles, two comfortable ankle straps, a door anchor, and a training booklet. Perfect for building muscle, mobility work, and physical therapy.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    stock: 12,
    specs: {
      "Material": "100% Natural Malaysian Latex",
      "Lengths": "48 inches per band",
      "Included": "5 Bands (total 150 lbs resistance), Handles, Straps, Anchor, Bag",
      "Safety": "Anti-snap inner safety cord"
    },
    reviews: []
  }
];
