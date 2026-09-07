import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visuals",
  description:
    "Visual journal, moments, light, and perspective captured through Vikas Acharya's lens.",
  openGraph: {
    title: "Visuals — Vikas Acharya",
    description: "Visual journal and photography by Vikas Acharya.",
  },
};

export default function VisualsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
