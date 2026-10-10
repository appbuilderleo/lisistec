import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nome, email e mensagem são obrigatórios." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "O nome deve ter pelo menos 2 caracteres." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Por favor introduza um email válido." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "A mensagem deve ter pelo menos 10 caracteres." },
        { status: 400 }
      );
    }

    // Save lead to CockroachDB
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        message: message.trim(),
        status: "NOVO",
        priority: "MEDIA",
        source: "site_contact",
        read: false,
      },
    });

    // Create initial activity log in CRM timeline
    try {
      await prisma.leadActivity.create({
        data: {
          leadId: contactMessage.id,
          type: "NOVO_LEAD",
          description: `Novo contacto recebido através do formulário do site (${contactMessage.email})`,
        },
      });
    } catch (activityError) {
      console.warn("Could not log initial lead activity:", activityError);
    }

    return NextResponse.json(
      {
        success: true,
        id: contactMessage.id,
        message: "Mensagem recebida com sucesso. Entraremos em contacto em breve.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor. Por favor tente novamente mais tarde." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Método não permitido." },
    { status: 405 }
  );
}
