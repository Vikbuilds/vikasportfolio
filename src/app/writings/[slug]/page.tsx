import { notFound } from "next/navigation";
import { blogs } from "@/data/blogs";
import { Navbar } from "@/components/navbar";
import { BlogContent } from "@/components/blog-content";

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
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
