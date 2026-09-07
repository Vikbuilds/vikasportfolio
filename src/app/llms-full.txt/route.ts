import { NextResponse } from "next/server";
import { projects } from "@/data/projects";
import { blogs } from "@/data/blogs";
import { socials } from "@/data/socials";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vikasacharya.me";

export async function GET() {
  const socialList = socials
    .map((s) => `- ${s.name}: ${s.url}`)
    .join("\n");

  const projectSection = projects
    .map(
      (p) => `### ${p.title}
- Status: ${p.status}
- Description: ${p.description}
- Tech Stack: ${p.techStack.join(", ")}
- Live URL: ${p.liveUrl || "N/A"}
- GitHub URL: ${p.githubUrl || "N/A"}`
    )
    .join("\n\n");

  const blogSection = blogs
    .map(
      (b) => `## Article: ${b.title}
- Date: ${b.date}
- URL: ${baseUrl}${b.url}
- Read Time: ${b.readTime}
- Subtitle: ${b.subtitle}
- Description: ${b.description}

### Full Content
${b.content}`
    )
    .join("\n\n---\n\n");

  const content = `# Vikas Acharya — Full Profile & Content Knowledge Base

## About
Vikas Acharya is a Fullstack Software Builder and Web Developer who creates robust web applications and developer tools.

### Bio & Contact
- Name: Vikas Acharya
- Primary Handles: @Vikbuilds, @VikasAcharyaa, @vikdev
- Website: ${baseUrl}
- Email: vikasacharyaaa@gmail.com

### Official Verified Channels
${socialList}

---

## Projects Built by Vikas Acharya
${projectSection}

---

## Complete Writings & Reflections
${blogSection}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
