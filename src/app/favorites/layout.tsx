import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
  description:
    "Curated list of favorite tools, hardware, books, apps, and software used and recommended by Vikas Acharya.",
  openGraph: {
    title: "Favorites — Vikas Acharya",
    description: "Curated tools, apps, and recommendations by Vikas Acharya.",
  },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
