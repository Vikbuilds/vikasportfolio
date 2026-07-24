import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { blogs } from "@/data/blogs";
import { Navbar } from "@/components/navbar";
import { BlogContent } from "@/components/blog-content";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // This is async in Next.js 16 but we need sync access for static generation
  return {};
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
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
