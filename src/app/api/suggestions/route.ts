import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as z from "zod";

const suggestionSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(10).max(1000),
    type: z.enum(["IDEA", "COMPLAINT", "PROJECT"]),
    isAnonymous: z.boolean().default(false),
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const body = await req.json();

        // Validate request body
        const validatedData = suggestionSchema.parse(body);

        const suggestionData: any = {
            title: validatedData.title,
            content: validatedData.content,
            type: validatedData.type,
            isAnonymous: validatedData.isAnonymous,
        };

        // If the user is logged in and didn't choose to be anonymous, link the author
        if (session?.user && !validatedData.isAnonymous) {
            suggestionData.authorId = session.user.id;
        }

        const suggestion = await prisma.suggestion.create({
            data: suggestionData,
        });

        return NextResponse.json(suggestion, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error("Failed to create suggestion:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
