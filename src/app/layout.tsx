import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Schibsted_Grotesk, Baloo_Bhaijaan_2 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { PageTransition } from "@/components/page-transition";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
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
    default: "Vikas Acharya",
    template: "%s | Vikas Acharya",
  },
  description:
    "Software builder and fullstack developer crafting robust applications for the web and mobile. Explore my projects, blog, and open-source contributions.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Vikas Acharya",
    description:
      "Software builder and fullstack developer crafting robust applications for the web and mobile.",
    type: "website",
    url: baseUrl,
    siteName: "Vikas Acharya",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vikas Acharya — My corner of the internet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@VikasAcharyaa",
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
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d92f05f0-3cf6-4d7e-b7f2-7066eef3dcad"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageTransition>{children}</PageTransition>
          <CommandPalette />
          <SmoothCursor />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
