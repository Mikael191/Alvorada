"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "Início", href: "#inicio" },
    { name: "Quem Somos", href: "#quem-somos" },
    { name: "Projetos", href: "#projetos" },
    { name: "Avisos", href: "#avisos" },
    { name: "Ouvidoria", href: "#ouvidoria" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll state for styling
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-paper/90 backdrop-blur-md shadow-sm py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

                {/* Logo area */}
                <a href="#inicio" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-full border border-ink/10 transition-transform group-hover:scale-105">
                        <Image
                            src="/brand/logo-alvorada.png"
                            alt="Logo Grêmio Alvorada"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="font-heading font-bold text-lg tracking-tight text-ink hidden sm:block">
                        Grêmio Alvorada
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-sm font-medium text-stone hover:text-ink relative transition-colors duration-200 group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-stamp transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="https://instagram.com/gremioalvorada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold uppercase tracking-wider bg-ink text-paper px-5 py-2.5 rounded hover:bg-stamp transition-colors"
                    >
                        Falar no Instagram
                    </a>
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden p-2 text-ink"
                    onClick={() => setIsMobileMenuOpen(true)}
                    aria-label="Abrir menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-paper z-50 p-6 shadow-2xl md:hidden overflow-y-auto"
                        >
                            <div className="flex justify-end mb-8">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-stone hover:text-ink transition-colors"
                                    aria-label="Fechar menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <ul className="flex flex-col gap-6">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-lg font-heading text-ink hover:text-stamp transition-colors flex items-center border-b border-ink/10 pb-2"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12">
                                <a
                                    href="https://instagram.com/gremioalvorada"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center text-sm font-semibold uppercase tracking-wider bg-stamp text-paper px-5 py-4 rounded hover:bg-ink transition-colors"
                                >
                                    Falar no Instagram
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
