"use client";

import { useCallback, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Undo2, LinkIcon, Check } from "lucide-react";
import type { Blog } from "@/data/blogs";
import { CodeBlock } from "@/components/ui/code-block";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import confetti from "canvas-confetti";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogContent({ blog }: { blog: Blog }) {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    
    // Confetti!
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    confetti({
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
      particleCount: 50,
      spread: 60,
    });
    
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Extract h2 sections for ScrollProgress
  const sections = useMemo(() => {
    return blog.content
      .split("\n\n")
      .filter((block) => block.startsWith("## ") || block.startsWith("### "))
      .map((block) => {
        const label = block.replace(/^#+\s/, "");
        return { id: slugify(label), label };
      });
  }, [blog.content]);

  const renderContent = (content: string) => {
    const blocks = content.split("\n\n");
    const elements: React.ReactNode[] = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      // Code blocks: ```language ... ```
      if (block.startsWith("```")) {
        const langMatch = block.match(/^```(\w+)?/);
        const lang = langMatch?.[1] || "text";
        let codeContent = block.replace(/^```\w*\n?/, "");
        if (codeContent.endsWith("```")) {
          codeContent = codeContent.slice(0, -3).trimEnd();
        } else {
          while (i + 1 < blocks.length && !blocks[i + 1].endsWith("```")) {
            i++;
            codeContent += "\n\n" + blocks[i];
          }
          if (i + 1 < blocks.length) {
            i++;
            codeContent += "\n\n" + blocks[i].replace(/```$/, "").trimEnd();
          }
        }
        elements.push(
          <div key={i} className="my-6">
            <CodeBlock
              code={codeContent}
              language={lang}
              accent="#39d353"
              showFrame={false}
              showHeader={false}
              showLineNumbers
              showCopyButton
            />
          </div>
        );
        continue;
      }

      // Headings — add id for scroll-progress linking
      if (block.startsWith("## ")) {
        const text = block.replace("## ", "");
        elements.push(
          <h2
            key={i}
            id={slugify(text)}
            className="mt-10 mb-4 text-lg font-semibold tracking-tight text-foreground scroll-mt-20"
          >
            {text}
          </h2>
        );
        continue;
      }
      if (block.startsWith("### ")) {
        const text = block.replace("### ", "");
        elements.push(
          <h3
            key={i}
            id={slugify(text)}
            className="mt-7 mb-3 text-base font-semibold tracking-tight text-foreground scroll-mt-20"
          >
            {text}
          </h3>
        );
        continue;
      }

      // Lists
      if (block.startsWith("1. ") || block.startsWith("- ")) {
        const items = block.split("\n");
        const isOrdered = block.startsWith("1. ");
        const ListTag = isOrdered ? "ol" : "ul";
        elements.push(
          <ListTag
            key={i}
            className={`my-4 space-y-2 pl-6 ${isOrdered ? "list-decimal" : "list-disc"} text-foreground/80`}
          >
            {items.map((item, j) => {
              const text = item.replace(/^\d+\.\s|^-\s/, "");
              const parts = text.split(/\*\*(.*?)\*\*/);
              return (
                <li key={j} className="text-[15px] leading-relaxed">
                  {parts.map((part, k) =>
                    k % 2 === 1 ? (
                      <strong key={k} className="font-semibold text-foreground">
                        {part}
                      </strong>
                    ) : (
                      <span key={k}>{part}</span>
                    )
                  )}
                </li>
              );
            })}
          </ListTag>
        );
        continue;
      }

      // Regular paragraphs — handle inline `code` and **bold**
      elements.push(
        <p key={i} className="my-4 text-foreground/80 leading-[1.8]">
          {block.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((segment, k) => {
            if (segment.startsWith("`") && segment.endsWith("`")) {
              return (
                <code
                  key={k}
                  className="rounded-md bg-muted px-1.5 py-0.5 text-[13px] font-mono text-foreground"
                >
                  {segment.slice(1, -1)}
                </code>
              );
            }
            if (segment.startsWith("**") && segment.endsWith("**")) {
              return (
                <strong key={k} className="font-semibold text-foreground">
                  {segment.slice(2, -2)}
                </strong>
              );
            }
            return <span key={k}>{segment}</span>;
          })}
        </p>
      );
    }

    return elements;
  };

  return (
    <>
      {/* ScrollProgress with sections — z-[200] so it stays above progressive blur (z-30) */}
      <ScrollProgress className="z-200" sections={sections} />

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Back button — Undo2 icon */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground/70"
          >
            <Undo2 size={16} />
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
          <hr className="border-dashed border-border/15" />

          {/* Blog content */}
          <article className="max-w-none text-[15px] leading-relaxed ">
            {renderContent(blog.content)}
          </article>
        </motion.div>
      </main>

      <div className="mx-auto w-full max-w-3xl px-6 pb-20">
        <Footer />
      </div>

      {/* Progressive blur at bottom — z-30 */}
      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
