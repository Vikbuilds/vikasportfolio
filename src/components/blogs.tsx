"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { blogs } from "@/data/blogs";

export function Blogs() {
  return (
    <section id="blogs" className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Blogs
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Writing about code, architecture, and lessons learned.
        </p>
      </motion.div>

      <div className="space-y-3">
        {blogs.map((blog, i) => (
          <motion.a
            key={blog.title}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-border/80 hover:shadow-sm dark:hover:shadow-none"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-medium tracking-tight text-foreground transition-colors duration-200 group-hover:text-foreground/80">
                {blog.title}
              </h3>
              <ArrowUpRight
                size={16}
                className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {blog.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{blog.readTime}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
