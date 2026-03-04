import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "ADMIN") {
        return (
            <div className="min-h-screen pt-32 px-4 container mx-auto text-center">
                <h1 className="font-heading text-4xl font-bold uppercase tracking-wide mb-6">Acesso Negado</h1>
                <p className="text-stone">Apenas membros da diretoria podem acessar esta página.</p>
            </div>
        );
    }

    // Fetch data initially on server for SEO/speed, and pass to client component
    const initialSuggestions = await prisma.suggestion.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: {
                select: { name: true, room: true },
            },
        },
    });

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 container mx-auto">
            <div className="mb-12">
                <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide">
                    Painel de Controle
                </h1>
                <p className="text-stone mt-2">Gerenciamento de Sugestões, Ideias e Projetos.</p>
            </div>

            <AdminDashboardClient initialData={initialSuggestions} />
        </div>
    );
}
