"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon } from "@/components/icons";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { projects, type Project } from "@/data/projects";

const statusConfig: Record<string, { label: string; className: string }> = {
  live: {
    label: "Live",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  building: {
    label: "Building",
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  "coming-soon": {
    label: "Coming Soon",
    className:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
};

const projectDetails: Record<string, string> = {
  DevSync:
    "DevSync was born from the frustration of screen-sharing during pair programming sessions. The latency was unbearable, and context switching between a shared screen and your own editor killed productivity. So I built a real-time collaborative code editor from scratch.\n\nThe core uses Monaco Editor (the same engine behind VS Code) wrapped in a custom React component. Real-time synchronization is handled through Socket.io with operational transformation to resolve concurrent edits without conflicts. The architecture supports up to 8 simultaneous editors with sub-50ms sync latency.\n\nThe integrated terminal runs in a sandboxed Docker container per session, so collaborators can run code without affecting each other's environments. Redis handles session state, cursor positions, and chat messages. The live preview pane updates on every keystroke with debounced compilation.",
  PayTrail:
    "PayTrail started as an internal tool for tracking freelance invoices but evolved into a full fintech dashboard. The React Native app provides a unified view of payments across Stripe, Razorpay, and manual bank transfers.\n\nThe dashboard features real-time data visualization using Victory Native for charts and D3.js for custom analytics widgets. Subscription analytics track MRR, churn rate, and LTV with cohort analysis. The PostgreSQL backend handles complex financial aggregations with materialized views that refresh every 15 minutes.\n\nPush notifications alert users about payment failures, upcoming renewals, and revenue milestones. The app uses end-to-end encryption for sensitive financial data, and all API calls go through a rate-limited proxy layer to prevent abuse.",
  InkDrop:
    "InkDrop is my take on what a modern blogging platform should be: minimal in design, maximal in developer experience. It's built on Next.js with MDX for content authoring, giving writers the full power of React components inside their markdown.\n\nThe platform includes automatic SEO optimization: dynamic og:image generation, structured data markup, sitemap generation, and canonical URL management. RSS feeds are generated at build time with full content for readers who prefer feed readers.\n\nCustom theming is handled through CSS custom properties with a visual theme editor. Authors can create their own color schemes, typography settings, and layout variations without touching code. The platform supports syntax highlighting for 50+ languages, LaTeX math rendering, and interactive code sandboxes powered by Sandpack.",
};

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section id="projects" className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Proof of Work
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A selection of things I&apos;ve built and shipped.
        </p>
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Expanded card */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-card sm:rounded-2xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  src={active.thumbnail}
                  alt={active.title}
                  width={500}
                  height={280}
                  className="h-72 w-full object-cover object-top sm:rounded-t-2xl"
                />
              </motion.div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-base font-semibold text-foreground"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`desc-${active.title}-${id}`}
                      className="mt-1 text-sm text-muted-foreground"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {active.githubUrl && (
                      <a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <GitHubIcon size={15} />
                      </a>
                    )}
                    {active.liveUrl && (
                      <a
                        href={active.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 space-y-4"
                >
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {active.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Detailed description */}
                  <div className="max-h-48 overflow-auto text-sm leading-relaxed text-muted-foreground [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {(projectDetails[active.title] || active.description)
                      .split("\n\n")
                      .map((p, i) => (
                        <p key={i} className="mb-3 last:mb-0">
                          {p}
                        </p>
                      ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Card grid — 2 columns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, i) => {
          const status = statusConfig[project.status];
          return (
            <motion.div
              key={project.title}
              layoutId={`card-${project.title}-${id}`}
              onClick={() => setActive(project)}
              className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-border/80 hover:shadow-sm dark:hover:shadow-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: "easeOut",
              }}
            >
              <motion.div layoutId={`image-${project.title}-${id}`}>
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 384px"
                  />
                  <div className="absolute right-2 top-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-medium ${status.className}`}
                    >
                      {status.label}
                    </Badge>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-1.5 p-4">
                <motion.h3
                  layoutId={`title-${project.title}-${id}`}
                  className="text-sm font-semibold tracking-tight text-foreground"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  layoutId={`desc-${project.title}-${id}`}
                  className="line-clamp-2 text-xs leading-relaxed text-muted-foreground"
                >
                  {project.description}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function CloseIcon() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-foreground"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}
