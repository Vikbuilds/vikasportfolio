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
    title: "Understanding Network Devices",
    slug: "understanding-network-devices",
    subtitle: "Comprehensive Guide to Different Types of Network Devices",
    description: "Connecting to the outside of the world through the Internet is not that simple as it looks like. It involves an underlying process, that every device has to go through.",
    date: "2026-08-01",
    url: "https://hashnode.com/@theadroitdev",
    readTime: "4 min read",
    thumbnail: "/blogs/networking-devices/thumbnail.png",
    content: `Connecting to the outside of the world through the Internet is not that simple as it looks like.

It involves an underlying process, that every device has to go through.

## What is Modem and how it connects your network to the Internet

The Modem short for **(Modulator-Demodulator)** is your network’s gateway to the outside world.

### Modem → The Translator

It takes the responsibility of bridging your private network (eg: home/office) to the ISP(Internet Service Provider)

Your ISP sends signals over cable or (fiber, DSL).

The Modem translates these signals for you into digital data which the network can understand.

![Modem Translator](/blogs/networking-devices/diagram1.png)

For Example:

*   Cloud servers also connect via **enterprise-grade modems or ISP gateways**
*   Network outages often start **at the modem or upstream ISP**

## What is Router and how it redirects traffic

A Router connects different networks together, especially your local network which is LAN to the public network (WAN).

### Router → The Traffic Police

Router decides where the traffic should go.

For Example:

It looks at the IP address of every packet and decides whether it stays inside your home or needs to go out of the internet.

It assigns private IPs (using DHCP) and translates private IPs to public IPs(NAT)

### Modem Vs Router

| Modem | Router |
| --- | --- |
| Connects your private network to your ISP | Redirects the network Traffic |
| One Public IPs | Multiple IPs |
| Talks to internet | Talks to devices |

* * *

## Switch Vs Hub. How local networks actually work?

![Difference Between a Switch and a Hub](/blogs/networking-devices/diagram2.png)

### Managing the local crowd

These devices connect multiple gadgets (laptops, printers, TVs) within the same local network

*   **Hub (The Megaphone):** A "dumb" device. When it receives data, it broadcasts it to **every** connected port. This is inefficient and causes "collisions".
*   **Switch (The Intelligent Switchboard):** A "smart" device. It learns the unique **MAC address** of every connected device and sends data **only** to the specific recipient.
*   **Real-World Use:** Hubs are largely obsolete; switches are the standard for modern wired networks.

## What is Firewall and why security lives here?

A **Firewall** is a protective barrier that monitors and filters all incoming and outgoing traffic.

![Types of Network Firewall](/blogs/networking-devices/diagram3.png)

### Firewall: The Security Gate

It stands at the entrance of your network with a "guest list" (security rules). 

If a data packet isn't on the list or looks suspicious, the guard blocks it.

It prevents hackers, malicious and unauthorized traffic from entering your private network

### Where it sits

*   Between router and internal network
*   Around servers in production

## What is Load Balancers? and why scalable systems need it?

If one server is overwhelmed with thousands of requests, 

the load balancer directs new "cars" (traffic) to other available servers.

![Load Balancer](/blogs/networking-devices/diagram4.png)

### Load Balancer: The Toll Booth Director

Distributing incoming requests across a pool of servers to ensure high availability and prevent any single point of failure

## Real-World Setup: How They Work Together

1.  **Internet** flows into the **Modem**.
2.  The **Modem** hands data to the **Firewall** (to filter out attacks).
3.  The **Firewall** sends safe data to the **Router**.
4.  The **Router** passes data to a **Load Balancer** (in a data center) or a **Switch** (in an office).
5.  The **Switch** delivers the data to the final **Server** or **PC**.



**Backend Connection:** For software engineers, these aren't just boxes.

A **Firewall** is where you configure "Security Groups" in AWS; a **Load Balancer** 

is your Nginx or AWS ELB; and a **Router** is what handles your VPC peering and subnet routing

![Backend Connection](/blogs/networking-devices/diagram5.png)

Thank you for reading 💖

`,
  },
  {
    title: "REST API Design Made Simple with Express.js",
    slug: "rest-api",
    subtitle: "When a mobile app loads your profile, when a website fetches a list of products, when a dashboard displays live data, something is making requests to... ",
    description: "When a mobile app loads your profile, when a website fetches a list of products... ",
    date: "2026-07-25",
    url: "https://timblarc.hashnode.dev/rest-api",
    readTime: "5 min read",
    thumbnail: "/blogs/rest-api.png",
    content: `When a mobile app loads your profile, when a website fetches a list of products, when a dashboard displays live data, something is making requests to a server and receiving structured responses back.

That communication happens through an API, and the most common way to design one is REST.

REST is not a protocol or a library.

It is a set of conventions for how an API should be structured.

Follow those conventions and you end up with an API that other developers can understand, predict, and work with confidently, even if they have never seen your code before.

* * *

## What REST Means

REST stands for Representational State Transfer.

Underneath the formal name is a practical idea: your API should be organized around resources, and clients interact with those resources using standard HTTP methods.

A resource is any meaningful piece of data your application manages.

Users, products, orders, articles, comments: these are all resources.

In a REST API, 

each resource has its own URL, and you interact with it using the same HTTP methods the web already understands.

The communication works like this.

A client, a browser, a mobile app, another server, sends an HTTP request to a URL with a method.

The server processes the request, does whatever needs doing, and sends back a response with a status code and usually some data.

The client reads the response and knows whether things went well or not.

Both sides speak the same language.

The client does not need to know how the server is built.

The server does not need to know what kind of client is making the request.

They agree on the structure of the conversation, and that agreement is what REST defines.

* * *

## Resources and URLs

In REST, URLs represent resources, not actions.

This is one of the most important conventions and the one most often violated in practice.

A URL should describe what you are working with, not what you are doing to it:

\`\`\`plaintext
Good: /users
Good: /users/42
Good: /users/42/posts

Not ideal: /getUsers
Not ideal: /createUser
Not ideal: /deleteUserById
\`\`\`

The action is expressed through the HTTP method, not the URL. \`/users\` with a GET means fetch users. \`/users\` with a POST means create a user.

Same URL, different method, different meaning.

This keeps your URLs clean and your API predictable.

Resources in URLs are almost always plural nouns. \`/users\` not \`/user\`. \`/products\` not \`/product\`.

Individual items within a collection are addressed by their identifier: \`/users/42\` refers to the user with ID 42.

* * *

## HTTP Methods

HTTP provides several methods, and REST assigns a clear meaning to each one.

Four of them cover the vast majority of what any API needs to do.

**GET** retrieves data.

It should never modify anything.

When a client sends a GET request, they are asking to read a resource.

The server returns it.

Nothing on the server changes.

**POST** creates something new.

The client sends data in the request body, and the server uses it to create a new resource.

The response typically includes the created resource or at least its identifier.

**PUT** updates an existing resource.

The client sends the full updated version of the resource, and the server replaces what it has stored.

If any fields are missing from the request, they are typically cleared or reset.

**DELETE** removes a resource.

The client identifies what to remove through the URL, and the server deletes it.

There is usually no request body.

These four methods map naturally to the four basic operations data needs to support: create, read, update, and delete.

* * *

## Status Codes

The status code in a response tells the client immediately whether the request succeeded, failed, or something else happened.

They are grouped by the first digit.

Codes in the 200 range mean success. \`200 OK\` is the standard success response for GET and PUT requests.

\`201 Created\` signals that a POST request succeeded and a new resource was created.

\`204 No Content\` is used for successful DELETE requests where there is nothing to return.

Codes in the 400 range mean the client made an error. 

\`400 Bad Request\` means the request was malformed or missing required data.

\`401 Unauthorized\` means authentication is required. 

\`403 Forbidden\` means the client is authenticated but not allowed to do what they are asking. 

\`404 Not Found\` means the resource does not exist.

Codes in the 500 range mean something went wrong on the server. 

\`500 Internal Server Error\` is the generic catch-all for unexpected failures.

Returning accurate status codes is part of what makes an API genuinely useful.

A client that receives a \`404\`

knows the resource does not exist.

A client that receives a \`401\` knows it needs to authenticate.

These are meaningful signals that the client can act on.

* * *

## Designing Routes for a Users Resource

With these conventions in place, designing the routes for a users resource follows a consistent pattern.

The same pattern applies to any resource in your API.

| Method | URL | Action | | --- | --- | --- | | GET | /users | Return all users | | POST | /users | Create a new user | | GET | /users/:id | Return one user | | PUT | /users/:id | Update one user | | DELETE | /users/:id | Delete one user |

Two URLs, five routes.

The collection URL handles listing and creating.

The individual item URL handles reading, updating, and deleting a specific resource.

This structure is predictable enough that a developer who has never seen your API can make an educated guess about how it works.

* * *

## Building the Routes in Express

Setting up these routes in Express is straightforward.

Each route receives a handler that reads from the request, interacts with whatever data store you are using, and sends back an appropriate response.

\`\`\`javascript
const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Shivam", email: "shivam@example.com" },
  { id: 2, name: "Loid", email: "loid@example.com" }
];

let nextId = 3;
\`\`\`

A simple in-memory array stands in for a real database here.

The logic that follows would work identically with a database call in place of the array operations.

**GET /users: return all users**

\`\`\`javascript
app.get("/users", (req, res) => {
  res.status(200).json(users);
});
\`\`\`

Returns the entire collection.

Status \`200\` signals success.

**POST /users: create a new user**

\`\`\`javascript
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
});
\`\`\`

Validates that required fields are present.

Returns \`400\` with a clear message if they are not.

Creates the user and returns \`201\` with the newly created resource.

**GET /users/:id: return one user**

\`\`\`javascript
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
});
\`\`\`

Parses the ID from the URL, finds the matching user, returns \`404\` if none exists, and returns \`200\` with the user if found.

**PUT /users/:id: update one user**

\`\`\`javascript
app.put("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  users[index] = { id: users[index].id, name, email };

  res.status(200).json(users[index]);
});
\`\`\`

Finds the user by ID, replaces their data with what was sent in the request body, and returns the updated user.

The ID is preserved from the original record rather than taken from the request body.

**DELETE /users/:id: delete one user**

\`\`\`javascript
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);

  res.status(204).send();
});
\`\`\`

Removes the user from the array and returns \`204\` with no body.

There is nothing to return after a deletion, and \`204\` signals that explicitly.

* * *

## Consistent Response Shape

One practice that makes an API significantly easier to work with is keeping response shapes consistent.

When every endpoint returns data in a predictable structure, the client knows what to expect regardless of which route it is calling.

A common pattern wraps data in a consistent envelope:

\`\`\`javascript
res.status(200).json({
  success: true,
  data: user
});

res.status(400).json({
  success: false,
  error: "Name and email are required"
});
\`\`\`

Success responses always have \`success: true\` and a \`data\` field.

Error responses always have \`success: false\` and an \`error\` field.

A client can check \`success\` first and branch accordingly, without writing different parsing logic for every endpoint.

* * *

## Wrapping Up

REST API design comes down to a few consistent conventions applied repeatedly: 

resources have URLs, actions are expressed through

HTTP methods, responses carry meaningful status codes, 

and the structure stays predictable across every endpoint.

A developer seeing your \`/users\` routes for the first time 

already knows what GET, POST, PUT, and DELETE do on those URLs.

They know what a \`201\` response means and what to check when they get a \`404\`.

That shared understanding is what makes REST valuable, and Express makes it straightforward to implement cleanly.

The users example here is deliberately simple.

The same pattern scales directly to any resource: posts, products, orders, comments.

Apply the same URL conventions, the same method semantics, and the same status codes, and the API stays coherent as it grows. 

Thank you for reading 💖`,
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

This four-step dance was error-prone. Types would drift apart, leading to runtime errors that TypeScript was supposed to prevent. We'd ship a feature, only to discover in production that the frontend expected a string where the backend now returned an object.

## Enter tRPC

tRPC eliminates the API boundary entirely. Your server-side router definition IS the client-side type. Change a return type on the server, and your IDE immediately shows you every client-side usage that needs updating.

Here's how a basic tRPC router looks:

\`\`\`typescript
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await db.user.findUnique({
        where: { id: input.id },
      });
      return user;
    }),

  updateProfile: t.procedure
    .input(z.object({
      name: z.string().min(1),
      bio: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      return db.user.update({
        where: { id: ctx.userId },
        data: input,
      });
    }),
});
\`\`\`

And on the client, you get full type inference:

\`\`\`typescript
// The return type is automatically inferred from the server
const { data: user } = trpc.getUser.useQuery({ id: "123" });
// TypeScript knows user.name, user.email, etc.

const mutation = trpc.updateProfile.useMutation();
// TypeScript enforces the exact input shape
mutation.mutate({ name: "Shivam", bio: "Builder" });
\`\`\`

The migration was surgical — we replaced endpoints one at a time, running tRPC alongside our existing REST API. We completed the migration of 47 endpoints in about three weeks.

## The DX Improvement

The developer experience improvement was immediate and dramatic. Auto-complete now works across the full stack. Hover over a \`useQuery\` call and you see the exact return type, inferred all the way from the database query. Refactoring became fearless — rename a field on the server, and TypeScript catches every client reference instantly.

## The Trade-offs

### What We Gained

- **Zero type drift** — impossible for client and server types to disagree
- **Autocomplete everywhere** — the client knows every available procedure and its exact input/output shape
- **Faster iteration** — removing the type synchronization step saved roughly 30% of feature development time
- **Smaller bundle** — no need for axios or fetch wrappers; tRPC's client is lightweight

### What We Lost

- **HTTP caching** — tRPC uses POST for mutations and batched queries, complicating CDN caching
- **API discoverability** — no more Swagger/OpenAPI docs for external consumers
- **Ecosystem lock-in** — tRPC is TypeScript-only; if you need a mobile client in Swift or Kotlin, you'll need a separate API
- **Debugging** — REST endpoints are easy to test with curl; tRPC procedures require the client

## Would I Do It Again?

Absolutely — for internal, TypeScript-only applications. For public APIs or multi-language consumers, REST with generated types (like OpenAPI + code generation) remains the better choice.

The key insight isn't that tRPC is better than REST.

It's that the right abstraction depends on your consumer. Internal app with a TypeScript frontend? tRPC. 

Public API with diverse clients? REST with OpenAPI. The mistake is treating this as a religious debate rather than an engineering decision with clear trade-offs.

Thank you for reading 💖`,
  },
];
