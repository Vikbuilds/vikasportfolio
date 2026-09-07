import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Schibsted_Grotesk, Baloo_Bhaijaan_2 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { PageTransition } from "@/components/page-transition";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
});

const baloo = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  variable: "--font-baloo",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vikasacharya.me";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Vikas Acharya — Fullstack Software Builder",
    template: "%s | Vikas Acharya",
  },
  description:
    "Software builder and fullstack developer crafting robust applications for web and mobile. Creator of craked.dev, poloro.xyz, and plibo.xyz. Explore my projects, writings, and open-source contributions.",
  keywords: [
    "Vikas Acharya",
    "Vikbuilds",
    "Fullstack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "craked.dev",
    "poloro.xyz",
    "plibo.xyz",
    "Web Developer Portfolio",
    "Generative Engine Optimization"
  ],
  authors: [{ name: "Vikas Acharya", url: baseUrl }],
  creator: "Vikas Acharya",
  publisher: "Vikas Acharya",
  alternates: {
    canonical: "./",
  },
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
    title: "Vikas Acharya — Fullstack Software Builder",
    description:
      "Software builder and fullstack developer crafting robust applications for web and mobile. Creator of craked.dev, poloro.xyz, and plibo.xyz.",
    type: "website",
    url: baseUrl,
    siteName: "Vikas Acharya",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vikas Acharya — Fullstack Software Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VikasAcharyaa",
    creator: "@VikasAcharyaa",
    title: "Vikas Acharya — Fullstack Software Builder",
    description:
      "Software builder and fullstack developer crafting robust applications for web and mobile.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(geist.variable, schibstedGrotesk.variable, baloo.variable, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <PersonJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="d92f05f0-3cf6-4d7e-b7f2-7066eef3dcad"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageTransition>{children}</PageTransition>
          <CommandPalette />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

