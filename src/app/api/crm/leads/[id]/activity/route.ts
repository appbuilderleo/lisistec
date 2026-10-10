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
    const { type, description } = body;

    if (!description || !description.trim()) {
      return NextResponse.json({ error: "A descrição da atividade é obrigatória." }, { status: 400 });
    }

    const activity = await prisma.leadActivity.create({
      data: {
        leadId: id,
        type: type || "ATIVIDADE",
        description: description.trim(),
      },
    });

    return NextResponse.json({ success: true, activity }, { status: 201 });
  } catch (error) {
    console.error("Error logging activity:", error);
    return NextResponse.json({ error: "Erro ao registar atividade." }, { status: 500 });
  }
}
