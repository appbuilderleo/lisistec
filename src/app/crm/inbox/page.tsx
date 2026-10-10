"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Inbox,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  Building,
  Calendar,
  MessageCircle,
  Tag,
  DollarSign,
  Send,
  Trash2,
  CheckCircle,
  UserCheck,
  AlertCircle,
  Clock,
  ArrowRight,
  X,
  FileText,
  Activity,
  ChevronRight,
  RefreshCw,
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
  source: string;
  estimatedValue: number | null;
  read: boolean;
  createdAt: string;
  _count?: { notes: number; activities: number };
}

interface LeadNote {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

interface LeadActivity {
  id: string;
  type: string;
  description: string;
  createdAt: string;
}

interface LeadDetail extends LeadItem {
  notes: LeadNote[];
  activities: LeadActivity[];
}

function InboxContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "TODOS";
  const initialLeadId = searchParams.get("id");
  const openNewModal = searchParams.get("novo") === "1";

  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState<string>(initialStatus);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("TODAS");

  // Selected lead for detail treatment drawer
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(initialLeadId);
  const [leadDetail, setLeadDetail] = useState<LeadDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Note form state
  const [newNote, setNewNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  // Manual lead modal
  const [showNewModal, setShowNewModal] = useState(openNewModal);
  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    priority: "MEDIA",
    status: "NOVO",
    estimatedValue: "",
  });
  const [creatingLead, setCreatingLead] = useState(false);

  // Action status message
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeStatus !== "TODOS") params.append("status", activeStatus);
      if (priorityFilter !== "TODAS") params.append("priority", priorityFilter);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());

      const res = await fetch(`/api/crm/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setCounts(data.counts || {});
      }
    } catch (e) {
      console.error("Error fetching leads:", e);
    } finally {
      setLoading(false);
    }
  }, [activeStatus, priorityFilter, searchQuery]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Fetch full lead detail when selected
  const fetchLeadDetail = useCallback(async (id: string) => {
    try {
      setDetailLoading(true);
      const res = await fetch(`/api/crm/leads/${id}`);
      if (res.ok) {
        const data = await res.json();
        setLeadDetail(data.lead);
        // Update read status in local list
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, read: true } : l))
        );
      }
    } catch (e) {
      console.error("Error fetching lead detail:", e);
    } finally {
      setDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedLeadId) {
      fetchLeadDetail(selectedLeadId);
    } else {
      setLeadDetail(null);
    }
  }, [selectedLeadId, fetchLeadDetail]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!leadDetail) return;
    try {
      const res = await fetch(`/api/crm/leads/${leadDetail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(`Estado atualizado para: ${getStatusLabel(newStatus)}`);
        fetchLeadDetail(leadDetail.id);
        fetchLeads();
      }
    } catch {
      showToast("Erro ao atualizar estado.");
    }
  };

  const handleUpdatePriority = async (newPriority: string) => {
    if (!leadDetail) return;
    try {
      const res = await fetch(`/api/crm/leads/${leadDetail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: newPriority }),
      });
      if (res.ok) {
        showToast("Prioridade atualizada.");
        fetchLeadDetail(leadDetail.id);
        fetchLeads();
      }
    } catch {
      showToast("Erro ao atualizar prioridade.");
    }
  };

  const handleUpdateEstimatedValue = async (valueStr: string) => {
    if (!leadDetail) return;
    try {
      const res = await fetch(`/api/crm/leads/${leadDetail.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estimatedValue: valueStr }),
      });
      if (res.ok) {
        showToast("Valor estimado guardado.");
        fetchLeadDetail(leadDetail.id);
        fetchLeads();
      }
    } catch {
      showToast("Erro ao guardar valor.");
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !leadDetail) return;

    try {
      setSavingNote(true);
      const res = await fetch(`/api/crm/leads/${leadDetail.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote }),
      });
      if (res.ok) {
        setNewNote("");
        showToast("Nota registada com sucesso!");
        fetchLeadDetail(leadDetail.id);
      }
    } catch {
      showToast("Erro ao adicionar nota.");
    } finally {
      setSavingNote(false);
    }
  };

  const handleConvertToClient = async () => {
    if (!leadDetail) return;
    if (!confirm(`Deseja converter "${leadDetail.name}" num Cliente registado permanente?`)) return;

    try {
      const res = await fetch("/api/crm/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadDetail.name,
          email: leadDetail.email,
          phone: leadDetail.phone,
          company: leadDetail.company,
          totalRevenue: leadDetail.estimatedValue || 0,
          notes: `Convertido a partir do Lead #${leadDetail.id}. Mensagem inicial: "${leadDetail.message}"`,
          leadId: leadDetail.id,
        }),
      });

      if (res.ok) {
        showToast("Lead convertido com sucesso em Cliente!");
        fetchLeadDetail(leadDetail.id);
        fetchLeads();
      }
    } catch {
      showToast("Erro ao converter lead em cliente.");
    }
  };

  const handleDeleteLead = async () => {
    if (!leadDetail) return;
    if (!confirm(`Tem a certeza que deseja eliminar o contacto de "${leadDetail.name}"? Esta ação não pode ser desfeita.`)) return;

    try {
      const res = await fetch(`/api/crm/leads/${leadDetail.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Lead eliminado.");
        setSelectedLeadId(null);
        fetchLeads();
      }
    } catch {
      showToast("Erro ao eliminar lead.");
    }
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) return;

    try {
      setCreatingLead(true);
      const res = await fetch("/api/crm/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadForm),
      });

      if (res.ok) {
        const data = await res.json();
        setShowNewModal(false);
        setNewLeadForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          priority: "MEDIA",
          status: "NOVO",
          estimatedValue: "",
        });
        showToast("Novo lead registado com sucesso!");
        fetchLeads();
        if (data.lead?.id) {
          setSelectedLeadId(data.lead.id);
        }
      } else {
        const err = await res.json();
        showToast(err.error || "Erro ao criar lead.");
      }
    } catch {
      showToast("Falha na comunicação com o servidor.");
    } finally {
      setCreatingLead(false);
    }
  };

  const getStatusLabel = (st: string) => {
    switch (st) {
      case "NOVO": return "Novo";
      case "EM_CONTACTO": return "Em Contacto";
      case "PROPOSTA": return "Proposta Enviada";
      case "NEGOCIACAO": return "Negociação";
      case "CONVERTIDO": return "Convertido";
      case "PERDIDO": return "Perdido";
      case "ARQUIVADO": return "Arquivado";
      default: return st;
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "NOVO":
        return { label: "Novo", bg: "bg-amber-500/15 text-amber-300 border-amber-500/30" };
      case "EM_CONTACTO":
        return { label: "Em Contacto", bg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30" };
      case "PROPOSTA":
        return { label: "Proposta", bg: "bg-blue-500/15 text-blue-300 border-blue-500/30" };
      case "NEGOCIACAO":
        return { label: "Negociação", bg: "bg-purple-500/15 text-purple-300 border-purple-500/30" };
      case "CONVERTIDO":
        return { label: "Convertido", bg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" };
      case "PERDIDO":
        return { label: "Perdido", bg: "bg-rose-500/15 text-rose-300 border-rose-500/30" };
      default:
        return { label: st, bg: "bg-slate-700/30 text-slate-300 border-slate-600/30" };
    }
  };

  const getPriorityBadge = (pr: string) => {
    switch (pr) {
      case "URGENTE":
        return { label: "Urgente", bg: "bg-rose-500/20 text-rose-300 border-rose-500/30" };
      case "ALTA":
        return { label: "Alta", bg: "bg-orange-500/20 text-orange-300 border-orange-500/30" };
      case "MEDIA":
        return { label: "Média", bg: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
      case "BAIXA":
        return { label: "Baixa", bg: "bg-slate-700/20 text-slate-400 border-slate-700/30" };
      default:
        return { label: pr, bg: "bg-slate-700/20 text-slate-400 border-slate-700/30" };
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

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return "Agora";
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} h atrás`;
    return `${Math.floor(diff / 86400)} dias atrás`;
  };

  const getWhatsAppUrl = (phone: string | null, name: string) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("258") ? cleanPhone : `258${cleanPhone}`;
    const text = encodeURIComponent(
      `Olá ${name}! Entramos em contacto através da Lisis Tecnologias e Serviços referente à sua solicitação no nosso website.`
    );
    return `https://wa.me/${formattedPhone}?text=${text}`;
  };

  const statusTabs = [
    { key: "TODOS", label: "Todos" },
    { key: "NOVO", label: "Novos" },
    { key: "EM_CONTACTO", label: "Em Contacto" },
    { key: "PROPOSTA", label: "Propostas" },
    { key: "NEGOCIACAO", label: "Negociação" },
    { key: "CONVERTIDO", label: "Convertidos" },
    { key: "PERDIDO", label: "Perdidos" },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d131f] border border-cyan-500/40 text-cyan-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle size={16} className="text-cyan-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <span>Inbox & Gestão de Leads</span>
            {counts["NOVO"] > 0 && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 animate-pulse">
                {counts["NOVO"]} Novo{counts["NOVO"] > 1 ? "s" : ""}
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Trate as mensagens recebidas do formulário do site e converta visitantes em clientes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchLeads()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
            title="Atualizar lista"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_2px_12px_rgba(0,242,254,0.25)] transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Registar Lead Manual</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {statusTabs.map((tab) => {
            const count = counts[tab.key] ?? 0;
            const active = activeStatus === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveStatus(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,242,254,0.1)]"
                    : "bg-[#0c1018] text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    active
                      ? "bg-cyan-400 text-slate-950"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Priority row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por nome, email, telefone, mensagem..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#0c1018] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-500 shrink-0" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-[#0c1018] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="TODAS">Todas as Prioridades</option>
              <option value="URGENTE">Urgente</option>
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Média</option>
              <option value="BAIXA">Baixa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Two-Pane View: Leads List (Left) + Detail Drawer (Right if selected) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Leads List */}
        <div className={`${selectedLeadId ? "lg:col-span-5 xl:col-span-5" : "lg:col-span-12"} space-y-3`}>
          {loading ? (
            <div className="p-12 text-center text-slate-400 bg-[#0c1018] rounded-2xl border border-slate-800">
              <RefreshCw size={24} className="animate-spin text-cyan-400 mx-auto mb-2" />
              <p className="text-xs">A carregar leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-400 bg-[#0c1018] rounded-2xl border border-slate-800">
              <Inbox size={32} className="text-slate-600 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-slate-200">Nenhum lead encontrado</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Não existem mensagens ou leads com os filtros selecionados.
              </p>
            </div>
          ) : (
            leads.map((lead) => {
              const isSelected = selectedLeadId === lead.id;
              const statusBadge = getStatusBadge(lead.status);
              const priorityBadge = getPriorityBadge(lead.priority);

              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-[#0f1624] border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.15)] ring-1 ring-cyan-400"
                      : !lead.read
                      ? "bg-[#0d121c] border-amber-500/40 hover:border-amber-500/60"
                      : "bg-[#0c1018] border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  {/* Unread indicator */}
                  {!lead.read && (
                    <span className="absolute top-4 left-2 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}

                  <div className="flex items-start justify-between gap-2 mb-2 pl-2">
                    <div>
                      <h3 className="font-semibold text-white text-sm leading-tight flex items-center gap-2">
                        <span>{lead.name}</span>
                        {lead.company && (
                          <span className="text-[11px] text-slate-400 font-normal">
                            ({lead.company})
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">{lead.email}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] text-slate-500">{timeAgo(lead.createdAt)}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full border ${statusBadge.bg}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                  </div>

                  {/* Message snippet */}
                  <p className="text-xs text-slate-300 line-clamp-2 pl-2 my-2 bg-[#080b11] p-2 rounded-lg border border-slate-800/60 font-sans">
                    {lead.message}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs pl-2">
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${priorityBadge.bg}`}>
                        {priorityBadge.label}
                      </span>
                      {lead.estimatedValue ? (
                        <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                          {formatCurrency(lead.estimatedValue)}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-1 text-cyan-400 text-xs font-semibold">
                      <span>Tratar</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Lead Treatment Detail Pane (Right Column) */}
        {selectedLeadId && (
          <div className="lg:col-span-7 xl:col-span-7 bg-[#0c1018] border border-slate-800 rounded-2xl p-5 sm:p-6 sticky top-4 shadow-xl space-y-6">
            {detailLoading || !leadDetail ? (
              <div className="py-20 text-center text-slate-400">
                <RefreshCw size={24} className="animate-spin text-cyan-400 mx-auto mb-2" />
                <p className="text-xs">A carregar detalhes do lead...</p>
              </div>
            ) : (
              <>
                {/* Header & Close */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-heading font-bold text-white">
                        {leadDetail.name}
                      </h2>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(leadDetail.status).bg}`}>
                        {getStatusBadge(leadDetail.status).label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <Clock size={12} /> Recebido em {new Date(leadDetail.createdAt).toLocaleString("pt-MZ")}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLeadId(null)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    aria-label="Fechar"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Direct Action Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {/* WhatsApp Direct Action */}
                  {leadDetail.phone ? (
                    <a
                      href={getWhatsAppUrl(leadDetail.phone, leadDetail.name) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366]/30 transition-all shadow-[0_0_12px_rgba(37,211,102,0.15)]"
                    >
                      <MessageCircle size={15} />
                      <span>WhatsApp Direto</span>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium bg-slate-800/30 text-slate-500 border border-slate-800 cursor-not-allowed"
                    >
                      <MessageCircle size={15} />
                      <span>Sem Telefone</span>
                    </button>
                  )}

                  {/* Mail Action */}
                  <a
                    href={`mailto:${leadDetail.email}?subject=${encodeURIComponent(`Contacto Lisis Technologies - ${leadDetail.subject || "Proposta de Solução"}`)}`}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors"
                  >
                    <Mail size={15} />
                    <span>Enviar Email</span>
                  </a>

                  {/* Convert to Client Button */}
                  <button
                    onClick={handleConvertToClient}
                    className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                  >
                    <UserCheck size={15} />
                    <span>Tornar Cliente</span>
                  </button>
                </div>

                {/* Treatment Controls: Status, Priority, Deal Value */}
                <div className="p-4 rounded-xl bg-[#080b11] border border-slate-800 space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Activity size={14} className="text-cyan-400" />
                    Tratamento do Lead & Oportunidade
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Status Dropdown */}
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                        Fase / Estado
                      </label>
                      <select
                        value={leadDetail.status}
                        onChange={(e) => handleUpdateStatus(e.target.value)}
                        className="w-full bg-[#0c1018] border border-slate-700/80 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="NOVO">📥 1. Novo (Não tratado)</option>
                        <option value="EM_CONTACTO">📞 2. Em Contacto</option>
                        <option value="PROPOSTA">📑 3. Proposta Enviada</option>
                        <option value="NEGOCIACAO">💼 4. Em Negociação</option>
                        <option value="CONVERTIDO">🏆 5. Convertido (Ganho)</option>
                        <option value="PERDIDO">❌ 6. Perdido</option>
                        <option value="ARQUIVADO">📁 7. Arquivado</option>
                      </select>
                    </div>

                    {/* Priority Dropdown */}
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                        Prioridade
                      </label>
                      <select
                        value={leadDetail.priority}
                        onChange={(e) => handleUpdatePriority(e.target.value)}
                        className="w-full bg-[#0c1018] border border-slate-700/80 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                      >
                        <option value="URGENTE">🔥 Urgente</option>
                        <option value="ALTA">⚡ Alta</option>
                        <option value="MEDIA">🟦 Média</option>
                        <option value="BAIXA">⚪ Baixa</option>
                      </select>
                    </div>

                    {/* Estimated Deal Value */}
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                        Valor Estimado (MZN)
                      </label>
                      <input
                        type="number"
                        defaultValue={leadDetail.estimatedValue || ""}
                        onBlur={(e) => handleUpdateEstimatedValue(e.target.value)}
                        placeholder="Ex: 45000"
                        className="w-full bg-[#0c1018] border border-slate-700/80 rounded-lg px-2.5 py-2 text-xs text-emerald-400 font-mono font-semibold focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Lead Original Message Content */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <FileText size={14} className="text-cyan-400" />
                    Mensagem Original Submetida no Site
                  </h3>
                  <div className="p-4 rounded-xl bg-[#080b11] border border-slate-800 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-800/80 pb-3">
                      <div>
                        <span className="text-slate-500 block">Email:</span>
                        <span className="text-slate-200 font-mono select-all">{leadDetail.email}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Telefone:</span>
                        <span className="text-slate-200 font-mono select-all">{leadDetail.phone || "Não informado"}</span>
                      </div>
                      {leadDetail.company && (
                        <div>
                          <span className="text-slate-500 block">Empresa:</span>
                          <span className="text-slate-200">{leadDetail.company}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-500 block">Origem:</span>
                        <span className="text-cyan-400">{leadDetail.source === "site_contact" ? "Formulário Website" : leadDetail.source}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block mb-1">Conteúdo da Mensagem:</span>
                      <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                        {leadDetail.message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Internal Notes Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Tag size={14} className="text-amber-400" />
                      Notas Internas do Gestor ({leadDetail.notes?.length || 0})
                    </span>
                  </h3>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Adicione uma nota interna sobre este cliente (ex: liguei às 14h, pediu reunião, orçamento em elaboração...)"
                      rows={2}
                      className="w-full bg-[#080b11] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={savingNote || !newNote.trim()}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Send size={13} />
                        <span>{savingNote ? "A guardar..." : "Registar Nota"}</span>
                      </button>
                    </div>
                  </form>

                  {/* Notes List */}
                  {leadDetail.notes && leadDetail.notes.length > 0 && (
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {leadDetail.notes.map((note) => (
                        <div key={note.id} className="p-3 rounded-lg bg-[#080b11] border border-slate-800 text-xs">
                          <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                            <span className="font-semibold text-slate-400">{note.authorName}</span>
                            <span>{new Date(note.createdAt).toLocaleString("pt-MZ")}</span>
                          </div>
                          <p className="text-slate-300 whitespace-pre-line">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Timeline / Activities */}
                {leadDetail.activities && leadDetail.activities.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Histórico de Atividades
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-400 max-h-36 overflow-y-auto">
                      {leadDetail.activities.map((act) => (
                        <div key={act.id} className="flex items-center justify-between py-1 border-b border-slate-900 text-[11px]">
                          <span className="text-slate-300">{act.description}</span>
                          <span className="text-slate-500 shrink-0 ml-2">{timeAgo(act.createdAt)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delete / Danger zone */}
                <div className="pt-3 border-t border-slate-800/80 flex justify-end">
                  <button
                    onClick={handleDeleteLead}
                    className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>Eliminar este Lead</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Manual Lead Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d121c] border border-slate-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Plus size={18} className="text-cyan-400" />
                Registar Novo Lead Manual
              </h2>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateManualLead} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    placeholder="Nome do cliente"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="email@cliente.com"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    placeholder="+258 84 000 0000"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Empresa / Organização
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    placeholder="Nome da empresa"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Estado Inicial
                  </label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value })}
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="NOVO">Novo</option>
                    <option value="EM_CONTACTO">Em Contacto</option>
                    <option value="PROPOSTA">Proposta</option>
                    <option value="NEGOCIACAO">Negociação</option>
                    <option value="CONVERTIDO">Convertido</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Prioridade
                  </label>
                  <select
                    value={newLeadForm.priority}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, priority: e.target.value })}
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="URGENTE">Urgente</option>
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Média</option>
                    <option value="BAIXA">Baixa</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Valor Estimado (MZN)
                  </label>
                  <input
                    type="number"
                    value={newLeadForm.estimatedValue}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, estimatedValue: e.target.value })}
                    placeholder="Ex: 50000"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Notas / Descrição da Necessidade
                </label>
                <textarea
                  rows={3}
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  placeholder="Descreva o que o cliente procura ou detalhes do primeiro contacto..."
                  className="w-full bg-[#080b11] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creatingLead}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 transition-all cursor-pointer"
                >
                  {creatingLead ? "A criar..." : "Gravar Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function InboxPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-slate-400">
          <RefreshCw size={24} className="animate-spin text-cyan-400 mx-auto mb-2" />
          <p className="text-xs">A carregar Inbox do CRM...</p>
        </div>
      }
    >
      <InboxContent />
    </Suspense>
  );
}
