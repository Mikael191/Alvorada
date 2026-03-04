const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function testRegistration() {
    console.log("Starting diagnostic...");
    try {
        const name = "diag_user";
        const room = "diag_room";
        const password = "password123";

        console.log("Checking DB...");
        const existing = await prisma.user.findUnique({
            where: { name_room: { name, room } },
        });
        console.log("Existing user?:", !!existing);

        console.log("Hashing password...");
        const hash = await bcrypt.hash(password, 10);
        console.log("Hashed password successfully.");

        if (!existing) {
            console.log("Creating user...");
            const user = await prisma.user.create({
                data: { name, room, password: hash },
            });
            console.log("Created user:", user.id);
        }
    } catch (err) {
        console.error("DIAGNOSTIC ERROR:", err);
    } finally {
        await prisma.$disconnect();
    }
}

testRegistration();
