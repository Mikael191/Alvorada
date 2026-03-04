"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, Trophy, Palette, PartyPopper, MessageCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    {
        title: "Ações Solidárias e Comunidade",
        icon: Heart,
        items: [
            { name: "Páscoa Solidária & Campanha do Agasalho", desc: "Arrecadação de alimentos e roupas. A sala que mais arrecadar ganhará um prêmio especial!", objective: "Exercitar a cidadania e ajudar famílias carentes." },
            { name: "Palestras Interativas", desc: "Convidados externos para falar sobre temas atuais (carreira, saúde mental, tecnologia).", objective: "Trazer conhecimentos práticos que vão além dos livros." }
        ]
    },
    {
        title: "Esportes e Integração",
        icon: Trophy,
        items: [
            { name: "Interclasse e Interescola", desc: "Torneios esportivos de Vôlei/Futebol entre salas e escolas convidadas.", objective: "Promover a saúde, o espírito de equipe e o orgulho." },
            { name: "Gincanas Escolares", desc: "Competições de agilidade, raciocínio e trabalho em grupo.", objective: "Quebrar a rotina escolar com diversão e união." }
        ]
    },
    {
        title: "Cultura, Ciência e Arte",
        icon: Palette,
        items: [
            { name: "Feira Cultural & de Ciências", desc: "Exposições de projetos artísticos e experimentos.", objective: "Dar visibilidade à criatividade e ao esforço acadêmico." },
            { name: "Sarau & Show de Talentos", desc: "Espaço aberto para música, dança, poesia e apresentações.", objective: "Descobrir e valorizar talentos 'escondidos'." }
        ]
    },
    {
        title: "Datas Comemorativas e Lazer",
        icon: PartyPopper,
        items: [
            { name: "Festas Temáticas", desc: "Celebrações (Junina, Halloween, Primavera, Natal) com decorações, comidas e música.", objective: "Criar memórias inesquecíveis e bem-estar." },
            { name: "Dia de Cinema na Escola", desc: "Exibição de filmes com debate e pipoca.", objective: "Proporcionar cultura e lazer no ambiente escolar." },
            { name: "Ações Especiais", desc: "Correio Elegante, Copa do Mundo, Semana das Crianças.", objective: "Manter o ambiente vibrante e conectado." }
        ]
    },
    {
        title: "Debates e Diálogo",
        icon: MessageCircle,
        items: [
            { name: "Rodas de Conversa e Competições", desc: "Rodas sobre temas atuais e de interesse dos estudantes.", objective: "Desenvolver a capacidade de argumentação e o respeito." }
        ]
    }
];

export function Projects() {
    return (
        <section id="projetos" className="py-24 relative bg-paper">
            <div className="absolute left-[5%] top-0 w-[1px] h-full bg-ink/10 hidden md:block" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full max-w-6xl">
                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-stamp uppercase mb-2">Chapa Alvorada 🐉</h2>
                        <h3 className="font-heading text-4xl lg:text-5xl text-ink font-bold leading-tight">
                            Nossas Propostas
                        </h3>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="bg-white border border-ink/10 p-6 sm:p-8 hover:border-stamp/40 transition-colors group"
                        >
                            <div className="flex items-center gap-4 mb-6 border-b border-ink/5 pb-4">
                                <div className="p-3 bg-stamp/5 rounded-full text-stamp">
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-heading text-2xl font-bold text-ink">{cat.title}</h4>
                            </div>

                            <ul className="space-y-6">
                                {cat.items.map((item, j) => (
                                    <li key={j} className="flex flex-col">
                                        <h5 className="font-bold text-ink mb-1 text-lg">{item.name}</h5>
                                        <p className="text-stone text-sm mb-2"><span className="font-semibold text-ink/70">O que é:</span> {item.desc}</p>
                                        <p className="text-stone/80 text-sm italic"><span className="font-semibold text-stamp/80">Objetivo:</span> {item.objective}</p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Important Disclaimer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full bg-ink text-paper p-6 sm:p-8 relative overflow-hidden"
                >
                    <div className="absolute inset-0 opacity-10 mix-blend-color-dodge bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                        <AlertCircle className="w-12 h-12 text-stamp shrink-0" />
                        <div>
                            <h4 className="font-bold uppercase tracking-widest text-stamp mb-2 text-sm">Nota Importante - Transparência</h4>
                            <p className="text-paper/80 leading-relaxed text-sm md:text-base">
                                Todas as atividades listadas acima são propostas e ideias da nossa chapa. Nosso compromisso é lutar para que todas aconteçam, porém, a realização de cada evento depende de autorização da direção, disponibilidade de datas e arrecadação de recursos financeiros. Transparência e pé no chão são nossos lemas: <strong>faremos o máximo para entregar a melhor experiência possível!</strong>
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
