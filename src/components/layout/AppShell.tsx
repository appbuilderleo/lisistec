"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import LogoPreloader from "@/components/layout/LogoPreloader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCrm = pathname?.startsWith("/crm");

  if (isCrm) {
    return <div className="crm-root min-h-screen text-slate-100 bg-[#080b11]">{children}</div>;
  }

  return (
    <>
      <LogoPreloader />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
