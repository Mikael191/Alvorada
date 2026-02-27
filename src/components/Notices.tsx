"use client";

import { motion } from "framer-motion";
import { Bell, AlertCircle, CalendarDays, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTICES = [
    {
        id: 1,
        title: "Inscrições abertas para o Campeonato Interclasse de Futsal",
        date: "Atualizado há 2 dias",
        type: "evento",
        content: "Atenção representantes de turma! As planilhas de inscrição já estão disponíveis na sala do grêmio (Bloco C). O prazo máximo para entrega das equipes formadas é até a próxima sexta-feira, dia 12. Não deixem para a última hora!",
        featured: true,
    },
    {
        id: 2,
        title: "Reunião de Representantes",
        date: "14 de Março",
        type: "reuniao",
        content: "Pauta: Calendário de provas bimestrais e feedback sobre a nova estrutura da cantina.",
        featured: false,
    },
    {
        id: 3,
        title: "Manutenção dos Bebedouros",
        date: "10 de Março",
        type: "urgente",
        content: "Os bebedouros do Bloco B entrarão em manutenção nesta quarta-feira. Usem os bebedouros do Bloco A.",
        featured: false,
    },
    {
        id: 4,
        title: "Edital: Voluntários para a Biblioteca",
        date: "05 de Março",
        type: "geral",
        content: "A biblioteca está buscando 4 alunos voluntários para ajudar na catalogação de novos livros no contraturno.",
        featured: false,
    }
];

const TypeIcon = ({ type }: { type: string }) => {
    switch (type) {
        case "urgente": return <AlertCircle className="w-4 h-4 text-stamp" />;
        case "reuniao": return <Users className="w-4 h-4 text-ink" />;
        case "evento": return <CalendarDays className="w-4 h-4 text-ink" />;
        default: return <Bell className="w-4 h-4 text-stone" />;
    }
};

const typeLabels: Record<string, string> = {
    urgente: "Urgente",
    reuniao: "Reunião",
    evento: "Evento",
    geral: "Geral",
};

export function Notices() {
    const featuredNotice = NOTICES.find(n => n.featured);
    const regularNotices = NOTICES.filter(n => !n.featured);

    return (
        <section id="avisos" className="py-24 relative bg-white overflow-hidden">
            {/* Subtle texture background */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] texture-seigaiha pointer-events-none opacity-50" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-stamp uppercase mb-2">Comunicação</h2>
                        <h3 className="font-heading text-4xl lg:text-5xl text-ink font-bold">
                            Quadro de Avisos
                        </h3>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Featured Notice */}
                    {featuredNotice && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="relative bg-paper p-8 sm:p-12 border-2 border-ink shadow-[4px_4px_0px_0px_#141414] h-full flex flex-col justify-center">
                                {/* Wabi Sabi detail */}
                                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-4 bg-stamp/20 blur-[1px] rotate-2" />

                                <div className="flex items-center gap-3 mb-6">
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-ink text-paper text-xs font-bold uppercase tracking-wider rounded-sm">
                                        <TypeIcon type={featuredNotice.type} />
                                        {typeLabels[featuredNotice.type]}
                                    </span>
                                    <span className="text-sm font-medium text-stone">{featuredNotice.date}</span>
                                </div>

                                <h4 className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-6 leading-tight">
                                    {featuredNotice.title}
                                </h4>

                                <p className="text-stone text-lg leading-relaxed">
                                    {featuredNotice.content}
                                </p>

                                <button className="mt-8 self-start border-b-2 border-ink pb-1 font-bold text-ink hover:text-stamp hover:border-stamp transition-colors uppercase tracking-wider text-sm">
                                    Ler comunicado completo
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Regular Notices List */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        {regularNotices.map((notice, i) => (
                            <motion.div
                                key={notice.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group relative bg-paper/50 p-6 border-l-4 border-ink/20 hover:border-stamp hover:bg-paper transition-all cursor-pointer"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                    <span className={cn(
                                        "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider w-fit px-2 py-0.5 rounded-sm",
                                        notice.type === 'urgente' ? "bg-stamp text-paper" : "bg-ink/5 text-ink"
                                    )}>
                                        <TypeIcon type={notice.type} />
                                        {typeLabels[notice.type]}
                                    </span>
                                    <span className="text-xs text-stone font-medium">{notice.date}</span>
                                </div>

                                <h5 className="font-heading text-xl font-bold text-ink mb-2 group-hover:text-stamp transition-colors">
                                    {notice.title}
                                </h5>
                                <p className="text-stone text-sm leading-relaxed line-clamp-2">
                                    {notice.content}
                                </p>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 flex justify-end"
                        >
                            <button className="text-sm font-bold text-ink hover:text-stamp transition-colors flex items-center gap-2">
                                Ver todos os avisos
                                <span className="font-serif">→</span>
                            </button>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
