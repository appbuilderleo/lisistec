"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Inbox,
  GitFork,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  PlusCircle,
  Menu,
  X,
  ShieldCheck,
  Bell,
  RefreshCw,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function CrmSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [newLeadsCount, setNewLeadsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // If on login page, don't show CRM navigation shell
  const isLoginPage = pathname === "/crm/login";

  useEffect(() => {
    if (isLoginPage) return;

    // Fetch user and stats
    const fetchAuth = async () => {
      try {
        const res = await fetch("/api/crm/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/crm/login");
        }
      } catch {
        router.push("/crm/login");
      } finally {
        setLoading(false);
      }
    };

    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/crm/stats");
        if (res.ok) {
          const data = await res.json();
          setNewLeadsCount(data.stats?.newLeads || 0);
        }
      } catch (e) {
        console.error("Failed to fetch counts", e);
      }
    };

    fetchAuth();
    fetchCounts();

    // Poll every 30 seconds for new incoming leads
    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, [pathname, isLoginPage, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/crm/auth/logout", { method: "POST" });
      router.push("/crm/login");
      router.refresh();
    } catch {
      router.push("/crm/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center text-slate-400">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4" />
        <p className="text-sm tracking-wide">A carregar o Lisis CRM...</p>
      </div>
    );
  }

  const navLinks = [
    {
      href: "/crm",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      href: "/crm/inbox",
      label: "Inbox & Leads",
      icon: Inbox,
      badge: newLeadsCount > 0 ? newLeadsCount : undefined,
    },
    {
      href: "/crm/pipeline",
      label: "Pipeline / Funil",
      icon: GitFork,
    },
    {
      href: "/crm/clientes",
      label: "Clientes",
      icon: Users,
    },
    {
      href: "/crm/configuracoes",
      label: "Configurações",
      icon: Settings,
    },
  ];

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0d111a] border-b border-slate-800/80 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Image
            src="/logolisisnova.png"
            alt="Lisis Technologies"
            width={32}
            height={32}
            className="rounded"
          />
          <div>
            <span className="font-heading font-bold text-white text-base">Lisis CRM</span>
            <span className="text-[10px] text-cyan-400 block -mt-1 font-mono">WORKSPACE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {newLeadsCount > 0 && (
            <Link
              href="/crm/inbox"
              className="relative p-2 text-amber-400 hover:text-amber-300"
              aria-label={`${newLeadsCount} novos leads`}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
            </Link>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/60"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 z-50 w-72 bg-[#0c1018] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } h-screen`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/crm" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
              <Image
                src="/logolisisnova.png"
                alt="Lisis Technologies"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-white text-base tracking-tight">Lisis CRM</span>
                <span className="text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.2 rounded font-mono">v1.2</span>
              </div>
              <p className="text-xs text-slate-400">Gestão de Clientes & Leads</p>
            </div>
          </Link>
        </div>

        {/* Quick Action Button */}
        <div className="px-4 pt-4 pb-2">
          <Link
            href="/crm/inbox?novo=1"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold shadow-[0_4px_16px_rgba(0,242,254,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle size={18} />
            <span>Registar Novo Lead</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Menu Principal
          </div>
          {navLinks.map((link) => {
            const active = isActive(link.href, link.exact);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  active
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,242,254,0.1)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={19}
                    className={`transition-colors ${
                      active ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-amber-500 text-slate-950 shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Atalhos
          </div>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink size={18} className="text-slate-500" />
              <span>Ver Site Público</span>
            </div>
          </Link>
        </nav>

        {/* User Info & Logout Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#090d14]/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(0,242,254,0.2)]">
                {user?.name ? user.name[0].toUpperCase() : "A"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-200 truncate">{user?.name || "Administrador"}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <ShieldCheck size={12} />
                  <span>{user?.role || "ADMIN"}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
              title="Terminar Sessão"
              aria-label="Terminar Sessão"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
