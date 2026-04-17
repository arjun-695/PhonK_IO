//Abstract data fetching behind a function — swap mock for real DB
//    later without touching a single component.
// MISTAKE: Fetching/defining data directly inside page components.
//    Kills reusability and makes testing impossible.

import { Product } from "@/types";
import { supportsFlags } from "motion";

// In production this would be : import {db} from "@/lib/db";
// we are using typed mock - same interface as a real query

const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "nova-x1",
    name: "Nova X1",
    tagline: "The Future in Your Hands",
    price: 999.99,
    originalPrice: 1299.99,
    category: "flagship",
    badge: "New",
    specs: {
      display: "6.7-inch Super Retina XDR",
      camera: "108MP Pro Camera System",
      processor: "A17 Bionic Chip",
      battery: "4800mAh",
      storage: "256GB",
    },
    colorOptions: ["#000000", "#FFFFFF", "#FF0000"],
    inStock: true,
    featured: true,
    image: "/images/nova-x1.png",
    rating: 4.9,
    reviewCount: 1234,
  },
  {
    id: "2",
    slug: "nova-x1-pro",
    name: "Nova X1 Pro",
    tagline: "The apex of mobile engineering",
    price: 1199,
    originalPrice: 1399,
    category: "flagship",
    badge: "New",
    specs: {
      display: '6.8" LTPO OLED 1-120Hz',
      camera: "200MP main + 50MP periscope",
      battery: "5500mAh · 100W wired",
      processor: "SnapX 9 Gen 3 Elite",
      storage: "256GB / 512GB / 1TB",
    },
    colorOptions: ["#1a1a2e", "#c0392b", "#2ecc71"],
    inStock: true,
    featured: true,
    image: "https://placehold.co/600x600/1a1a2e/ffffff?text=Nova+X1+Pro",
    rating: 4.0,
    reviewCount: 999,
  },
  {
    id: "3",
    slug: "nova-lite-3",
    name: "Nova Lite 3",
    tagline: "Smart by design. Light on your wallet.",
    price: 299,
    category: "budget",
    specs: {
      display: '6.1" IPS LCD 60Hz',
      camera: "50MP main",
      battery: "4500mAh · 18W",
      processor: "SnapX 4 Gen 2",
      storage: "64GB / 128GB",
    },
    colorOptions: ["#27ae60", "#e67e22"],
    inStock: true,
    featured: false,
    image: "https://placehold.co/600x600/27ae60/ffffff?text=Nova+Lite+3",
    rating: 4.2,
    reviewCount: 156,
  },
  {
    id: "4",
    slug: "nova-fold-1",
    name: "Nova Fold 1",
    tagline: "The future unfolds.",
    price: 1799,
    category: "flagship",
    badge: "Limited",
    specs: {
      display: '7.6" inner + 6.2" cover OLED',
      camera: "50MP main · triple rear",
      battery: "4400mAh · 25W",
      processor: "SnapX 9 Gen 3",
      storage: "512GB",
    },
    colorOptions: ["#1a1a1a", "#b8860b"],
    inStock: false,
    featured: true,
    image: "https://placehold.co/600x600/1a1a1a/ffffff?text=Nova+Fold+1",
    rating: 4.8,
    reviewCount: 45,
  },
];

// PRO: Functions are typed with return Promise<T> — never `any`
// PRO: Simulate async DB call — components use Suspense correctly this way

export async function getAllProducts() {
  // Simulating DB latency in dev to test loading states
  if (process.env.NODE_ENV === "development") {
    await new Promise((r) => setTimeout(r, 800));
  }
  return PRODUCTS;
}

export async function getFeaturedProducts() {
  await new Promise((r) => setTimeout(r, 400));
  return PRODUCTS.filter((p) => p.featured);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  await new Promise((r) => setTimeout(r, 400));
  return PRODUCTS.find((p) => p.slug === slug);
}

// PRO: generateStaticParams feeds [slug]/page.tsx for static generatio
// This function is imported in the route file, not here — but the data
// source is here, keeping the boundary clean.
export async function getAllProductSlugs(): Promise<string[]> {
  return PRODUCTS.map((p) => p.slug);
}
