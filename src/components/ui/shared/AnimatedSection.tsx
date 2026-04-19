// Encapsulate scroll-reveal logic once. Every Section imports this.
// mistake: copy-pasting useInview + motion config into 10 different components - inevitably have 10 slightly different behaviours

"use client";
import { useRef } from "react";
import { motion , useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    // delay lets parent stagger multiple AnimatedSections
    delay?: number;
    // direction for the entrance
    direction?: "up" | "down" | "left" | "right";
    
}

const directionMap = {
    up: {y: 32, x: 0},
    down: {y: -32, x: 0},
    left: {y: 0, x: 32},
    right: {y: 0, x: -32},

};

export function AnimatedSection({
    children,
    className,
    delay = 0,
    direction= "up",

}:AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    //Pro: once: true - don't re-animate when user scrolls back up 
    // amount : 0.15 - trigger when 15% of element is visible.
    //this feels natural; 0.5 laggy on mobile

    const isInView = useInView(ref, {once: true, amount: 0.15});

    const offset = directionMap[direction];

    return (
        <motion.div    ref={ref}
        initial = {{opacity: 0, ...offset}}
        animate= {isInView? {opacity: 1, x: 0, y: 0 }: {}}
        transition = {{duration: 0.6, delay, 
            // ease array = cubic-bezier. [0.16, 1, 0.3, 1] is the 
            //"expo out" curve - fast start, graceful stop. 
            ease: [0.16, 1, 0.3, 1]
        }}  
        className={cn("", className)}
        >
            {children}
        </motion.div>
    );
}
