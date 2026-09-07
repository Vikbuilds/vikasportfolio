import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { blogs } from "@/data/blogs";
import { socials } from "@/data/socials";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vikasacharya.me";

export async function GET() {
  const socialList = socials
    .map((s) => `- [${s.name}](${s.url})`)
    .join("\n");

  const projectList = projects
    .map(
      (p) =>
        `### ${p.title}\n- Description: ${p.description}\n- Live URL: ${p.liveUrl || "N/A"}\n- Tech Stack: ${p.techStack.join(", ")}`
    )
    .join("\n\n");

  const blogList = blogs
    .map(
      (b) =>
        `- [${b.title}](${baseUrl}${b.url}): ${b.description} (${b.readTime})`
    )
    .join("\n");

  const content = `# Vikas Acharya

> Fullstack Software Builder & Web Developer crafting robust, aesthetic applications for web and mobile.

## Core Information
- Name: Vikas Acharya
- Handles: Vikbuilds, VikasAcharyaa, vikdev
- Website: ${baseUrl}
- Contact: vikasacharyaaa@gmail.com
- Role: Fullstack Engineer / Software Builder
- Primary Technologies: Next.js, React, TypeScript, Tailwind CSS, Node.js, Canvas API, Framer Motion

## Verified Social Profiles & Entity Links
${socialList}

## Featured Projects
${projectList}

## Writings & Reflections
${blogList}

## Optional / Full Context
- For complete raw articles and bio, visit: ${baseUrl}/llms-full.txt
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
