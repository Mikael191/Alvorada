"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Instagram, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { submitFeedback, type OuvidoriaData } from "@/actions/ouvidoria";
import { cn } from "@/lib/utils";
import MagneticButton from "./ui/MagneticButton";

export function Feedback() {
    const [loading, setLoading] = useState(false);
    const [successStatus, setSuccessStatus] = useState<"idle" | "copied">("idle");

    const [formData, setFormData] = useState<OuvidoriaData>({
        type: "sugestao",
        message: "",
        name: "",
        grade: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.message.trim()) return;

        setLoading(true);
        try {
            // Map type correctly
            const mappedType = formData.type === "sugestao" ? "IDEA" : formData.type === "reclamacao" ? "COMPLAINT" : "PROJECT";

            const payload = {
                title: `${formData.type.toUpperCase()} - ${new Date().toLocaleDateString("pt-BR")}`,
                content: formData.message,
                type: mappedType,
                isAnonymous: true
            };

            const res = await fetch("/api/suggestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSuccessStatus("copied");
                setFormData({ type: "sugestao", message: "", name: "", grade: "" });
            } else {
                console.error("Failed to submit", await res.text());
            }

        } catch (err) {
            console.error("Failed to submit", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="ouvidoria" className="py-24 relative bg-ink text-paper">

            {/* Texture for dark mode */}
            <div className="absolute inset-0 opacity-10 mix-blend-color-dodge bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">

                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">

                    {/* Text Area */}
                    <div className="w-full md:w-5/12 pt-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-paper/10 rounded-full mb-6">
                                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-stamp" />
                            </div>
                            <h3 className="font-heading text-4xl font-bold mb-4">Ouvidoria</h3>
                            <p className="text-paper/70 text-lg leading-relaxed mb-6">
                                Este é o seu canal direto com a gestão. Sugestões, críticas construtivas e elogios são sempre avaliados para melhorarmos ainda mais nossa escola.
                            </p>
                            <div className="p-4 border-l-2 border-stamp bg-paper/5">
                                <p className="text-sm text-paper/80 italic">
                                    Todas as mensagens são enviadas de forma segura e armazenadas em nosso painel oficial. Caso não queira se identificar, você pode enviar anonimamente.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Form Area */}
                    <div className="w-full md:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-paper p-6 sm:p-8 shadow-xl relative"
                        >
                            <div className="absolute top-0 right-0 w-8 h-8 bg-stamp" />{/* Corner detailing */}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-ink" htmlFor="type">
                                        Tipo de Contato
                                    </label>
                                    <select
                                        id="type"
                                        className="bg-transparent border-b-2 border-ink pb-2 text-ink text-lg font-medium outline-none focus:border-stamp transition-all duration-300 focus:pl-2"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        disabled={loading || successStatus === 'copied'}
                                    >
                                        <option value="sugestao">Ideia / Sugestão</option>
                                        <option value="reclamacao">Reclamação ou Alerta</option>
                                        <option value="elogio">Elogio</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold uppercase tracking-wider text-ink" htmlFor="message">
                                        Sua Mensagem
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder="Descreva aqui com detalhes..."
                                        className="bg-transparent border-2 border-ink/20 p-4 text-ink outline-none focus:border-ink transition-all duration-300 focus:-translate-y-1 focus:shadow-md resize-none placeholder:text-stone/50"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        disabled={loading || successStatus === 'copied'}
                                    />
                                </div>

                                <div className="pt-4">
                                    {successStatus === 'idle' ? (
                                        <MagneticButton strength={0.05} className="w-full">
                                            <button
                                                type="submit"
                                                className="w-full flex items-center justify-center gap-2 bg-ink text-paper py-4 font-bold uppercase tracking-wider hover:bg-stamp transition-transform duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                                                disabled={loading || !formData.message.trim()}
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageSquare className="w-5 h-5" />}
                                                {loading ? "Enviando..." : "Enviar para a Gestão"}
                                            </button>
                                        </MagneticButton>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="w-full flex items-center justify-center gap-2 bg-green-600/10 border-2 border-green-600 text-green-700 py-3 font-bold">
                                                <CheckCircle2 className="w-5 h-5" />
                                                Mensagem Recebida com Sucesso!
                                            </div>
                                            <button
                                                type="button"
                                                className="text-stone underline text-sm mt-2 font-bold uppercase"
                                                onClick={() => setSuccessStatus('idle')}
                                            >
                                                Enviar Nova Mensagem
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
