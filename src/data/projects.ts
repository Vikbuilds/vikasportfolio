export type ProjectStatus = "live" | "building" | "coming-soon";

export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: ProjectStatus;
}

export const projects: Project[] = [
  {
    title: "DevSync",
    description:
      "A real-time collaborative code editor built for remote teams. Supports multi-cursor editing, live preview, and integrated terminal.",
    thumbnail: "/projects/devsync.png",
    techStack: ["Next.js", "Socket.io", "Monaco Editor", "Redis"],
    githubUrl: "https://github.com/theadroitdev",
    liveUrl: "#",
    status: "live",
  },
  {
    title: "PayTrail",
    description:
      "A fintech dashboard for tracking payments, invoices, and subscription analytics with real-time data visualization.",
    thumbnail: "/projects/paytrail.png",
    techStack: ["React Native", "Node.js", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/theadroitdev",
    status: "building",
  },
  {
    title: "InkDrop",
    description:
      "A minimal markdown blogging platform with built-in SEO optimization, RSS feed generation, and custom theming support.",
    thumbnail: "/projects/inkdrop.png",
    techStack: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/theadroitdev",
    status: "coming-soon",
  },
];
