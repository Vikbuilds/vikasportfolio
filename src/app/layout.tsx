import type { Metadata } from "next";
import { Inter, Baloo_Bhaijaan_2 } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const balooBhaijaan2 = Baloo_Bhaijaan_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "Shivam Verma — Software Engineer",
  description:
    "Software builder and fullstack developer crafting robust applications for the web and mobile. Explore my projects, blog, and open-source contributions.",
  openGraph: {
    title: "Shivam Verma — Software Engineer",
    description:
      "Software builder and fullstack developer crafting robust applications for the web and mobile.",
    type: "website",
    url: "https://theadroitdev.com",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@theadroitdev",
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
      className={cn(inter.variable, balooBhaijaan2.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
