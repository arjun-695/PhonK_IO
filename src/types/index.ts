// Centralize shared types. Co-locate Component-specific types with the component. Only shared/cross-cutting types live here.

export interface Product {
    id: string;
    slug: string; // URL-safe identifier - used in [slug] route
    name: string;
    tagline: string;
    price: number;
    originalPrice?: number; //Optional - for strikethrough pricing 
    category: "flagship" | "mid-range" | "budget";
    badge?: string;
    specs: {
        display: string;
        camera: string;
        processor: string;
        battery: string;
        storage: string;
    };
    colorOptions: string[];     //hex codes
    instock: boolean;
    featured: boolean;
    image: string; // path to product image
    rating: number;
    reviewCount: number;    
}

// PRO: ApiResponse<T> generic wrapper — all API routes return this shape.
//      Makes client-side error handling consistent and predictable.
// MISTAKE: Every API route returning different shapes,
//    forcing consumers to guess what fields exist on error vs success.

export type ApiResponse<T> = 
    | { success: true; data: T; }
    | { success: false; error: string;code?: string};

// PRO: Cart Item Type - matches CartContext state shape
export interface CartItem extends Product {
    quantity: number;
    selectedColor: string;
}