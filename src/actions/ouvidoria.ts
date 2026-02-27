"use server";

export type OuvidoriaData = {
    type: string;
    message: string;
    name?: string;
    grade?: string;
};

export async function submitFeedback(data: OuvidoriaData) {
    // Simulate network delay for UI feedback
    await new Promise(resolve => setTimeout(resolve, 800));

    console.log("Feedback received on server:", data);

    // =========================================================================
    // TO-DO: FUTURE DATABASE INTEGRATION
    // 
    // Here you can connect to Prisma / Supabase / Firebase to store the data
    // so an Admin Panel can fetch and reply to suggestions.
    // 
    // Example Prisma implementation:
    // await db.feedback.create({
    //   data: {
    //     type: data.type,
    //     message: data.message,
    //     authorName: data.name || "Anônimo",
    //     authorGrade: data.grade || null,
    //     status: "PENDING",
    //     createdAt: new Date(),
    //   }
    // });
    // =========================================================================

    // Format the message nicely for the clipboard copying
    const formattedText = `*[GRÊMIO ALVORADA - OUVIDORIA]*\n\n*Tipo:* ${data.type.toUpperCase()}\n*Mensagem:* ${data.message}\n\n*De:* ${data.name || 'Anônimo'} ${data.grade ? `(${data.grade})` : ''}`;

    return {
        success: true,
        formattedText,
        id: crypto.randomUUID()
    };
}
