export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  type: "gold" | "silver";
  description: string;
}

export interface Collection {
  id: string;
  title: string;
  image: string;
  description: string;
  tag: string;
}

export const GOLD_CATEGORIES = [
  "Gold Chains",
  "Gold Rings",
  "Gold Bangles",
  "Gold Earrings",
  "Bridal Gold Jewellery"
];

export const SILVER_CATEGORIES = [
  "Silver Anklets",
  "Silver Rings",
  "Silver Chains",
  "Silver Necklaces",
  "Silver Pooja Items",
  "Silver Gift Items"
];

export const COLLECTIONS: Collection[] = [
  {
    id: "bridal",
    title: "Bridal Collection",
    image: "/collection-images/bridal-antique-necklace-set.webp",
    description: "Royal, heavy-crafted masterpieces designed for your most precious day. Elaborate chokers, long harams, and matching accessories.",
    tag: "Exquisite Craft"
  },
  {
    id: "daily-wear",
    title: "Daily Wear Collection",
    image: "/collection-images/daily-wear-gold-choker.jpg",
    description: "Lightweight, sleek, and minimalist gold & silver structures for the modern lifestyle. Effortless style meets durability.",
    tag: "Modern Lightweight"
  },
  {
    id: "traditional",
    title: "Traditional Collection",
    image: "/collection-images/traditional-pendant-set.webp",
    description: "Rich heritage-inspired temple jewellery and antique finishes reflecting Southern cultural excellence and majestic designs.",
    tag: "South Indian Classic"
  },
  {
    id: "kids",
    title: "Kids Collection",
    image: "/collection-images/kids-collection.avif",
    description: "Delicate gold waist chains (Aranjanam), cute baby bangles, and whimsical studs designed for ultimate comfort and skin safety.",
    tag: "Delicate & Safe"
  },
  {
    id: "gift",
    title: "Gift Collection",
    image: "/collection-images/gift-collection.webp",
    description: "Perfect tokens of love. Gold coins, silver frames, and premium gift articles for every celebration.",
    tag: "Tokens of Love"
  }
];

export const GOLD_PRODUCTS: Product[] = [
  {
    id: "g1",
    title: "Elegant Royal Haram",
    category: "Bridal Gold Jewellery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
    type: "gold",
    description: "A breathtaking traditional gold chain with fine hand-carved details and elegant dangling beads."
  },
  {
    id: "g2",
    title: "Classic Mango Necklace",
    category: "Bridal Gold Jewellery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
    type: "gold",
    description: "Traditional south Indian manga malai style chain embedded with brilliant synthetic rubies."
  },
  {
    id: "g3",
    title: "Sovereign Gold Chain",
    category: "Gold Chains",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
    type: "gold",
    description: "Unisex classic rope design gold chain, perfect for everyday use and festive matching."
  },
  {
    id: "g4",
    title: "Classic Bridal Bangles (Set of 4)",
    category: "Gold Bangles",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    type: "gold",
    description: "Antique finished broad bangles highlighting Indian artisan mastery and filigree carving."
  },
  {
    id: "g5",
    title: "Jhumka Drop Earrings",
    category: "Gold Earrings",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=600",
    type: "gold",
    description: "Gorgeous umbrella-shaped traditional Jhumkas with soft golden hangings and intricate lining."
  },
  {
    id: "g6",
    title: "Imperial Ruby Ring",
    category: "Gold Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    type: "gold",
    description: "Majestic floral ring setting centering an exquisite red ruby stone bordered by gold petals."
  },
  {
    id: "g7",
    title: "Modern Gold Studs",
    category: "Gold Earrings",
    image: "/gold-products/modern-gold-studs.webp",
    type: "gold",
    description: "Star-patterned daily wear gold earrings, extremely comfortable and highly polished."
  },
  {
    id: "g8",
    title: "Royal Peacock Ring",
    category: "Gold Rings",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600",
    type: "gold",
    description: "Contemporary 18C dual-tone gold ring depicting a magnificent peacock pattern with glossy work."
  }
];

export const SILVER_PRODUCTS: Product[] = [
  {
    id: "s1",
    title: "Antique Krishna Silver Idol",
    category: "Silver Gift Items",
    image: "/silver-products/silver-krishna-idol.webp",
    type: "silver",
    description: "A detailed Krishna idol with ornate temple arch work, peacock motifs, and antique oxidised finish."
  },
  {
    id: "s2",
    title: "Traditional Silver Kuthu Vilakku Pair",
    category: "Silver Pooja Items",
    image: "/silver-products/silver-lamp-pair.jpg",
    type: "silver",
    description: "Elegant paired pooja lamps with polished silver shine and auspicious top detailing."
  },
  {
    id: "s3",
    title: "Carved Silver Kalasam Pot",
    category: "Silver Pooja Items",
    image: "/silver-products/silver-kalasam.jpeg",
    type: "silver",
    description: "Hand-carved silver kalasam with floral engraving, ideal for pooja rituals and gifting."
  },
  {
    id: "s4",
    title: "Peacock Deepam Silver Lamps",
    category: "Silver Pooja Items",
    image: "/silver-products/silver-peacock-lamps.webp",
    type: "silver",
    description: "Majestic silver deepam pair with peacock and elephant sculptural details for festive pooja decor."
  },
  {
    id: "s5",
    title: "Sterling Ring & Pendant Selection",
    category: "Silver Rings",
    image: "/silver-products/silver-rings-pendants.jpeg",
    type: "silver",
    description: "Bright modern sterling silver rings, pendants, and lightweight pieces for daily wear."
  },
  {
    id: "s6",
    title: "Antique Floral Silver Bowl",
    category: "Silver Gift Items",
    image: "/silver-products/silver-floral-bowl.jpeg",
    type: "silver",
    description: "Decorative silver bowl with raised floral carving and elephant side handles."
  },
  {
    id: "s7",
    title: "Antique Bridal Silver Necklace",
    category: "Silver Necklaces",
    image: "/silver-products/silver-necklace-set.jpeg",
    type: "silver",
    description: "Statement antique silver necklace with temple-inspired motifs and ruby accent stones."
  },
  {
    id: "s8",
    title: "Minimal Silver Chain & Bracelet",
    category: "Silver Chains",
    image: "/silver-products/silver-chain-bracelet.webp",
    type: "silver",
    description: "Clean sterling silver chain and bracelet combo with a refined contemporary finish."
  }
];
