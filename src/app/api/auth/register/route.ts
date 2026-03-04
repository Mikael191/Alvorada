import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as z from "zod";

const registerSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres."),
    room: z.string().min(2, "Informe uma sala válida."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, room, password } = registerSchema.parse(body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                name_room: {
                    name,
                    room,
                },
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Um usuário com esse nome e sala já está cadastrado." },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                room,
                password: hashedPassword,
                // Role is STUDENT by default based on schema
            },
        });

        // Don't return password
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
        }
        console.error("Failed to register user:", error);
        return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 });
    }
}
