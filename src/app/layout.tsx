import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lisis-tecnologias.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lisis Tecnologias e Serviços | Engenharia de Software, Sistemas e Branding em Moçambique",
    template: "%s | Lisis Tecnologias e Serviços",
  },
  description:
    "Mais de 7 anos de experiência e mais de 15 projectos entregues em Moçambique. Desenvolvimento de software, sistemas ERP/POS/CRM, portais governamentais e identidade visual corporativa.",
  keywords: [
    "desenvolvimento software Moçambique",
    "aplicações móveis Maputo",
    "sistemas de gestão ERP POS",
    "consultoria tecnológica Moçambique",
    "Lisis Tecnologias e Serviços",
    "design e identidade visual Maputo",
    "desenvolvimento web Moçambique",
    "Lisis School",
    "Lisis Assist",
    "Stoka POS",
  ],
  authors: [{ name: "Lisis Tecnologias e Serviços" }],
  creator: "Lisis Tecnologias e Serviços",
  publisher: "Lisis Tecnologias e Serviços",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_MZ",
    url: siteUrl,
    siteName: "Lisis Tecnologias e Serviços",
    title: "Lisis Tecnologias e Serviços | Engenharia Digital & Branding em Moçambique",
    description:
      "Mais de 7 anos de experiência a desenvolver sistemas de gestão, portais institucionais, aplicações móveis e identidades visuais para instituições públicas e empresas em Moçambique.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lisis Tecnologias e Serviços",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lisis Tecnologias e Serviços",
    description:
      "Engenharia de software, sistemas de gestão e branding corporativo em Moçambique.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "pt-MZ": `${siteUrl}`,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      data-theme="dark"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Flash-free Theme Initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('lisis-theme');
                  if (saved === 'light' || saved === 'dark') {
                    document.documentElement.setAttribute('data-theme', saved);
                  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Lisis Tecnologias e Serviços",
              alternateName: "Lisis Tech",
              url: siteUrl,
              logo: `${siteUrl}/logolisisnova.png`,
              foundingDate: "2019",
              description:
                "Empresa moçambicana de engenharia de software, sistemas de gestão, aplicações móveis e identidade visual corporativa com mais de 7 anos de experiência.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Maputo",
                addressCountry: "MZ",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+258844647599",
                contactType: "customer service",
                email: "appbuilderleo@gmail.com",
                availableLanguage: ["Portuguese"],
              },
              sameAs: [
                "https://www.linkedin.com/company/lisis-tecnologias",
                "https://www.instagram.com/lisistecnologias",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-bg text-text font-body">
        <a href="#main-content" className="skip-link">
          Saltar para o conteúdo principal
        </a>
        {/* Ambient background orbs */}
        <div className="orb-1" aria-hidden="true" />
        <div className="orb-2" aria-hidden="true" />

        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
