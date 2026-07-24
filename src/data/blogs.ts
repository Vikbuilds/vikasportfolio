export interface Blog {
  title: string;
  slug: string;
  description: string;
  subtitle: string;
  date: string;
  url: string;
  readTime: string;
  thumbnail: string;
  content: string;
}

export const blogs: Blog[] = [
  {
    title: "Building Scalable APIs with Node.js and Redis",
    slug: "scalable-apis",
    subtitle:
      "High-performance caching, rate limiting, and queue architecture",
    description:
      "A deep dive into designing high-performance REST APIs with caching strategies, rate limiting, and queue-based architecture.",
    date: "2025-06-15",
    url: "https://hashnode.com/@theadroitdev",
    readTime: "8 min read",
    thumbnail: "/blogs/scalable-apis.jpg",
    content: `When building APIs that need to serve thousands of requests per second, caching isn't optional — it's foundational. Redis, with its in-memory data store, becomes the backbone of any high-performance API architecture.

## The Caching Layer

The first thing I implemented was a multi-tier caching strategy. Instead of hitting the database for every request, responses are cached at three levels:

1. **In-memory cache** (Node.js process) — for hot data with sub-millisecond access
2. **Redis cache** — for shared state across multiple server instances
3. **Database** — the source of truth, accessed only on cache misses

This layered approach reduced our average response time from 240ms to 12ms — a 20x improvement. The key insight was understanding which data changes frequently vs. which data is essentially static. User profiles? Cache for 5 minutes. Product catalog? Cache for an hour. Site configuration? Cache until explicitly invalidated.

## Rate Limiting with Sliding Windows

Traditional fixed-window rate limiting has a well-known edge case: a burst of requests at the window boundary can allow 2x the intended rate. I implemented a sliding window algorithm using Redis sorted sets.

Each request is stored as a member with the current timestamp as the score. To check the rate, we count members within the sliding window and remove expired entries — all in a single Redis pipeline. The beauty of this approach is atomicity: Redis handles the entire check-and-update cycle without race conditions, even under heavy concurrent load.

We configured different rate limits per tier: free users get 100 requests/minute, pro users get 1000, and enterprise gets 10,000. The sliding window ensures fair distribution regardless of when in the window requests arrive.

## Queue-Based Architecture

For operations that don't need immediate responses (sending emails, processing webhooks, generating reports), I moved them to a queue-based architecture using BullMQ backed by Redis.

This decoupling transformed our API from a monolithic request-response system into a resilient, event-driven architecture. Failed jobs are automatically retried with exponential backoff, and the API remains responsive even during peak load.

The queue system also gave us observability we didn't have before. We can track job completion rates, average processing times, and failure patterns — all from a Redis-backed dashboard. When a third-party email service goes down, our jobs pile up in the queue instead of timing out and returning 500 errors to users.

## Connection Pooling and Pipeline Optimization

One often-overlooked optimization is Redis connection pooling. Instead of creating a new connection per request, we maintain a pool of persistent connections. Combined with Redis pipelining (batching multiple commands into a single round trip), we reduced our Redis overhead by 60%.

The pipeline approach is particularly powerful for multi-step operations like our rate limiter. Instead of three separate round trips (read, check, write), we pipeline all commands and get results in a single network exchange. At scale, these microseconds compound into meaningful latency improvements.

## Key Takeaways

- Cache aggressively, invalidate precisely
- Rate limiting protects both your users and your infrastructure
- Not everything needs a synchronous response — embrace queues
- Redis is not just a cache; it's a Swiss Army knife for distributed systems
- Connection pooling and pipelining are easy wins with outsized impact
- Monitor your cache hit rates — they tell you if your strategy is working`,
  },
  {
    title: "Why I Switched from REST to tRPC in Production",
    slug: "rest-to-trpc",
    subtitle:
      "End-to-end type safety and the trade-offs that come with it",
    description:
      "Lessons learned from migrating a full-stack application to end-to-end type safety with tRPC and the trade-offs involved.",
    date: "2025-05-02",
    url: "https://hashnode.com/@theadroitdev",
    readTime: "6 min read",
    thumbnail: "/blogs/rest-to-trpc.jpg",
    content: `After maintaining a REST API with 47 endpoints and a growing TypeScript frontend, I was spending more time keeping types synchronized than building features. That's when I decided to migrate to tRPC.

## The Problem with REST + TypeScript

Our REST API had manually maintained type definitions on both the client and server. Every time we added a field to a response, we had to update:

1. The database schema
2. The server-side response type
3. The API documentation
4. The client-side type definition

This four-step dance was error-prone. Types would drift apart, leading to runtime errors that TypeScript was supposed to prevent. We'd ship a feature, only to discover in production that the frontend expected a string where the backend now returned an object. TypeScript gave us a false sense of security.

The OpenAPI codegen approach helped, but introduced its own complexity. Generated types were often too broad, and the codegen step became another thing to remember (and forget) in the build pipeline.

## Enter tRPC

tRPC eliminates the API boundary entirely. Your server-side router definition IS the client-side type. Change a return type on the server, and your IDE immediately shows you every client-side usage that needs updating.

The migration was surgical — we replaced endpoints one at a time, running tRPC alongside our existing REST API using Next.js API routes. Each migration followed the same pattern: create a tRPC procedure, verify it matches the REST endpoint behavior, update the client to use the tRPC hook, and finally remove the REST endpoint. We completed the migration of 47 endpoints in about three weeks.

## The DX Improvement

The developer experience improvement was immediate and dramatic. Auto-complete now works across the full stack. Hover over a \`useQuery\` call and you see the exact return type, inferred all the way from the database query. Refactoring became fearless — rename a field on the server, and TypeScript catches every client reference instantly.

Error handling also improved significantly. With REST, error responses were loosely typed \`{ message: string }\` objects. With tRPC, we defined typed error codes and the client knows exactly which errors each procedure can throw. No more guessing if an endpoint returns 404 or 400 for missing resources.

## The Trade-offs

### What We Gained
- **Zero type drift** — impossible for client and server types to disagree
- **Autocomplete everywhere** — the client knows every available procedure and its exact input/output shape
- **Faster iteration** — removing the type synchronization step saved roughly 30% of feature development time
- **Smaller bundle** — no need for axios or fetch wrappers; tRPC's client is lightweight
- **Batching for free** — tRPC automatically batches multiple concurrent requests into a single HTTP call

### What We Lost
- **HTTP caching** — tRPC uses POST for mutations (expected) but also for batched queries, complicating CDN caching
- **API discoverability** — no more Swagger/OpenAPI docs for external consumers
- **Ecosystem lock-in** — tRPC is TypeScript-only; if you ever need a mobile client in Swift or Kotlin, you'll need a separate API
- **Debugging** — REST endpoints are easy to test with curl; tRPC procedures require the client or a specialized tool
- **Team onboarding** — developers familiar with REST need to learn a new mental model

## Performance Considerations

We initially worried about the performance overhead of tRPC's serialization layer. In practice, the overhead is negligible — superjson adds about 0.5ms per request for typical payloads. The batching feature actually improved performance: pages that previously made 6 parallel API calls now make a single batched request.

The WebSocket transport option for subscriptions was another pleasant surprise. Real-time features that previously required a separate Socket.io setup now work through the same tRPC router, with full type safety on the subscription payloads.

## Would I Do It Again?

Absolutely — for internal, TypeScript-only applications. For public APIs or multi-language consumers, REST with generated types (like OpenAPI + code generation) remains the better choice.

The key insight isn't that tRPC is better than REST. It's that the right abstraction depends on your consumer. Internal app with a TypeScript frontend? tRPC. Public API with diverse clients? REST with OpenAPI. The mistake is treating this as a religious debate rather than an engineering decision with clear trade-offs.`,
  },
];
