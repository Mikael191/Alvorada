"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECTS = [
    {
        title: "Campanha do Agasalho",
        category: "Ação Social",
        description: "Arrecadação e distribuição para comunidades carentes da região. Mais de 500 peças arrecadadas na última edição.",
        featured: true,
    },
    {
        title: "Mural de Oportunidades",
        category: "Carreira",
        description: "Espaço físico e digital com vagas de jovem aprendiz e dicas curriculares.",
        featured: false,
    },
    {
        title: "Melhoria dos Espaços",
        category: "Infraestrutura",
        description: "Revitalização da sala de leitura e área de convivência com novos pufes e mesas.",
        featured: false,
    },
];

const EVENTS = [
    {
        title: "Feira de Talentos 2026",
        date: "15 de Maio",
        time: "14h às 18h",
        location: "Pátio Central",
    },
    {
        title: "Abertura Interclasse",
        date: "02 de Junho",
        time: "08h",
        location: "Quadra Poliesportiva",
    },
    {
        title: "Assembleia Geral",
        date: "10 de Agosto",
        time: "10h30",
        location: "Auditório",
    }
];

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
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-stamp uppercase mb-2">Nosso Trabalho</h2>
                        <h3 className="font-heading text-4xl lg:text-5xl text-ink font-bold">
                            Projetos & Eventos
                        </h3>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Projects Editorial Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {PROJECTS.map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                                className={cn(
                                    "group relative bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-transparent hover:border-ink/10 cursor-pointer flex flex-col justify-between",
                                    project.featured ? "md:col-span-2 md:aspect-[2/1] bg-ink text-paper hover:border-ink" : "aspect-square"
                                )}
                            >
                                {/* Wabi sabi subtle edge on featured */}
                                {project.featured && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-stamp/10 rounded-bl-full pointer-events-none" />
                                )}

                                <div>
                                    <span className={cn(
                                        "inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase mb-6 rounded-sm",
                                        project.featured ? "bg-stamp text-paper" : "bg-paper text-stone border border-ink/10"
                                    )}>
                                        {project.category}
                                    </span>

                                    <h4 className={cn(
                                        "font-heading text-2xl font-bold mb-4 group-hover:underline decoration-2 underline-offset-4",
                                        project.featured ? "text-paper" : "text-ink"
                                    )}>
                                        {project.title}
                                    </h4>
                                    <p className={cn(
                                        "text-sm leading-relaxed max-w-lg",
                                        project.featured ? "text-paper/80" : "text-stone"
                                    )}>
                                        {project.description}
                                    </p>
                                </div>

                                <div className={cn(
                                    "mt-8 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity",
                                    project.featured ? "text-stamp" : "text-ink"
                                )}>
                                    <ArrowRight className="w-5 h-5 -translate-x-4 group-hover:translate-x-0 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Upcoming Events Column */}
                    <div className="lg:col-span-4 lg:pl-6 border-t lg:border-t-0 lg:border-l border-ink/10 pt-12 lg:pt-0">
                        <h4 className="font-heading text-2xl font-bold text-ink mb-8 flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-stamp" />
                            Próximos Eventos
                        </h4>

                        <div className="flex flex-col gap-8">
                            {EVENTS.map((event, i) => (
                                <motion.div
                                    key={event.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                                    className="group relative pl-6 border-l-2 border-ink/10 hover:border-stamp transition-colors cursor-default"
                                >
                                    <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full bg-paper border-2 border-ink group-hover:border-stamp group-hover:bg-stamp transition-colors" />

                                    <h5 className="font-bold text-lg text-ink mb-3 group-hover:text-stamp transition-colors">
                                        {event.title}
                                    </h5>

                                    <ul className="flex flex-col gap-2 text-sm text-stone">
                                        <li className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 opacity-50" />
                                            {event.date}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 opacity-50" />
                                            {event.time}
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 opacity-50" />
                                            {event.location}
                                        </li>
                                    </ul>
                                </motion.div>
                            ))}
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
