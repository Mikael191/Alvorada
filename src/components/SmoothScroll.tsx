"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08, // Adjusts the interpolation, lower means smoother and slower
                duration: 1.2, // Duration of the scroll animation
                smoothWheel: true,
                wheelMultiplier: 1,
            }}
        >
            {children}
        </ReactLenis>
    );
}
