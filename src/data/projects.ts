export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  icon?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
  status: "live" | "building" | "coming-soon";
}

export const projects: Project[] = [
  {
    title: "craked.dev",
    description: "Calculate your Cracked Score from public GitHub shipping velocity & builder impact",
    thumbnail: "/projects/craked.png",
    icon: "/projects/craked.png",
    liveUrl: "https://craked.dev",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GitHub API",
    ],
    status: "live",
  },
  {
    title: "poloro.xyz",
    description: "Polaroid-style instant camera & vintage film photo creator",
    thumbnail: "/projects/poloro.png",
    icon: "/projects/poloro.png",
    liveUrl: "https://poloro.xyz",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Canvas API",
    ],
    status: "live",
  },
  {
    title: "plibo.xyz",
    description: "Digital library platform for creating & browsing actionable playbooks for builders & founders",
    thumbnail: "/projects/plibo_favicon.png",
    icon: "/projects/plibo_favicon.png",
    liveUrl: "https://plibo.xyz",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    status: "live",
  },
];
