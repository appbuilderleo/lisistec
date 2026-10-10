"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  TrendingUp,
  Users,
  DollarSign,
  ArrowRight,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  PlusCircle,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";

interface StatsData {
  totalLeads: number;
  newLeads: number;
  inContact: number;
  proposals: number;
  negotiations: number;
  converted: number;
  lost: number;
  totalClients: number;
  pipelineValue: number;
  convertedValue: number;
  conversionRate: number;
}

interface RecentLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  priority: string;
  createdAt: string;
  read: boolean;
  estimatedValue: number | null;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  lead: {
    name: string;
    email: string;
  } | null;
}

export default function CrmDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/crm/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecentLeads(data.recentLeads || []);
        setRecentActivities(data.recentActivities || []);
      }
    } catch (e) {
      console.error("Error fetching CRM stats:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NOVO":
        return { label: "Novo", bg: "bg-amber-500/15 text-amber-300 border-amber-500/30" };
      case "EM_CONTACTO":
        return { label: "Em Contacto", bg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" };
      case "PROPOSTA":
        return { label: "Proposta Enviada", bg: "bg-blue-500/15 text-blue-300 border-blue-500/30" };
      case "NEGOCIACAO":
        return { label: "Negociação", bg: "bg-purple-500/15 text-purple-300 border-purple-500/30" };
      case "CONVERTIDO":
        return { label: "Convertido", bg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" };
      case "PERDIDO":
        return { label: "Perdido", bg: "bg-rose-500/15 text-rose-300 border-rose-500/30" };
      default:
        return { label: status, bg: "bg-slate-700/30 text-slate-300 border-slate-600/30" };
    }
  };

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return "Agora mesmo";
    if (diff < 3600) return `Há ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Há ${Math.floor(diff / 3600)} h`;
    return `Há ${Math.floor(diff / 86400)} dias`;
  };

  const getWhatsAppLink = (phone: string | null, name: string) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("258") ? cleanPhone : `258${cleanPhone}`;
    const text = encodeURIComponent(
      `Olá ${name}! Entramos em contacto através da Lisis Tecnologias e Serviços referente à sua solicitação no nosso website.`
    );
    return `https://wa.me/${formattedPhone}?text=${text}`;
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-slate-400">
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-3" />
        <p className="text-sm">A carregar métricas do CRM...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Dashboard do CRM
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Gestão de leads recebidos pelo website e oportunidades de negócio.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin text-cyan-400" : ""} />
            <span>Atualizar</span>
          </button>
          <Link
            href="/crm/inbox?novo=1"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_2px_12px_rgba(0,242,254,0.25)] transition-all cursor-pointer"
          >
            <PlusCircle size={15} />
            <span>Novo Lead</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Novos Leads */}
        <Link
          href="/crm/inbox?status=NOVO"
          className="group p-5 rounded-2xl bg-[#0c1018] border border-amber-500/20 hover:border-amber-500/40 transition-all hover:translate-y-[-2px] relative overflow-hidden block shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Novos no Inbox
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Inbox size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-white">
              {stats?.newLeads || 0}
            </span>
            <span className="text-xs text-amber-400/80 font-medium">a aguardar resposta</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
            Ver mensagens pendentes <ArrowRight size={12} />
          </p>
        </Link>

        {/* Card 2: Em Negociação / Propostas */}
        <Link
          href="/crm/pipeline"
          className="group p-5 rounded-2xl bg-[#0c1018] border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:translate-y-[-2px] relative overflow-hidden block shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Oportunidades Ativas
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-white">
              {(stats?.inContact || 0) + (stats?.proposals || 0) + (stats?.negotiations || 0)}
            </span>
            <span className="text-xs text-cyan-400/80 font-medium">no pipeline</span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
            Gerir funil de vendas <ArrowRight size={12} />
          </p>
        </Link>

        {/* Card 3: Clientes Convertidos */}
        <Link
          href="/crm/clientes"
          className="group p-5 rounded-2xl bg-[#0c1018] border border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:translate-y-[-2px] relative overflow-hidden block shadow-lg"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Convertidos / Clientes
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-white">
              {stats?.converted || 0}
            </span>
            <span className="text-xs text-emerald-400/80 font-medium">
              ({stats?.conversionRate || 0}% de conversão)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 group-hover:text-emerald-300 transition-colors">
            Diretório de clientes <ArrowRight size={12} />
          </p>
        </Link>

        {/* Card 4: Valor do Pipeline */}
        <div className="p-5 rounded-2xl bg-[#0c1018] border border-blue-500/20 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Pipeline Estimado
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-white truncate">
              {formatCurrency(stats?.pipelineValue || 0)}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Convertido: <span className="text-emerald-400 font-medium">{formatCurrency(stats?.convertedValue || 0)}</span>
          </p>
        </div>
      </div>

      {/* Visual Funnel Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1018] border border-slate-800/80 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-white">Progresso do Funil de Atendimento</h2>
            <p className="text-xs text-slate-400">Distribuição dos leads recebidos por fase de tratamento</p>
          </div>
          <Link href="/crm/pipeline" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
            Ver Quadro Kanban <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-amber-500/20">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
              <span>Novos</span>
              <span className="font-bold">{stats?.newLeads || 0}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{
                  width: `${stats?.totalLeads ? Math.min(100, Math.round(((stats.newLeads || 0) / stats.totalLeads) * 100)) : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20">
            <div className="flex items-center justify-between text-xs text-cyan-400 mb-1">
              <span>Em Contacto</span>
              <span className="font-bold">{stats?.inContact || 0}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full"
                style={{
                  width: `${stats?.totalLeads ? Math.min(100, Math.round(((stats.inContact || 0) / stats.totalLeads) * 100)) : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-blue-500/20">
            <div className="flex items-center justify-between text-xs text-blue-400 mb-1">
              <span>Propostas</span>
              <span className="font-bold">{stats?.proposals || 0}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full"
                style={{
                  width: `${stats?.totalLeads ? Math.min(100, Math.round(((stats.proposals || 0) / stats.totalLeads) * 100)) : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-purple-500/20">
            <div className="flex items-center justify-between text-xs text-purple-400 mb-1">
              <span>Negociação</span>
              <span className="font-bold">{stats?.negotiations || 0}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-400 rounded-full"
                style={{
                  width: `${stats?.totalLeads ? Math.min(100, Math.round(((stats.negotiations || 0) / stats.totalLeads) * 100)) : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-emerald-500/20">
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
              <span>Convertidos</span>
              <span className="font-bold">{stats?.converted || 0}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{
                  width: `${stats?.totalLeads ? Math.min(100, Math.round(((stats.converted || 0) / stats.totalLeads) * 100)) : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Perdidos</span>
              <span className="font-bold">{stats?.lost || 0}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-600 rounded-full"
                style={{
                  width: `${stats?.totalLeads ? Math.min(100, Math.round(((stats.lost || 0) / stats.totalLeads) * 100)) : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Leads & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Leads from Website (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-heading font-bold text-white">
                Contactos Recentes do Website
              </h2>
              <p className="text-xs text-slate-400">
                Mensagens submetidas através do formulário de contacto
              </p>
            </div>
            <Link
              href="/crm/inbox"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              Ver Todas ({stats?.totalLeads || 0}) <ArrowRight size={13} />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="p-10 rounded-2xl bg-[#0c1018] border border-slate-800/80 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-500 mx-auto mb-3">
                <Inbox size={24} />
              </div>
              <h3 className="text-sm font-semibold text-white">Nenhum contacto recebido ainda</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Quando um visitante preencher o formulário no seu site ou solicitar contacto, a mensagem aparecerá aqui automaticamente.
              </p>
              <div className="mt-4">
                <Link
                  href="/crm/inbox?novo=1"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                >
                  <PlusCircle size={14} />
                  Registar lead de teste
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => {
                const badge = getStatusBadge(lead.status);
                const waUrl = getWhatsAppLink(lead.phone, lead.name);

                return (
                  <div
                    key={lead.id}
                    className={`p-4 rounded-xl bg-[#0c1018] border transition-all hover:border-slate-700 ${
                      !lead.read ? "border-amber-500/40 bg-[#0d121c]" : "border-slate-800/80"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        {!lead.read && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Não lido" />
                        )}
                        <h3 className="font-semibold text-white text-sm">{lead.name}</h3>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {timeAgo(lead.createdAt)}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 mb-3 bg-[#080b11] p-2.5 rounded-lg border border-slate-800/60 font-sans">
                      &quot;{lead.message}&quot;
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
                      <div className="flex flex-wrap items-center gap-3 text-slate-400">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                        >
                          <Mail size={12} />
                          <span>{lead.email}</span>
                        </a>
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={12} />
                            <span>{lead.phone}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {waUrl && (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-colors"
                            title="Conversar no WhatsApp"
                          >
                            <MessageCircle size={13} />
                            <span>WhatsApp</span>
                          </a>
                        )}
                        <Link
                          href={`/crm/inbox?id=${lead.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                        >
                          <span>Tratar Lead</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Recent Activity & Quick Shortcuts (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Shortcuts */}
          <div className="p-5 rounded-2xl bg-[#0c1018] border border-slate-800/80 shadow-lg">
            <h3 className="text-sm font-semibold text-white mb-3">Ações Rápidas</h3>
            <div className="space-y-2">
              <Link
                href="/crm/inbox?status=NOVO"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/80 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Inbox size={16} className="text-amber-400" />
                  <span>Tratar Leads Novos</span>
                </div>
                <span className="font-bold text-amber-400">{stats?.newLeads || 0}</span>
              </Link>

              <Link
                href="/crm/pipeline"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/80 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp size={16} className="text-cyan-400" />
                  <span>Abrir Funil de Vendas</span>
                </div>
                <ArrowRight size={13} className="text-slate-500" />
              </Link>

              <Link
                href="/crm/clientes"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/80 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-emerald-400" />
                  <span>Diretório de Clientes</span>
                </div>
                <span className="text-slate-400">{stats?.totalClients || 0}</span>
              </Link>
            </div>
          </div>

          {/* Audit / Timeline Stream */}
          <div className="p-5 rounded-2xl bg-[#0c1018] border border-slate-800/80 shadow-lg">
            <h3 className="text-sm font-semibold text-white mb-1">Registo de Atividades</h3>
            <p className="text-xs text-slate-400 mb-4">Histórico recente de interações e alterações</p>

            {recentActivities.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">Sem atividades registadas.</p>
            ) : (
              <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-800">
                {recentActivities.map((act) => (
                  <div key={act.id} className="relative flex items-start gap-3 pl-6 text-xs">
                    <span className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-cyan-400/20 border border-cyan-400" />
                    <div>
                      <p className="text-slate-300 font-medium leading-snug">{act.description}</p>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">
                        {timeAgo(act.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
