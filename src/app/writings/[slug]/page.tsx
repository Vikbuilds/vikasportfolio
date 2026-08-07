import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { Navbar } from "@/components/navbar";
import { BlogContent } from "@/components/blog-content";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(blog.title)}&subtitle=${encodeURIComponent(blog.subtitle)}&category=WRITINGS`;

  return {
    title: `${blog.title} — Vikas Acharya`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [ogUrl],
    },
  };
}

export default async function WritingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <BlogContent blog={blog} />
    </>
  );
}
