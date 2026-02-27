"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Instagram, CheckCircle2, MessageSquare, Loader2 } from "lucide-react";
import { submitFeedback, type OuvidoriaData } from "@/actions/ouvidoria";
import { cn } from "@/lib/utils";

export function Feedback() {
    const [loading, setLoading] = useState(false);
    const [successStatus, setSuccessStatus] = useState<"idle" | "copied">("idle");
    const [showIdentify, setShowIdentify] = useState(false);

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
            // 1. Send to our Server Action (which logs it and ideally will save to DB)
            const res = await submitFeedback(formData);

            // 2. Format and Copy to Clipboard locally for immediately sending via Instagram DX
            if (res.success && res.formattedText) {
                await navigator.clipboard.writeText(res.formattedText);
            }

            setSuccessStatus("copied");

            // Reset form
            setFormData({ type: "sugestao", message: "", name: "", grade: "" });
            setShowIdentify(false);

        } catch (err) {
            console.error("Failed to copy text or submit", err);
            // fallback error handling
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
                                    Ao enviar, a mensagem será estruturada e copiada para a sua área de transferência para você nos enviar diretamente por DM no Instagram garantindo a comunicação!
                                    No futuro, ela ficará arquivada em nosso painel oficial.
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
                                        className="bg-transparent border-b-2 border-ink pb-2 text-ink text-lg font-medium outline-none focus:border-stamp transition-colors"
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
                                        className="bg-transparent border-2 border-ink/20 p-4 text-ink outline-none focus:border-ink transition-colors resize-none placeholder:text-stone/50"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        disabled={loading || successStatus === 'copied'}
                                    />
                                </div>

                                <div className="flex items-center justify-between py-2 border-b border-ink/10">
                                    <span className="text-sm font-bold uppercase tracking-wider text-ink">Quero me identificar</span>
                                    <button
                                        type="button"
                                        onClick={() => setShowIdentify(!showIdentify)}
                                        className={cn(
                                            "relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none",
                                            showIdentify ? "bg-stamp" : "bg-stone"
                                        )}
                                        disabled={loading || successStatus === 'copied'}
                                    >
                                        <span className={cn(
                                            "absolute top-1 left-1 w-4 h-4 rounded-full bg-paper transition-transform duration-200",
                                            showIdentify ? "translate-x-6" : "translate-x-0"
                                        )} />
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {showIdentify && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="flex flex-col sm:flex-row gap-4 overflow-hidden"
                                        >
                                            <div className="flex-1 flex flex-col gap-1">
                                                <input
                                                    type="text"
                                                    placeholder="Seu Nome (Opcional)"
                                                    className="bg-transparent border-b-2 border-ink/20 pb-2 text-ink outline-none focus:border-ink text-sm"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    disabled={loading || successStatus === 'copied'}
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-1">
                                                <input
                                                    type="text"
                                                    placeholder="Sua Turma (Ex: 3º B)"
                                                    className="bg-transparent border-b-2 border-ink/20 pb-2 text-ink outline-none focus:border-ink text-sm"
                                                    value={formData.grade}
                                                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                                    disabled={loading || successStatus === 'copied'}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit / Action Button */}
                                <div className="pt-4">
                                    {successStatus === 'idle' ? (
                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center gap-2 bg-ink text-paper py-4 font-bold uppercase tracking-wider hover:bg-stamp transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                            disabled={loading || !formData.message.trim()}
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Copy className="w-5 h-5" />}
                                            {loading ? "Processando..." : "Copiar e Prosseguir"}
                                        </button>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="w-full flex items-center justify-center gap-2 bg-green-600/10 border-2 border-green-600 text-green-700 py-3 font-bold">
                                                <CheckCircle2 className="w-5 h-5" />
                                                Mensagem Copiada!
                                            </div>
                                            <a
                                                href="https://ig.me/m/gremioalvorada" // Instagram Direct Message Link Schema
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full flex items-center justify-center gap-2 bg-[#E1306C] text-white py-4 font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
                                                onClick={() => setTimeout(() => setSuccessStatus('idle'), 5000)}
                                            >
                                                <Instagram className="w-5 h-5" />
                                                Abrir Instagram para Colar
                                            </a>
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
