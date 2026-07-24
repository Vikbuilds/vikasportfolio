"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import type { Blog } from "@/data/blogs";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export function BlogContent({ blog }: { blog: Blog }) {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <>
      <ScrollProgress className="fixed top-0 left-0 z-[200]" />
      <main className="mx-auto w-full max-w-[768px] px-6 pb-16 pt-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/70"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          {/* Thumbnail */}
          <div className="overflow-hidden rounded-xl">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              width={768}
              height={432}
              className="w-full object-cover"
              priority
            />
          </div>

          {/* Title + meta */}
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {blog.title}
            </h1>
            <p className="text-base text-muted-foreground">{blog.subtitle}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground/70">
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                · {blog.readTime}
              </span>
              <button
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <LinkIcon size={14} />
                    Share
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-dashed border-border/40" />

          {/* Blog content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none text-[15px] leading-relaxed">
            {blog.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-8 mb-4 text-lg font-semibold tracking-tight text-foreground"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={i}
                    className="mt-6 mb-3 text-base font-semibold tracking-tight text-foreground"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
                const items = paragraph.split("\n");
                const isOrdered = paragraph.startsWith("1. ");
                const ListTag = isOrdered ? "ol" : "ul";
                return (
                  <ListTag
                    key={i}
                    className={`my-4 space-y-2 pl-6 ${
                      isOrdered ? "list-decimal" : "list-disc"
                    } text-foreground/80`}
                  >
                    {items.map((item, j) => (
                      <li key={j} className="text-[15px] leading-relaxed">
                        {item.replace(/^\d+\.\s|^-\s/, "")}
                      </li>
                    ))}
                  </ListTag>
                );
              }
              return (
                <p key={i} className="my-4 text-foreground/80 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </article>
        </motion.div>
      </main>
    </>
  );
}
