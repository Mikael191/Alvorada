import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as z from "zod";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const suggestions = await prisma.suggestion.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: { name: true, room: true },
                },
            },
        });

        return NextResponse.json(suggestions);
    } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const updateStatusSchema = z.object({
    id: z.string(),
    status: z.enum(["PENDING", "REVIEWED", "IMPLEMENTED", "REJECTED"]),
});

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, status } = updateStatusSchema.parse(body);

        const updatedSuggestion = await prisma.suggestion.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedSuggestion);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error("Failed to update suggestion:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
