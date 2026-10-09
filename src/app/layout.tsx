import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lisis-tecnologias.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lisis Tecnologias e Serviços | Smart Solutions. Real Growth.",
    template: "%s | Lisis Tecnologias e Serviços",
  },
  description:
    "Transformamos ideias em soluções digitais. Desenvolvimento de software, aplicações móveis, sistemas de gestão e consultoria tecnológica em Moçambique.",
  keywords: [
    "desenvolvimento software Moçambique",
    "aplicações móveis Maputo",
    "sistemas de gestão",
    "consultoria tecnológica",
    "Lisis Tecnologias",
    "soluções digitais",
    "desenvolvimento web Moçambique",
    "IT Moçambique",
    "Lisis School",
    "Lisis Assist",
    "Stoka",
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
    title: "Lisis Tecnologias e Serviços | Smart Solutions. Real Growth.",
    description:
      "Transformamos ideias em soluções digitais. Desenvolvimento de software, aplicações móveis, sistemas de gestão em Moçambique.",
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
      "Transformamos ideias em soluções digitais em Moçambique.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "google-site-verification-placeholder",
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
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
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
              logo: `${siteUrl}/logo.png`,
              description:
                "Empresa de tecnologia em Moçambique especializada em desenvolvimento de software, aplicações móveis e sistemas de gestão.",
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
        {/* Ambient background orbs */}
        <div className="orb-1" aria-hidden="true" />
        <div className="orb-2" aria-hidden="true" />

        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
