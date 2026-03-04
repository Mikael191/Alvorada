"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        room: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Erro ao realizar cadastro.");
                setLoading(false);
                return;
            }

            // Automatically log in after registration
            const signInRes = await signIn("credentials", {
                name: formData.name,
                room: formData.room,
                password: formData.password,
                redirect: false,
            });

            if (signInRes?.error) {
                setError("Cadastro realizado, mas falha ao fazer login automático.");
            } else {
                router.push("/admin"); // They default to student dashboard or home depending on your logic. /admin shows access denied if student, let's redirect to main page for now.
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("Erro de conexão com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 pt-24">
            <div className="w-full max-w-md bg-white border border-ink/10 p-8 shadow-sm">
                <div className="text-center mb-8">
                    <h1 className="font-heading text-3xl font-bold uppercase tracking-wide mb-2">Cadastro</h1>
                    <p className="text-stone">Crie sua conta para participar e enviar suas ideias.</p>
                </div>

                {error && (
                    <div className="bg-stamp/10 text-stamp border border-stamp/20 p-4 mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-stone">Nome Completo</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-paper border border-ink/20 p-4 focus:outline-none focus:border-ink transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-stone">Turma / Sala</label>
                        <input
                            type="text"
                            required
                            placeholder="Ex: 3º Ano A"
                            className="w-full bg-paper border border-ink/20 p-4 focus:outline-none focus:border-ink transition-colors"
                            value={formData.room}
                            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wider text-stone">Senha</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-paper border border-ink/20 p-4 focus:outline-none focus:border-ink transition-colors"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ink text-paper py-4 uppercase tracking-widest font-bold hover:bg-ink/90 transition-colors flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Criar Conta"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-stone text-sm">Já possui uma conta?</p>
                    <Link href="/login" className="text-ink font-bold uppercase tracking-wider text-sm hover:underline mt-2 inline-block">
                        Fazer Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
