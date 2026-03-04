const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    const adminName = "Admin";
    const adminRoom = "Diretoria";
    const adminPassword = "gremio_admin_123";

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.user.upsert({
        where: {
            name_room: {
                name: adminName,
                room: adminRoom,
            },
        },
        update: {},
        create: {
            name: adminName,
            room: adminRoom,
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Created Admin user:");
    console.log(`Name: ${admin.name}`);
    console.log(`Room: ${admin.room}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
