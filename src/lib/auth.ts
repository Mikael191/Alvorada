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
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.name || !credentials?.password) {
                    throw new Error("Credenciais incompletas.");
                }

                const users = await prisma.user.findMany({
                    where: {
                        name: credentials.name,
                    },
                });

                if (users.length === 0) {
                    throw new Error("Usuário não encontrado.");
                }

                // Check passwords for all users with this name
                let validUser = null;
                for (const user of users) {
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (isValidPassword) {
                        validUser = user;
                        break;
                    }
                }

                if (!validUser) {
                    throw new Error("Senha incorreta.");
                }

                return {
                    id: validUser.id,
                    name: validUser.name,
                    room: validUser.room,
                    role: validUser.role,
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
