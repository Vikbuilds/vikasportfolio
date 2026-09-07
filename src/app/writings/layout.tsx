import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Essays, reflections, and articles on software engineering, observation, human taste, and building products by Vikas Acharya.",
  openGraph: {
    title: "Writings — Vikas Acharya",
    description: "Essays and reflections on software engineering and life by Vikas Acharya.",
  },
};

export default function WritingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
