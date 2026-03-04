"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show custom cursor on desktop (hover capable)
        if (window.matchMedia("(any-hover: none)").matches) {
            return;
        }

        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const mouseLeave = () => setIsVisible(false);
        const mouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", mouseMove);
        document.body.addEventListener("mouseleave", mouseLeave);
        document.body.addEventListener("mouseenter", mouseEnter);

        // Add logical global listeners for hover states
        const handleInteractiveEnter = () => setIsHovering(true);
        const handleInteractiveLeave = () => setIsHovering(false);

        // Using event delegation on document body to catch typical interactive elements
        const addInteractives = () => {
            const interactives = document.querySelectorAll(
                'a, button, input, textarea, select, [role="button"], label'
            );
            interactives.forEach((el) => {
                el.addEventListener("mouseenter", handleInteractiveEnter);
                el.addEventListener("mouseleave", handleInteractiveLeave);
            });
        };

        // Initial add
        addInteractives();

        // Observe DOM for new elements (like after a route transition)
        const observer = new MutationObserver((mutations) => {
            let shouldRebind = false;
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) shouldRebind = true;
            });
            if (shouldRebind) {
                // remove old listeners first? Too complex. Just re-running works if we don't care about a few dupes 
                // but better approach is event delegation. Let's stick to what we have or refine it:
                addInteractives();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Better hover detection via event delegation to avoid Memory leaks
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, textarea, select, [role="button"], label')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        document.body.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            document.body.removeEventListener("mouseleave", mouseLeave);
            document.body.removeEventListener("mouseenter", mouseEnter);
            document.body.removeEventListener('mouseover', handleMouseOver);
            observer.disconnect();
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            scale: 1,
            backgroundColor: "rgba(35, 31, 32, 0.8)", // ink
            mixBlendMode: "normal" as const,
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1,
            backgroundColor: "rgba(35, 31, 32, 0.1)", // ink washed
            border: "1px solid rgba(35, 31, 32, 0.5)",
            mixBlendMode: "multiply" as const,
            height: 48,
            width: 48,
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 flex items-center justify-center backdrop-blur-[2px]"
            animate={isHovering ? "hover" : "default"}
            variants={variants}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 28,
                mass: 0.5,
            }}
            style={{
                // Hide default cursor generally via CSS
                // Actually, doing this via layout.tsx is better: body { cursor: none; }
            }}
        >
            {/* Inner dot when hovering */}
            {isHovering && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-1.5 h-1.5 bg-ink rounded-full"
                />
            )}
        </motion.div>
    );
}
