"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { SparklesText } from "@/components/ui/sparkles-text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { projects, type Project } from "@/data/projects";

/* ── Tech Icons ──────────────────────────────── */

function NextjsIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  );
}

function SocketIoIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M11.936.012C5.442.117.461 5.03.028 11.509c-.46 6.884 5.321 12.849 12.217 12.479 6.46-.347 11.502-5.591 11.743-12.065C24.217 5.2 18.678-.094 11.936.012zM8.17 17.078c-.655-.003-1.14-.553-1.142-1.19a5.628 5.628 0 0 1 .04-.663c.108-.76.274-1.505.47-2.242.31-1.16.678-2.305 1.073-3.44.3-.862.612-1.72.946-2.568.128-.325.285-.641.442-.954.17-.34.358-.672.594-.976.253-.327.55-.608.914-.809.293-.161.605-.26.937-.268.28-.007.553.033.808.154.301.143.503.373.594.693.066.229.067.462.035.695-.097.69-.264 1.365-.449 2.035-.417 1.505-.859 3.002-1.343 4.487-.282.867-.575 1.73-.895 2.582-.186.496-.392.984-.662 1.44-.326.552-.74 1.021-1.327 1.306-.29.143-.599.224-.92.276-.037.005-.074.003-.115.004zm7.66-10.156c.656.003 1.14.553 1.142 1.19a5.628 5.628 0 0 1-.04.663c-.108.76-.274 1.505-.47 2.242-.31 1.16-.678 2.305-1.073 3.44-.3.862-.612 1.72-.946 2.568-.128.325-.285.641-.442.954-.17.34-.358.672-.594.976-.253.327-.55.608-.914.809-.293.161-.605.26-.937.268-.28.007-.553-.033-.808-.154-.301-.143-.503-.373-.594-.693a1.772 1.772 0 0 1-.035-.695c.097-.69.264-1.365.449-2.035.417-1.505.859-3.002 1.343-4.487.282-.867.575-1.73.895-2.582.186-.496.392-.984.662-1.44.326-.552.74-1.021 1.327-1.306.29-.143.599-.224.92-.276.037-.005.074-.003.115-.004z" />
    </svg>
  );
}

function MonacoIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  );
}

function RedisIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M10.5 2.661l.54.997-1.797.644 2.409.218.748 1.246.467-1.163 2.141-.191-1.689-.604.477-1.07-1.453.628zm3.905 1.893l2.63 1.09c-1.097.457-3.426 1.38-3.613 1.49-.195.115-1.063.595-1.063.595l-.007-2.063c.005-.013.39-.17.604-.268l1.449-.844z" />
    </svg>
  );
}

function ReactNativeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.068-.846.206C5.33 2.06 5.01 3.525 5.452 5.598 3.886 6.67 2.508 8.246 2.508 10c0 1.753 1.378 3.33 3.834 4.4-.44 2.085-.12 3.556.808 4.08.251.136.535.202.846.202 1.346 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .592-.066.846-.204.927-.521 1.246-1.985.806-4.059 2.44-1.066 3.82-2.64 3.82-4.396 0-1.754-1.378-3.33-3.835-4.402.44-2.073.12-3.545-.808-4.065-.25-.138-.534-.204-.845-.204z" />
    </svg>
  );
}

function NodejsIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.28.28 0 0 0-.139.24v10.15a.27.27 0 0 0 .136.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.55l-2.307-1.33A1.85 1.85 0 0 1 1.356 17.072V6.921a1.85 1.85 0 0 1 .922-1.603l8.795-5.082a1.93 1.93 0 0 1 1.85 0l8.794 5.082c.57.329.924.943.924 1.603v10.15a1.853 1.853 0 0 1-.924 1.604l-8.795 5.078c-.28.163-.6.247-.924.247z" />
    </svg>
  );
}

function PostgreSQLIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.819 2.872.394 4.481.653 6.682c.108.916.345 1.932.674 3.018.33 1.09.765 2.25 1.33 3.353.565 1.103 1.193 2.04 1.956 2.77.381.365.819.676 1.319.87.25.097.514.163.787.163.472 0 .892-.196 1.225-.522.333-.326.56-.758.763-1.208z" />
    </svg>
  );
}

function StripeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
    </svg>
  );
}

function MDXIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M.79 7.12h22.42c.436 0 .79.355.79.792v8.176c0 .436-.354.792-.79.792H.79a.793.793 0 0 1-.79-.792V7.912c0-.437.354-.792.79-.792z" />
    </svg>
  );
}

function TailwindIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function VercelIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  );
}

const techIcons: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>; color: string }> = {
  "Next.js": { icon: NextjsIcon, color: "hover:text-foreground" },
  "Socket.io": { icon: SocketIoIcon, color: "hover:text-foreground" },
  "Monaco Editor": { icon: MonacoIcon, color: "hover:text-[#007ACC]" },
  "Redis": { icon: RedisIcon, color: "hover:text-[#DC382D]" },
  "React Native": { icon: ReactNativeIcon, color: "hover:text-[#61DAFB]" },
  "Node.js": { icon: NodejsIcon, color: "hover:text-[#5FA04E]" },
  "PostgreSQL": { icon: PostgreSQLIcon, color: "hover:text-[#4169E1]" },
  "Stripe": { icon: StripeIcon, color: "hover:text-[#635BFF]" },
  "MDX": { icon: MDXIcon, color: "hover:text-[#FCB32C]" },
  "Tailwind CSS": { icon: TailwindIcon, color: "hover:text-[#06B6D4]" },
  "Vercel": { icon: VercelIcon, color: "hover:text-foreground" },
};

const projectDetails: Record<string, string> = {
  DevSync:
    "DevSync was born from the frustration of screen-sharing during pair programming sessions. The latency was unbearable, and context switching between a shared screen and your own editor killed productivity. So I built a real-time collaborative code editor from scratch.\n\nThe core uses Monaco Editor (the same engine behind VS Code) wrapped in a custom React component. Real-time synchronization is handled through Socket.io with operational transformation to resolve concurrent edits without conflicts. The architecture supports up to 8 simultaneous editors with sub-50ms sync latency.\n\nThe integrated terminal runs in a sandboxed Docker container per session, so collaborators can run code without affecting each other's environments. Redis handles session state, cursor positions, and chat messages.",
  PayTrail:
    "PayTrail started as an internal tool for tracking freelance invoices but evolved into a full fintech dashboard. The React Native app provides a unified view of payments across Stripe, Razorpay, and manual bank transfers.\n\nThe dashboard features real-time data visualization using Victory Native for charts and D3.js for custom analytics widgets. Subscription analytics track MRR, churn rate, and LTV with cohort analysis. The PostgreSQL backend handles complex financial aggregations with materialized views.\n\nPush notifications alert users about payment failures, upcoming renewals, and revenue milestones. The app uses end-to-end encryption for sensitive financial data.",
  InkDrop:
    "InkDrop is my take on what a modern blogging platform should be: minimal in design, maximal in developer experience. It's built on Next.js with MDX for content authoring, giving writers the full power of React components inside their markdown.\n\nThe platform includes automatic SEO optimization: dynamic og:image generation, structured data markup, sitemap generation, and canonical URL management. RSS feeds are generated at build time with full content.\n\nCustom theming is handled through CSS custom properties with a visual theme editor. The platform supports syntax highlighting for 50+ languages, LaTeX math rendering, and interactive code sandboxes powered by Sandpack.",
};

const statusConfig: Record<string, string> = {
  live: "Live",
  building: "Building",
  "coming-soon": "Coming Soon",
};

export function Projects() {
  const [active, setActive] = useState<Project | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
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

      {/* Backdrop overlay — exact Aceternity pattern */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-[90]"
          />
        )}
      </AnimatePresence>

      {/* Expanded card — exact Aceternity pattern */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-background rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-card sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  src={active.thumbnail}
                  alt={active.title}
                  width={500}
                  height={300}
                  className="w-full h-72 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-semibold text-foreground text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-muted-foreground text-sm mt-1"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <div className="flex items-center gap-1">
                    {active.githubUrl && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GitHubIcon size={16} />
                      </motion.a>
                    )}
                    {active.liveUrl && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Tech stack icons */}
                <div className="px-4 pb-2">
                  <TooltipProvider delay={100}>
                    <div className="flex flex-wrap gap-1">
                      {active.techStack.map((tech) => {
                        const techInfo = techIcons[tech];
                        if (!techInfo) {
                          return (
                            <span
                              key={tech}
                              className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                            >
                              {tech}
                            </span>
                          );
                        }
                        const TechIcon = techInfo.icon;
                        return (
                          <Tooltip key={tech}>
                            <TooltipTrigger
                              render={
                                <div
                                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:scale-110 active:scale-95 ${techInfo.color}`}
                                />
                              }
                            >
                              <TechIcon size={16} />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs" sideOffset={4}>
                              {tech}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TooltipProvider>
                </div>

                {/* Detailed content — exact Aceternity pattern */}
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-muted-foreground text-xs md:text-sm h-40 md:h-fit max-h-48 pb-10 flex flex-col items-start gap-3 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/25 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50 [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent] [-webkit-overflow-scrolling:touch]"
                  >
                    {(projectDetails[active.title] || active.description)
                      .split("\n\n")
                      .map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Grid — exact Aceternity pattern */}
      <ul className="w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {projects.map((project, index) => (
          <motion.div
            layoutId={`card-${project.title}-${id}`}
            key={project.title}
            onClick={() => setActive(project)}
            className="p-4 flex flex-col hover:bg-muted/50 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${project.title}-${id}`}>
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={400}
                  height={225}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex flex-col gap-1">
                <motion.h3
                  layoutId={`title-${project.title}-${id}`}
                  className="font-semibold text-foreground text-base"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${project.description}-${id}`}
                  className="text-muted-foreground text-sm line-clamp-1"
                >
                  {project.description}
                </motion.p>
                <div className="mt-1">
                  {index === 0 ? (
                    <SparklesText
                      className="text-[13px] font-medium"
                      sparklesCount={5}
                      palette={["#10b981", "#3b82f6", "#f59e0b", "#a855f7", "#ec4899", "#34d399"]}
                    >
                      New and Live
                    </SparklesText>
                  ) : (
                    <span className="text-[13px] font-medium text-muted-foreground">
                      {statusConfig[project.status]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </section>
  );
}

export const CloseIcon = () => {
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
};
