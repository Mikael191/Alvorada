"use client";

import { motion } from "framer-motion";
import { Bell, AlertCircle, CalendarDays, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTICES: any[] = [];

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

                    <div className="flex justify-center items-center w-full min-h-[400px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                            className="relative bg-paper w-full max-w-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center group overflow-hidden border border-ink/5"
                        >
                            {/* Wabi Sabi detail */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-stamp/5 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-110 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-ink/5 rounded-tr-[80px] transition-transform duration-700 group-hover:scale-110 pointer-events-none" />

                            <Bell className="w-12 h-12 text-ink/20 mb-8" />
                            <h4 className="font-heading text-3xl sm:text-5xl font-bold text-ink mb-6 tracking-tight">
                                Nenhum Aviso
                            </h4>
                            <p className="text-stone text-lg max-w-lg mx-auto leading-relaxed">
                                O silêncio também comunica. No momento, o quadro de avisos está livre de novas atualizações.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
