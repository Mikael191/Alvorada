"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECTS: any[] = [];

const EVENTS: any[] = [];

export function Projects() {
    return (
        <section id="projetos" className="py-24 relative bg-paper">
            {/* Decorative vertical ink line */}
            <div className="absolute left-[5%] top-0 w-[1px] h-full bg-ink/10 hidden md:block" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-stamp uppercase mb-2">Nosso Trabalho</h2>
                        <h3 className="font-heading text-4xl lg:text-5xl text-ink font-bold max-w-2xl leading-tight">
                            Proposta de projetos e eventos
                        </h3>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Projects Editorial Grid */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                            className="bg-white w-full aspect-[2/1] min-h-[400px] border border-ink/10 flex flex-col items-center justify-center p-8 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-stamp/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <span className="font-heading text-6xl text-ink/10 font-bold mb-6 select-none leading-none">*</span>
                            <h4 className="font-heading text-2xl font-bold text-ink mb-3 text-center">Nenhuma proposta ativa</h4>
                            <p className="text-stone text-center max-w-md">O espaço de construção está aberto. Estamos recebendo e estruturando novas ideias para o semestre.</p>
                        </motion.div>
                    </div>

                    {/* Upcoming Events Column */}
                    <div className="lg:col-span-4 lg:pl-6 border-t lg:border-t-0 lg:border-l border-ink/10 pt-12 lg:pt-0 flex flex-col h-full">
                        <h4 className="font-heading text-2xl font-bold text-ink mb-8 flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-stamp" />
                            Próximos Eventos
                        </h4>

                        <div className="flex-1 flex flex-col items-start justify-center min-h-[250px] border-l-2 border-ink/10 pl-6 relative">
                            <div className="absolute top-1/2 -left-[9px] -translate-y-1/2 w-4 h-4 rounded-full bg-paper border-2 border-stone pb-2" />
                            <span className="text-sm font-bold tracking-widest text-stone uppercase mb-2">Agenda</span>
                            <h5 className="font-bold text-xl text-ink/40 mb-3">Sem eventos agendados</h5>
                        </div>

                        <motion.a
                            href="#ouvidoria"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 text-sm font-bold text-ink leading-none mt-10 hover:text-stamp transition-colors group"
                        >
                            Sugerir um evento
                            <span className="block w-6 h-[1px] bg-ink group-hover:bg-stamp group-hover:w-8 transition-all" />
                        </motion.a>
                    </div>

                </div>
            </div>
        </section>
    );
}
