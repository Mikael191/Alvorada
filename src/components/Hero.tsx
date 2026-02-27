"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { DragonSumiE } from "./DragonSumiE";

export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.2]);

    return (
        <section
            id="inicio"
            className="relative min-h-screen flex items-center pt-24 overflow-hidden"
        >
            {/* Background Graphic Element - Wabi-sabi paper strip */}
            <div className="absolute top-0 right-[10%] w-[1px] h-full bg-stone/20 hidden lg:block" />
            <div className="absolute top-24 left-[5%] w-12 h-[80%] bg-stamp/5 -rotate-2 transform-origin-top mix-blend-multiply blur-[2px] rounded-sm hidden md:block" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-ink mb-6">
                                Construindo a<br />
                                <span className="text-stamp">Força</span> da Nossa<br />
                                Escola
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="text-lg sm:text-xl text-stone mb-10 max-w-xl font-normal"
                        >
                            Organização, escuta ativa e projetos reais. O Grêmio Alvorada é a ponte entre suas ideias e a transformação do nosso espaço.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                        >
                            <a
                                href="#projetos"
                                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-stamp text-paper px-8 py-3.5 rounded font-semibold transition-all hover:bg-ink hover:-translate-y-1 shadow-md"
                            >
                                Ver Projetos
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#ouvidoria"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-ink border-2 border-ink/20 px-8 py-3 rounded font-semibold transition-all hover:border-ink hover:bg-ink/5"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Enviar Sugestão
                            </a>
                        </motion.div>
                    </div>

                    {/* Graphic / Dragon area */}
                    <motion.div
                        className="w-full lg:w-1/2 md:h-[600px] flex justify-center items-center"
                        style={{ y, opacity }}
                    >
                        <div className="relative w-full max-w-[500px] aspect-square">
                            <DragonSumiE />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
