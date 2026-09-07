import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vikasacharya.me";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Anthropic-ai",
        ],
        allow: "/",
        disallow: ["/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

