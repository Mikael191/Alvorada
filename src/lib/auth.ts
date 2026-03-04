import { AuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Extend the built-in types to include our custom user properties
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            name: string;
            room: string;
            role: "STUDENT" | "ADMIN";
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        name: string;
        room: string;
        role: "STUDENT" | "ADMIN";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        room: string;
        role: "STUDENT" | "ADMIN";
    }
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Gremio Alvorada",
            credentials: {
                name: { label: "Nome Completo", type: "text", placeholder: "Seu nome completo" },
                room: { label: "Sala", type: "text", placeholder: "Sua sala (ex: 3º Ano A)" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.name || !credentials?.room || !credentials?.password) {
                    throw new Error("Credenciais incompletas.");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        name_room: {
                            name: credentials.name,
                            room: credentials.room,
                        },
                    },
                });

                if (!user) {
                    throw new Error("Usuário não encontrado.");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                if (!isValidPassword) {
                    throw new Error("Senha incorreta.");
                }

                return {
                    id: user.id,
                    name: user.name,
                    room: user.room,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.room = user.room;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.room = token.room;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login", // Custom login page
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
