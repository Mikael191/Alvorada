"use client";

import { motion } from "framer-motion";

export function DragonSumiE() {
    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center pointer-events-none opacity-90 mix-blend-multiply">
            {/* Abstract ink splash / stamp behind dragon */}
            <div
                className="absolute w-[80%] h-[80%] rounded-full bg-stamp opacity-5 blur-3xl animate-float"
                style={{ animationDelay: "1s" }}
            />

            <svg
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)]"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <linearGradient id="inkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#141414" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#141414" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="wabiSabi">
                        <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>

                <motion.g filter="url(#wabiSabi)">
                    {/* Main Dragon Body (S-Curve) */}
                    <motion.path
                        d="M 100,400 C 50,250 250,300 300,150 C 350,50 150,50 200,100 C 250,150 450,100 450,300 C 450,450 300,350 250,450"
                        fill="none"
                        stroke="url(#inkGrad)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />

                    {/* Dragon Spikes/Scales - Abstract Sumi-e strokes */}
                    <motion.path
                        d="M 120,380 L 90,360 M 150,330 L 110,310 M 200,290 L 180,250 M 270,180 L 300,140 M 220,90 L 250,50 M 390,150 L 440,120 M 430,220 L 480,200"
                        fill="none"
                        stroke="#141414"
                        strokeWidth="4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.7 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
                    />

                    {/* Dragon Eye / Red energy dot */}
                    <motion.circle
                        cx="210"
                        cy="110"
                        r="4"
                        fill="#C1322E"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5, duration: 1, delay: 2.5 }}
                    />
                </motion.g>
            </svg>
        </div>
    );
}
