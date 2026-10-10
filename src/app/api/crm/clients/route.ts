import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.trim();
  const status = searchParams.get("status");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (status && status !== "TODOS") {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const clients = await prisma.client.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    const totalRevenue = clients.reduce((sum, c) => sum + (c.totalRevenue || 0), 0);

    return NextResponse.json({ clients, totalRevenue });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ error: "Erro ao obter clientes." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, company, address, status, totalRevenue, notes, leadId } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Nome do cliente é obrigatório." }, { status: 400 });
    }

    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        email: email?.trim().toLowerCase() || null,
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        address: address?.trim() || null,
        status: status || "ATIVO",
        totalRevenue: totalRevenue ? parseFloat(totalRevenue) : 0,
        notes: notes?.trim() || null,
      },
    });

    // If converted from lead, update lead status to CONVERTIDO
    if (leadId) {
      await prisma.contactMessage.update({
        where: { id: leadId },
        data: { status: "CONVERTIDO" },
      });

      await prisma.leadActivity.create({
        data: {
          leadId,
          type: "CONVERSAO",
          description: `Lead convertido com sucesso em Cliente registado (${client.name}) por ${admin.name}.`,
        },
      });
    }

    return NextResponse.json({ success: true, client }, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ error: "Erro ao criar cliente." }, { status: 500 });
  }
}
