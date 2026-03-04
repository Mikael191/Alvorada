"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, CheckCircle2, Menu, X, Instagram, User, LogOut } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import MagneticButton from "./ui/MagneticButton";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "Início", href: "#inicio" },
    { name: "Quem Somos", href: "#quem-somos" },
    { name: "Propostas", href: "#projetos" },
    { name: "Avisos", href: "#avisos" },
    { name: "Ouvidoria", href: "#ouvidoria" },
];

export function Header() {
    const { data: session, status } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const handleCopyPix = async () => {
        // This function was incomplete in the provided diff, keeping it as is.
    };

    // Handle scroll state for styling
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 bg-transparent border-none pointer-events-none"
        >
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between pointer-events-auto">

                {/* Logo & Title */}
                <MagneticButton strength={0.1}>
                    <a href="#inicio" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image src="/brand/logo-alvorada.png" alt="Selo Grêmio" fill className="object-cover" />
                        </div>
                        <span className="font-heading font-bold text-ink tracking-widest text-lg md:text-xl uppercase">Grêmio Alvorada</span>
                    </a>
                </MagneticButton>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-sm font-medium text-stone hover:text-ink relative transition-all duration-300 hover:scale-105 group origin-left inline-block"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-[0px] h-[2px] bg-stamp transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Action & Mobile Toggle */}
                    <div className="hidden md:flex items-center gap-4">
                        <MagneticButton strength={0.2}>
                            <a
                                href="https://instagram.com/gremioalvorada"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-center gap-2 bg-ink text-paper px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition-all hover:bg-stamp hover:shadow-lg hover:-translate-y-0.5"
                            >
                                Falar no Instagram
                            </a>
                        </MagneticButton>
                        <div className="relative">
                            <MagneticButton strength={0.2}>
                                {status === "authenticated" && session.user ? (
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center justify-center p-2.5 rounded-full border border-ink bg-ink text-paper hover:bg-ink/90 transition-all cursor-pointer"
                                        aria-label="Perfil do Usuário"
                                    >
                                        <User className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <a
                                        href="/login"
                                        className="flex items-center justify-center p-2.5 rounded-full border border-ink/20 text-ink transition-all hover:bg-ink hover:text-paper cursor-pointer"
                                        aria-label="Login ou Cadastro"
                                    >
                                        <User className="w-5 h-5" />
                                    </a>
                                )}
                            </MagneticButton>

                            {/* User Profile Dropdown */}
                            <AnimatePresence>
                                {isProfileOpen && status === "authenticated" && session.user && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-64 bg-paper border border-ink/10 shadow-xl overflow-hidden z-50 rounded"
                                    >
                                        <div className="p-4 border-b border-ink/10 bg-ink/5">
                                            <p className="font-bold text-ink truncate">{session.user.name}</p>
                                            {session.user.room && (
                                                <p className="text-sm text-stone truncate">Sala: {session.user.room}</p>
                                            )}
                                        </div>
                                        <div className="p-2">
                                            <button
                                                onClick={() => {
                                                    signOut({ callbackUrl: '/' });
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 font-bold hover:bg-red-50 rounded transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sair / Desconectar
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden p-2 text-ink"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Abrir menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-paper z-50 p-6 shadow-2xl md:hidden overflow-y-auto pointer-events-auto"
                        >
                            <div className="flex justify-end mb-8">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
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
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-lg font-heading text-ink hover:text-stamp transition-colors flex items-center border-b border-ink/10 pb-2"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 flex flex-col gap-4">
                                {status === "authenticated" && session.user ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col items-center justify-center p-4 bg-ink/5 border border-ink/10 rounded">
                                            <div className="bg-ink text-paper p-3 rounded-full mb-3">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <p className="font-bold text-ink text-center">{session.user.name}</p>
                                            {session.user.room && (
                                                <p className="text-sm text-stone text-center mb-4">Sala: {session.user.room}</p>
                                            )}
                                            <button
                                                onClick={() => {
                                                    signOut({ callbackUrl: '/' });
                                                    setIsMenuOpen(false);
                                                }}
                                                className="flex items-center justify-center gap-2 w-full text-center text-sm font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 px-5 py-3 rounded hover:bg-red-100 transition-colors duration-300"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sair / Desconectar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href="/login"
                                        className="flex items-center justify-center gap-3 w-full text-center text-sm font-semibold uppercase tracking-wider border border-ink text-ink px-5 py-4 rounded hover:bg-ink/5 transition-colors duration-300"
                                    >
                                        <User className="w-5 h-5" />
                                        Entrar / Cadastro
                                    </a>
                                )}
                                <a
                                    href="https://instagram.com/gremioalvorada"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center text-sm font-semibold uppercase tracking-wider border border-ink bg-stamp text-paper px-5 py-4 rounded hover:bg-paper hover:text-ink transition-colors duration-300"
                                >
                                    Falar no Instagram
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
