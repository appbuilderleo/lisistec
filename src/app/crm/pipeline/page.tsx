"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  GitFork,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  MessageCircle,
  ExternalLink,
  Plus,
  RefreshCw,
  Building,
  User,
  Clock,
} from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: string;
  priority: string;
  estimatedValue: number | null;
  createdAt: string;
}

const STAGES = [
  { key: "NOVO", label: "Novos Leads", color: "border-amber-500/40 text-amber-300 bg-amber-500/10" },
  { key: "EM_CONTACTO", label: "Em Contacto", color: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10" },
  { key: "PROPOSTA", label: "Proposta Enviada", color: "border-blue-500/40 text-blue-300 bg-blue-500/10" },
  { key: "NEGOCIACAO", label: "Em Negociação", color: "border-purple-500/40 text-purple-300 bg-purple-500/10" },
  { key: "CONVERTIDO", label: "Convertido (Ganho)", color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10" },
  { key: "PERDIDO", label: "Perdido", color: "border-slate-600/40 text-slate-400 bg-slate-700/10" },
];

export default function PipelinePage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [movingId, setMovingId] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/crm/leads?limit=100");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (e) {
      console.error("Error fetching leads for pipeline:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const moveStage = async (leadId: string, currentStatus: string, direction: "next" | "prev") => {
    const currentIndex = STAGES.findIndex((s) => s.key === currentStatus);
    if (currentIndex === -1) return;

    const targetIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex < 0 || targetIndex >= STAGES.length) return;

    const targetStatus = STAGES[targetIndex].key;

    try {
      setMovingId(leadId);
      const res = await fetch(`/api/crm/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus }),
      });

      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: targetStatus } : l))
        );
      }
    } catch (e) {
      console.error("Error moving lead stage:", e);
    } finally {
      setMovingId(null);
    }
  };

  const formatCurrency = (val: number | null) => {
    if (!val) return "0 MZN";
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getPriorityTag = (p: string) => {
    switch (p) {
      case "URGENTE": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "ALTA": return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "MEDIA": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      default: return "text-slate-400 bg-slate-800 border-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <GitFork size={26} className="text-cyan-400" />
            <span>Funil de Vendas / Pipeline</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Acompanhe visualmente cada negócio desde o primeiro contacto até ao fecho de contrato.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Atualizar</span>
          </button>
          <Link
            href="/crm/inbox?novo=1"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_2px_12px_rgba(0,242,254,0.25)] transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Novo Negócio</span>
          </Link>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin">
        {STAGES.map((stage, idx) => {
          const stageLeads = leads.filter((l) => l.status === stage.key);
          const stageTotal = stageLeads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

          return (
            <div
              key={stage.key}
              className="flex-shrink-0 w-80 bg-[#0c1018] border border-slate-800/90 rounded-2xl flex flex-col max-h-[calc(100vh-220px)] shadow-lg"
            >
              {/* Stage Header */}
              <div className="p-4 border-b border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${stage.color.split(" ")[2]}`} />
                    <span>{stage.label}</span>
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-400 font-semibold">
                  {formatCurrency(stageTotal)}
                </div>
              </div>

              {/* Cards list */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {stageLeads.length === 0 ? (
                  <div className="py-8 text-center text-slate-600 text-xs border border-dashed border-slate-800/80 rounded-xl">
                    Sem leads nesta fase
                  </div>
                ) : (
                  stageLeads.map((lead) => {
                    const isMoving = movingId === lead.id;

                    return (
                      <div
                        key={lead.id}
                        className={`p-3.5 rounded-xl bg-[#080b11] border border-slate-800/80 hover:border-slate-700 transition-all space-y-2.5 relative ${
                          isMoving ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/crm/inbox?id=${lead.id}`}
                            className="font-semibold text-xs text-slate-100 hover:text-cyan-400 transition-colors line-clamp-1"
                          >
                            {lead.name}
                          </Link>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${getPriorityTag(lead.priority)}`}
                          >
                            {lead.priority}
                          </span>
                        </div>

                        {lead.company && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Building size={12} className="text-slate-500" />
                            <span className="truncate">{lead.company}</span>
                          </div>
                        )}

                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {lead.message}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                          <span className="font-mono text-emerald-400 font-semibold text-[11px]">
                            {lead.estimatedValue ? formatCurrency(lead.estimatedValue) : "Sem valor"}
                          </span>

                          {/* Stage shift actions */}
                          <div className="flex items-center gap-1">
                            {idx > 0 && (
                              <button
                                onClick={() => moveStage(lead.id, lead.status, "prev")}
                                disabled={isMoving}
                                title="Recuar fase anterior"
                                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                              >
                                <ArrowLeft size={13} />
                              </button>
                            )}
                            <Link
                              href={`/crm/inbox?id=${lead.id}`}
                              title="Tratar no Inbox"
                              className="p-1 text-cyan-400 hover:text-cyan-300 rounded hover:bg-slate-800 transition-colors"
                            >
                              <ExternalLink size={13} />
                            </Link>
                            {idx < STAGES.length - 1 && (
                              <button
                                onClick={() => moveStage(lead.id, lead.status, "next")}
                                disabled={isMoving}
                                title="Avançar próxima fase"
                                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                              >
                                <ArrowRight size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
