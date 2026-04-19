// "use client" where interactivity is needed. Navbar needs useState for mobile meny -> client component.

"use client"

import {useState, useEffect} from "react";
import Link from "next/Link";
import {usePathname} from "next/navigation";
import {motion, AnimatePresence} from "motion/react";
import {Menu, X, Smartphone} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

const NAV_LINKS = [
    {href: "/", label: "HOME"},
    {href: "/products", label: "Products"},
    {href: "/about", label: "About"},
    {href: "/contact", label: "Contact"},
    
]as const;

// Memoize satic data outside component to prevent recreation on every render
// NAV_LINKS never changes, so it lives at module scope 

export function Navbar(){
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Throttle scroll handler - scroll fires 60fps, don't do heavy work inside. A simple boolean toggle is fine.
    // MISTAKE: Calling setSTate with actual scrollY value every scroll event cause 60 rerender/ second
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, {passive: true });
        return () => window.removeEventListener("scroll",onScroll);
        // PRO: passive : true ; tells browser ths handler won't call
        //  preventDefault() — browser can optimize scroll independently
    }, []);

    // Debounce mobile menu toggle - prevent rapid toggling
    // MISTAKE: Toggling setIsOpen directly in onClick without debouncing
    // Solution: Use a timeout to prevent rapid toggling

    // close mobile menu on route change 
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
        <header className={cn("fixed top-0 inset-x-0 z-50 transition-all duration-300",scrolled? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent")}>
                <nav className = "max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    
                </nav>
            </header>
        </>
    )
    

}