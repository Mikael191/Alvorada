"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-paper pt-20 pb-8 relative overflow-hidden">
            {/* Decorative seigaiha pattern on bottom */}
            <div className="absolute bottom-0 left-0 w-full h-40 texture-seigaiha pointer-events-none opacity-20 mask-image-b-to-t" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">

                {/* Contact Big Section */}
                <div className="w-full max-w-2xl text-center mb-24">
                    <h3 className="font-heading text-3xl font-bold text-ink mb-8">
                        Acompanhe o grêmio diariamente
                    </h3>
                    <a
                        href="https://instagram.com/gremioalvorada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center gap-4 bg-ink text-paper px-8 sm:px-12 py-5 rounded-full font-bold text-lg sm:text-xl transition-transform hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-stamp translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10 flex items-center gap-3">
                            @gremioalvorada
                            <ArrowUpRight className="w-6 h-6" />
                        </span>
                    </a>
                </div>

                {/* Footer Links & Info */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-ink/10 pt-8 gap-6">

                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden grayscale opacity-80">
                            <Image src="/brand/logo-alvorada.png" alt="Selo" fill className="object-cover" />
                        </div>
                        <span className="font-heading font-bold text-ink tracking-widest text-sm uppercase">Grêmio Alvorada</span>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-6">
                        <a href="#inicio" className="text-sm font-medium text-stone hover:text-stamp transition-colors">Início</a>
                        <a href="#quem-somos" className="text-sm font-medium text-stone hover:text-stamp transition-colors">Quem Somos</a>
                        <a href="#projetos" className="text-sm font-medium text-stone hover:text-stamp transition-colors">Projetos</a>
                        <a href="#avisos" className="text-sm font-medium text-stone hover:text-stamp transition-colors">Avisos</a>
                        <a href="#ouvidoria" className="text-sm font-medium text-stone hover:text-stamp transition-colors">Ouvidoria</a>
                    </nav>

                    <div className="text-xs text-stone font-medium">
                        &copy; {new Date().getFullYear()} • Feito por alunos, para alunos.
                    </div>
                </div>

            </div>
        </footer>
    );
}
