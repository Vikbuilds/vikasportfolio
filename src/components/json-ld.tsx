import React from "react";
import { socials } from "@/data/socials";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vikasacharya.me";

export function PersonJsonLd() {
  const sameAsLinks = socials
    .map((s) => s.url)
    .filter((url) => url.startsWith("http://") || url.startsWith("https://"));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      "name": "Vikas Acharya",
      "alternateName": ["Vikbuilds", "VikasAcharyaa", "vikdev"],
      "jobTitle": "Fullstack Software Builder & Developer",
      "description":
        "Software builder and fullstack developer crafting robust applications for web and mobile. Creator of craked.dev, bidfor.lol, poloro.xyz, and plibo.xyz.",
      "url": baseUrl,
      "image": `${baseUrl}/og-image.png`,
      "email": "mailto:vikasacharyaaa@gmail.com",
      "sameAs": sameAsLinks,
      "knowsAbout": [
        "Fullstack Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "Software Architecture",
        "Generative AI",
        "Open Source Software",
        "Product Design"
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "Vikas Acharya — Fullstack Software Builder",
    "description": "Personal corner of the internet, featuring projects, writings, and thoughts on software engineering.",
    "author": {
      "@id": `${baseUrl}/#person`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  date,
  url,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "datePublished": date,
    "dateModified": date,
    "url": fullUrl,
    "author": {
      "@type": "Person",
      "name": "Vikas Acharya",
      "url": baseUrl,
      "sameAs": `${baseUrl}/#person`
    },
    "publisher": {
      "@type": "Person",
      "name": "Vikas Acharya",
      "url": baseUrl
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareAppJsonLd({
  name,
  description,
  url,
  techStack,
}: {
  name: string;
  description: string;
  url?: string;
  techStack?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "url": url || baseUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Vikas Acharya",
      "url": baseUrl
    },
    "keywords": techStack ? techStack.join(", ") : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
