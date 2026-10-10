import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status"); // "TODOS", "NOVO", "EM_CONTACTO", etc.
  const priority = searchParams.get("priority");
  const search = searchParams.get("search")?.trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "25", 10)));
  const skip = (page - 1) * limit;

  // Build where filter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (status && status !== "TODOS") {
    where.status = status;
  }

  if (priority && priority !== "TODAS") {
    where.priority = priority;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { message: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const [leads, totalCount, statusCounts] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          _count: {
            select: { notes: true, activities: true },
          },
        },
      }),
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
    ]);

    // Format counts
    const countsMap: Record<string, number> = {
      TODOS: 0,
      NOVO: 0,
      EM_CONTACTO: 0,
      PROPOSTA: 0,
      NEGOCIACAO: 0,
      CONVERTIDO: 0,
      PERDIDO: 0,
      ARQUIVADO: 0,
    };

    let totalAll = 0;
    statusCounts.forEach((sc) => {
      countsMap[sc.status] = sc._count.id;
      totalAll += sc._count.id;
    });
    countsMap["TODOS"] = totalAll;

    return NextResponse.json({
      leads,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit) || 1,
      },
      counts: countsMap,
    });
  } catch (error) {
    console.error("Error fetching CRM leads:", error);
    return NextResponse.json({ error: "Erro ao carregar leads." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message, priority, status, estimatedValue, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Nome e email são obrigatórios." }, { status: 400 });
    }

    const lead = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        subject: subject?.trim() || null,
        message: message?.trim() || "Lead registado manualmente pelo gestor.",
        priority: priority || "MEDIA",
        status: status || "NOVO",
        source: source || "manual",
        estimatedValue: estimatedValue ? parseFloat(estimatedValue) : 0,
        read: true,
      },
    });

    // Create activity
    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        type: "CRIACAO_MANUAL",
        description: `Lead criado manualmente no CRM por ${admin.name}.`,
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error("Error creating manual lead:", error);
    return NextResponse.json({ error: "Erro ao criar lead." }, { status: 500 });
  }
}
