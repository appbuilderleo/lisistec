import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "O conteúdo da nota não pode estar vazio." }, { status: 400 });
    }

    const note = await prisma.leadNote.create({
      data: {
        leadId: id,
        authorName: admin.name,
        content: content.trim(),
      },
    });

    // Also log activity
    await prisma.leadActivity.create({
      data: {
        leadId: id,
        type: "NOTA_ADICIONADA",
        description: `Nota adicionada por ${admin.name}: "${content.trim().slice(0, 80)}${content.trim().length > 80 ? "..." : ""}"`,
      },
    });

    return NextResponse.json({ success: true, note }, { status: 201 });
  } catch (error) {
    console.error("Error adding note to lead:", error);
    return NextResponse.json({ error: "Erro ao adicionar nota." }, { status: 500 });
  }
}
