import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const [
      totalLeads,
      newLeads,
      inContact,
      proposals,
      negotiations,
      converted,
      lost,
      allLeadsForValue,
      recentLeads,
      recentActivities,
      totalClients,
    ] = await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "NOVO" } }),
      prisma.contactMessage.count({ where: { status: "EM_CONTACTO" } }),
      prisma.contactMessage.count({ where: { status: "PROPOSTA" } }),
      prisma.contactMessage.count({ where: { status: "NEGOCIACAO" } }),
      prisma.contactMessage.count({ where: { status: "CONVERTIDO" } }),
      prisma.contactMessage.count({ where: { status: "PERDIDO" } }),
      prisma.contactMessage.findMany({
        where: {
          status: { in: ["PROPOSTA", "NEGOCIACAO", "CONVERTIDO"] },
        },
        select: { estimatedValue: true, status: true },
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          message: true,
          status: true,
          priority: true,
          createdAt: true,
          read: true,
          estimatedValue: true,
        },
      }),
      prisma.leadActivity.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          lead: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.client.count(),
    ]);

    // Calculate total pipeline value
    const pipelineValue = allLeadsForValue.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);
    const convertedValue = allLeadsForValue
      .filter((l) => l.status === "CONVERTIDO")
      .reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

    // Calculate conversion rate
    const conversionRate = totalLeads > 0 ? Math.round((converted / totalLeads) * 100) : 0;

    return NextResponse.json({
      stats: {
        totalLeads,
        newLeads,
        inContact,
        proposals,
        negotiations,
        converted,
        lost,
        totalClients,
        pipelineValue,
        convertedValue,
        conversionRate,
      },
      recentLeads,
      recentActivities,
    });
  } catch (error) {
    console.error("Error fetching CRM stats:", error);
    return NextResponse.json({ error: "Erro ao obter estatísticas do CRM." }, { status: 500 });
  }
}
