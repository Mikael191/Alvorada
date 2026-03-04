"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Loader2 } from "lucide-react";

export default function AdminDashboardClient({ initialData }: { initialData: any[] }) {
    const [suggestions, setSuggestions] = useState(initialData);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        setLoadingId(id);
        try {
            const res = await fetch("/api/admin/suggestions", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (res.ok) {
                setSuggestions((prev) =>
                    prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
                );
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingId(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING": return "bg-stone/20 text-stone";
            case "REVIEWED": return "bg-blue-500/20 text-blue-700";
            case "IMPLEMENTED": return "bg-green-500/20 text-green-700";
            case "REJECTED": return "bg-stamp/20 text-stamp";
            default: return "bg-gray-200 text-gray-800";
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "IDEA": return "Ideia";
            case "COMPLAINT": return "Reclamação";
            case "PROJECT": return "Projeto";
            default: return type;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="bg-white border border-ink/10 p-6 flex flex-col relative group">

                    <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-stone">
                            {getTypeLabel(suggestion.type)}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider ${getStatusColor(suggestion.status)}`}>
                            {suggestion.status}
                        </span>
                    </div>

                    <h3 className="font-heading text-xl font-bold mb-2">{suggestion.title}</h3>

                    <p className="text-sm text-ink/80 mb-6 flex-grow whitespace-pre-wrap leading-relaxed">
                        {suggestion.content}
                    </p>

                    <div className="border-t border-ink/10 pt-4 mt-auto">
                        <div className="flex justify-between items-center text-xs text-stone mb-4">
                            <span>
                                {suggestion.isAnonymous
                                    ? "Anônimo"
                                    : `${suggestion.author?.name || "Desconhecido"} (${suggestion.author?.room || "-"})`}
                            </span>
                            <span>
                                {format(new Date(suggestion.createdAt), "dd MMM yyyy", { locale: ptBR })}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <select
                                className="text-xs border border-ink/20 bg-paper px-2 py-1 uppercase w-full p-2 outline-none focus:border-ink transition-colors"
                                value={suggestion.status}
                                onChange={(e) => handleStatusUpdate(suggestion.id, e.target.value)}
                                disabled={loadingId === suggestion.id}
                            >
                                <option value="PENDING">Pendente</option>
                                <option value="REVIEWED">Em Análise</option>
                                <option value="IMPLEMENTED">Aprovado</option>
                                <option value="REJECTED">Rejeitado</option>
                            </select>

                            {loadingId === suggestion.id && (
                                <Loader2 className="w-4 h-4 animate-spin text-ink self-center" />
                            )}
                        </div>
                    </div>

                </div>
            ))}

            {suggestions.length === 0 && (
                <div className="col-span-full py-12 text-center border border-dashed border-ink/20">
                    <p className="text-stone">Nenhuma sugestão encontrada.</p>
                </div>
            )}
        </div>
    );
}
