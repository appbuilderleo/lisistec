"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  User,
  Lock,
  Database,
  CheckCircle,
  AlertCircle,
  Save,
  Key,
  Server,
  RefreshCw,
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [profileToast, setProfileToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [passwordToast, setPasswordToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/crm/auth/me");
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.user?.name || "",
            email: data.user?.email || "",
          });
        }
      } catch (e) {
        console.error("Error fetching admin profile:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileToast(null);
    setSavingProfile(true);

    try {
      const res = await fetch("/api/crm/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProfileToast({ type: "success", msg: "Dados do administrador atualizados com sucesso!" });
      } else {
        setProfileToast({ type: "error", msg: data.error || "Erro ao atualizar dados." });
      }
    } catch {
      setProfileToast({ type: "error", msg: "Falha na comunicação com o servidor." });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordToast(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordToast({ type: "error", msg: "A nova palavra-passe e a confirmação não coincidem." });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordToast({ type: "error", msg: "A nova palavra-passe deve ter pelo menos 8 caracteres." });
      return;
    }

    setSavingPassword(true);

    try {
      const res = await fetch("/api/crm/auth/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordToast({ type: "success", msg: "Palavra-passe alterada com sucesso!" });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setPasswordToast({ type: "error", msg: data.error || "Erro ao alterar palavra-passe." });
      }
    } catch {
      setPasswordToast({ type: "error", msg: "Falha na comunicação com o servidor." });
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400">
        <RefreshCw size={24} className="animate-spin text-cyan-400 mx-auto mb-2" />
        <p className="text-xs">A carregar configurações...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800/60">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight flex items-center gap-3">
          <Settings size={26} className="text-cyan-400" />
          <span>Configurações & Segurança</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Gestão da conta do administrador, segurança e diagnóstico do subsistema CRM.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-[#0c1018] border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <User size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Perfil do Administrador</h2>
              <p className="text-xs text-slate-400">Nome de exibição e email de acesso</p>
            </div>
          </div>

          {profileToast && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                profileToast.type === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
              }`}
            >
              {profileToast.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              <span>{profileToast.msg}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nome do Gestor</label>
              <input
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email de Acesso</label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Save size={14} />
              <span>{savingProfile ? "A guardar..." : "Guardar Alterações"}</span>
            </button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="p-6 rounded-2xl bg-[#0c1018] border border-slate-800 space-y-4 shadow-lg">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Key size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Alterar Palavra-passe</h2>
              <p className="text-xs text-slate-400">Atualize a sua senha de acesso ao CRM</p>
            </div>
          </div>

          {passwordToast && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                passwordToast.type === "success"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
              }`}
            >
              {passwordToast.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              <span>{passwordToast.msg}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Palavra-passe Atual</label>
              <input
                type="password"
                required
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="••••••••••••"
                className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nova Palavra-passe</label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="Mínimo de 8 caracteres"
                className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar Nova Palavra-passe</label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="Repita a nova palavra-passe"
                className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              disabled={savingPassword}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Lock size={14} />
              <span>{savingPassword ? "A atualizar..." : "Atualizar Palavra-passe"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* System Diagnostics & Architecture Information */}
      <div className="p-6 rounded-2xl bg-[#0c1018] border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Server size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Diagnóstico do Subsistema & Base de Dados</h2>
            <p className="text-xs text-slate-400">Informações técnicas de execução</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#080b11] border border-slate-800/80">
            <span className="text-slate-500 block">Base de Dados:</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              CockroachDB Cloud
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080b11] border border-slate-800/80">
            <span className="text-slate-500 block">Autenticação:</span>
            <span className="font-semibold text-cyan-400 flex items-center gap-1.5 mt-1">
              <Shield size={13} />
              PBKDF2 SHA-512 + Signed Session
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080b11] border border-slate-800/80">
            <span className="text-slate-500 block">Integração Formulário:</span>
            <span className="font-semibold text-white flex items-center gap-1.5 mt-1">
              <CheckCircle size={13} className="text-emerald-400" />
              Automática (/api/contact)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080b11] border border-slate-800/80">
            <span className="text-slate-500 block">Ambiente:</span>
            <span className="font-semibold text-slate-300 font-mono mt-1">
              Next.js 16 + Turbopack
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
