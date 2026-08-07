"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { blogs } from "@/data/blogs";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function WritingsListPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-2"
          >
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Writings
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Writing about whatever I know, learn, and experience in life.
            </p>
          </motion.div>

          <div className="space-y-2">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: "easeOut",
                }}
                className="relative"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link
                  href={`/writings/${blog.slug}`}
                  className={`group flex flex-col gap-1.5 rounded-xl p-4 transition-all duration-300 ${
                    hoveredIndex !== null && hoveredIndex !== i
                      ? "opacity-35 blur-[2.5px]"
                      : "hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-foreground/80">
                      {blog.title}
                    </h2>
                    <ArrowUpRight
                      size={14}
                      className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground/90">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-2.5 text-[11px] font-mono text-muted-foreground/60 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>·</span>
                    <span>{blog.readTime}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <div className="mx-auto w-full max-w-xl px-5 pb-16">
        <Footer />
      </div>

      {/* Progressive blur at bottom */}
      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
