export interface Blog {
  title: string;
  description: string;
  date: string;
  url: string;
  readTime: string;
}

export const blogs: Blog[] = [
  {
    title: "Building Scalable APIs with Node.js and Redis",
    description:
      "A deep dive into designing high-performance REST APIs with caching strategies, rate limiting, and queue-based architecture.",
    date: "2025-06-15",
    url: "https://hashnode.com/@theadroitdev",
    readTime: "8 min read",
  },
  {
    title: "Why I Switched from REST to tRPC in Production",
    description:
      "Lessons learned from migrating a full-stack application to end-to-end type safety with tRPC and the trade-offs involved.",
    date: "2025-05-02",
    url: "https://hashnode.com/@theadroitdev",
    readTime: "6 min read",
  },
];
