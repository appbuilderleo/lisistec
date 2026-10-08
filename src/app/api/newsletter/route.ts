import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email é obrigatório." },
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

    // Upsert - don't error if already subscribed
    await prisma.newsletterSubscriber.upsert({
      where: { email: email.trim().toLowerCase() },
      create: { email: email.trim().toLowerCase() },
      update: { active: true },
    });

    return NextResponse.json(
      { success: true, message: "Subscrito com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return NextResponse.json(
      { error: "Erro ao subscrever. Tente novamente." },
      { status: 500 }
    );
  }
}
