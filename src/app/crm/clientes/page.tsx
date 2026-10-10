"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Building,
  DollarSign,
  MessageCircle,
  Edit2,
  Trash2,
  CheckCircle,
  X,
  RefreshCw,
  MapPin,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  address: string | null;
  status: string;
  totalRevenue: number;
  notes: string | null;
  createdAt: string;
}

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    status: "ATIVO",
    totalRevenue: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());
      if (statusFilter !== "TODOS") params.append("status", statusFilter);

      const res = await fetch(`/api/crm/clients?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setClients(data.clients || []);
        setTotalRevenue(data.totalRevenue || 0);
      }
    } catch (e) {
      console.error("Error fetching clients:", e);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleOpenAdd = () => {
    setEditingClient(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      status: "ATIVO",
      totalRevenue: "",
      notes: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
      address: client.address || "",
      status: client.status,
      totalRevenue: client.totalRevenue ? String(client.totalRevenue) : "",
      notes: client.notes || "",
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setSaving(true);
      if (editingClient) {
        // PATCH
        const res = await fetch(`/api/crm/clients/${editingClient.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast("Cliente atualizado com sucesso!");
          setShowModal(false);
          fetchClients();
        }
      } else {
        // POST
        const res = await fetch("/api/crm/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          showToast("Cliente registado com sucesso!");
          setShowModal(false);
          fetchClients();
        }
      }
    } catch {
      showToast("Erro ao guardar cliente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (client: Client) => {
    if (!confirm(`Deseja realmente eliminar o cliente "${client.name}"?`)) return;

    try {
      const res = await fetch(`/api/crm/clients/${client.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Cliente eliminado.");
        fetchClients();
      }
    } catch {
      showToast("Erro ao eliminar.");
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-MZ", {
      style: "currency",
      currency: "MZN",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const getWhatsAppUrl = (phone: string | null, name: string) => {
    if (!phone) return null;
    const cleanPhone = phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("258") ? cleanPhone : `258${cleanPhone}`;
    const text = encodeURIComponent(`Olá ${name}! Entramos em contacto da Lisis Tecnologias e Serviços.`);
    return `https://wa.me/${formattedPhone}?text=${text}`;
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d131f] border border-cyan-500/40 text-cyan-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-sm animate-in fade-in">
          <CheckCircle size={16} className="text-cyan-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
            <Users size={26} className="text-emerald-400" />
            <span>Gestão de Clientes</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Diretório de clientes registados, contactos corporativos e volume de faturação.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchClients}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Atualizar</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 shadow-[0_2px_12px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Novo Cliente</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0c1018] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Total de Clientes</span>
            <p className="text-2xl font-bold text-white mt-1">{clients.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users size={20} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1018] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Clientes Ativos</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              {clients.filter((c) => c.status === "ATIVO").length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1018] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Volume Faturado</span>
            <p className="text-2xl font-bold font-mono text-cyan-300 mt-1">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, empresa, email, telefone..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#0c1018] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#0c1018] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
        >
          <option value="TODOS">Todos os Estados</option>
          <option value="ATIVO">Ativos</option>
          <option value="POTENCIAL">Potenciais</option>
          <option value="INATIVO">Inativos</option>
        </select>
      </div>

      {/* Clients Table / Cards */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 bg-[#0c1018] rounded-2xl border border-slate-800">
          <RefreshCw size={24} className="animate-spin text-cyan-400 mx-auto mb-2" />
          <p className="text-xs">A carregar clientes...</p>
        </div>
      ) : clients.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-[#0c1018] rounded-2xl border border-slate-800">
          <Users size={32} className="text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-200">Nenhum cliente registado</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Pode converter leads recebidos no Inbox em clientes permanentes ou registar novos clientes diretamente.
          </p>
        </div>
      ) : (
        <div className="bg-[#0c1018] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080b11] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Empresa</th>
                  <th className="py-3 px-4">Contactos</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Faturação</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {clients.map((c) => {
                  const waUrl = getWhatsAppUrl(c.phone, c.name);

                  return (
                    <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white text-sm">{c.name}</div>
                        {c.address && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin size={11} /> {c.address}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        {c.company ? (
                          <span className="flex items-center gap-1.5 font-medium">
                            <Building size={13} className="text-slate-500" />
                            {c.company}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 space-y-1">
                        {c.email && (
                          <a
                            href={`mailto:${c.email}`}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                          >
                            <Mail size={12} />
                            <span>{c.email}</span>
                          </a>
                        )}
                        {c.phone && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Phone size={12} />
                            <span>{c.phone}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            c.status === "ATIVO"
                              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                              : c.status === "POTENCIAL"
                              ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                              : "bg-slate-700/20 text-slate-400 border-slate-700"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold text-emerald-400 text-xs">
                        {formatCurrency(c.totalRevenue)}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {waUrl && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-[#25D366] hover:bg-[#25D366]/15 transition-colors"
                              title="WhatsApp"
                            >
                              <MessageCircle size={15} />
                            </a>
                          )}
                          <button
                            onClick={() => handleOpenEdit(c)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Editar"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(c)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Client */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d121c] border border-slate-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Users size={18} className="text-emerald-400" />
                <span>{editingClient ? "Editar Cliente" : "Registar Novo Cliente"}</span>
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome do cliente"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Empresa</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nome da empresa"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@cliente.com"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+258 84 000 0000"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Estado</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="ATIVO">Ativo</option>
                    <option value="POTENCIAL">Potencial</option>
                    <option value="INATIVO">Inativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Total Faturado (MZN)</label>
                  <input
                    type="number"
                    value={formData.totalRevenue}
                    onChange={(e) => setFormData({ ...formData, totalRevenue: e.target.value })}
                    placeholder="Ex: 120000"
                    className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Endereço / Localização</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ex: Maputo, Matola, etc."
                  className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Observações Internas</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notas e histórico sobre este cliente..."
                  className="w-full bg-[#080b11] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 transition-all cursor-pointer"
                >
                  {saving ? "A gravar..." : "Guardar Dados"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
