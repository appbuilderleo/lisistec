import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin, verifyPassword, hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    const fullUser = await prisma.adminUser.findUnique({
      where: { id: admin.id },
    });

    if (!fullUser) {
      return NextResponse.json({ error: "Utilizador não encontrado." }, { status: 404 });
    }

    const updateData: { name?: string; email?: string; passwordHash?: string } = {};

    if (name && name.trim().length >= 2) {
      updateData.name = name.trim();
    }

    if (email && email.trim() !== fullUser.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return NextResponse.json({ error: "Email inválido." }, { status: 400 });
      }
      // Check if email already in use
      const existing = await prisma.adminUser.findUnique({
        where: { email: email.trim().toLowerCase() },
      });
      if (existing && existing.id !== admin.id) {
        return NextResponse.json({ error: "Este email já está associado a outro administrador." }, { status: 400 });
      }
      updateData.email = email.trim().toLowerCase();
    }

    // Change password if provided
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Introduza a palavra-passe atual para definir uma nova." },
          { status: 400 }
        );
      }

      const isCurrentValid = verifyPassword(currentPassword, fullUser.passwordHash);
      if (!isCurrentValid) {
        return NextResponse.json(
          { error: "A palavra-passe atual está incorreta." },
          { status: 400 }
        );
      }

      if (newPassword.length < 8) {
        return NextResponse.json(
          { error: "A nova palavra-passe deve ter pelo menos 8 caracteres." },
          { status: 400 }
        );
      }

      updateData.passwordHash = hashPassword(newPassword);
    }

    const updated = await prisma.adminUser.update({
      where: { id: admin.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Perfil atualizado com sucesso.",
      user: updated,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar dados do perfil." },
      { status: 500 }
    );
  }
}
