import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  try {
    const lead = await prisma.contactMessage.findUnique({
      where: { id },
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
        },
        activities: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }

    // Mark as read if not read
    if (!lead.read) {
      await prisma.contactMessage.update({
        where: { id },
        data: { read: true },
      });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error("Error fetching lead detail:", error);
    return NextResponse.json({ error: "Erro ao carregar detalhes do lead." }, { status: 500 });
  }
}

export async function PATCH(
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
    const { status, priority, estimatedValue, read, company, phone, name, email } = body;

    const existingLead = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    let statusChanged = false;

    if (status !== undefined && status !== existingLead.status) {
      updateData.status = status;
      statusChanged = true;
    }
    if (priority !== undefined) updateData.priority = priority;
    if (estimatedValue !== undefined) updateData.estimatedValue = parseFloat(estimatedValue) || 0;
    if (read !== undefined) updateData.read = Boolean(read);
    if (company !== undefined) updateData.company = company?.trim() || null;
    if (phone !== undefined) updateData.phone = phone?.trim() || null;
    if (name !== undefined) updateData.name = name?.trim();
    if (email !== undefined) updateData.email = email?.trim().toLowerCase();

    const updatedLead = await prisma.contactMessage.update({
      where: { id },
      data: updateData,
    });

    // If status changed, log activity
    if (statusChanged) {
      const statusLabels: Record<string, string> = {
        NOVO: "Novo",
        EM_CONTACTO: "Em Contacto",
        PROPOSTA: "Proposta Enviada",
        NEGOCIACAO: "Em Negociação",
        CONVERTIDO: "Convertido (Fechado)",
        PERDIDO: "Perdido",
        ARQUIVADO: "Arquivado",
      };

      await prisma.leadActivity.create({
        data: {
          leadId: id,
          type: "MUDANCA_ESTADO",
          description: `Estado alterado de "${statusLabels[existingLead.status] || existingLead.status}" para "${statusLabels[status] || status}" por ${admin.name}.`,
        },
      });
    }

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ error: "Erro ao atualizar lead." }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Lead removido com sucesso." });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json({ error: "Erro ao eliminar lead." }, { status: 500 });
  }
}
