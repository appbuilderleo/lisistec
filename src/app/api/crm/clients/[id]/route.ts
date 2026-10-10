import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

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
    const { name, email, phone, company, address, status, totalRevenue, notes } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (email !== undefined) updateData.email = email ? email.trim().toLowerCase() : null;
    if (phone !== undefined) updateData.phone = phone ? phone.trim() : null;
    if (company !== undefined) updateData.company = company ? company.trim() : null;
    if (address !== undefined) updateData.address = address ? address.trim() : null;
    if (status !== undefined) updateData.status = status;
    if (totalRevenue !== undefined) updateData.totalRevenue = parseFloat(totalRevenue) || 0;
    if (notes !== undefined) updateData.notes = notes ? notes.trim() : null;

    const updated = await prisma.client.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, client: updated });
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ error: "Erro ao atualizar cliente." }, { status: 500 });
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
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Cliente removido." });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ error: "Erro ao eliminar cliente." }, { status: 500 });
  }
}
