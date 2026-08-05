export interface FavoriteItem {
  id: string;
  title: string;
  author?: string;
  description: string;
  domain: string;
  url: string;
  category: "Books" | "Movies" | "Tools" | "Design" | "Inspiration" | "People" | "Fonts" | "Products";
  icon?: string;
  ogImage?: string;
  coverImage?: string;
  isMostFav?: boolean;
}

export const favorites: FavoriteItem[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An actionable framework for building good habits and continuous 1% improvements.",
    domain: "jamesclear.com",
    url: "https://jamesclear.com/atomic-habits",
    category: "Books",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    description: "Notes on startups and how to build breakthrough technology for the future.",
    domain: "paypal.com",
    url: "https://www.paypal.com/",
    category: "Books",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg",
  },
  {
    id: "robin-williams",
    title: "Robin Williams",
    description: "O Captain my Captain",
    domain: "wikipedia.org",
    url: "https://en.wikipedia.org/wiki/Robin_Williams",
    category: "People",
    icon: "/favorites/robin-williams-icon.png",
    coverImage: "/favorites/robin-williams-cover.jpg",
    ogImage: "/favorites/robin-williams-cover.jpg",
    isMostFav: true,
  },
  {
    id: "nimsdai-purja",
    title: "Nimsdai Purja",
    description: "Giving up is not in the blood, sir. It's not in the blood.",
    domain: "nimsdai.com",
    url: "https://nimsdai.com",
    category: "People",
    icon: "/favorites/nimsdai-cover.jpg",
    coverImage: "/favorites/nimsdai-cover.jpg",
    ogImage: "/favorites/nimsdai-cover.jpg",
    isMostFav: true,
  },
  {
    id: "vercel",
    title: "Vercel",
    description: "The platform for frontend developers & serverless deployments",
    domain: "vercel.com",
    url: "https://vercel.com",
    category: "Tools",
    icon: "https://www.google.com/s2/favicons?domain=vercel.com&sz=64",
    ogImage: "https://lishhsx6kmthaacj.public.blob.vercel-storage.com/og-home-not-x.png",
  },
  {
    id: "claude",
    title: "Claude",
    description: "My go to tool for almost everything...",
    domain: "claude.ai",
    url: "https://claude.ai",
    category: "Tools",
    icon: "https://www.google.com/s2/favicons?domain=claude.ai&sz=64",
    ogImage: "https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/68c469d23594abeb9ab6ee48_70ed020ecf8fa028b9bc95fa819720b6_og_claude-generic.jpg",
  },
  {
    id: "antigravity",
    title: "Antigravity",
    description: "I could code anything with Antigravity...",
    domain: "antigravity.google",
    url: "https://antigravity.google/",
    category: "Tools",
    icon: "/favorites/antigravity.png",
    ogImage: "https://antigravity.google/assets/image/sitecards/sitecard-default.png",
  },
  {
    id: "dead-poets-society",
    title: "Dead Poets Society",
    author: "Peter Weir",
    description: "Carpe diem. Seize the day, boys.",
    domain: "imdb.com",
    url: "https://www.imdb.com/title/tt0097165/",
    category: "Movies",
    icon: "/favorites/movies/dead-poets-society-icon.jpg",
    coverImage: "/favorites/movies/dead-poets-society-cover.png",
    ogImage: "/favorites/movies/dead-poets-society-cover.png",
  },
  {
    id: "into-the-wild",
    title: "Into the Wild",
    author: "Sean Penn",
    description: "Happiness is only real when shared.",
    domain: "imdb.com",
    url: "https://www.imdb.com/title/tt0758758/",
    category: "Movies",
    icon: "/favorites/movies/into-the-wild-icon.jpg",
    coverImage: "/favorites/movies/into-the-wild.png",
    ogImage: "/favorites/movies/into-the-wild.png",
  },
  {
    id: "14-peaks",
    title: "14 Peaks: Nothing Is Impossible",
    author: "Torquil Jones",
    description: "Fearless Nimsdai Purja embarks on a quest to summit all 14 of the world's 8,000-meter peaks in seven months.",
    domain: "imdb.com",
    url: "https://www.imdb.com/title/tt14013400/",
    category: "Movies",
    icon: "/favorites/movies/nimsdai-icon.png",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/e/ed/14_Peaks-_Nothing_Is_Impossible.jpg",
    ogImage: "https://upload.wikimedia.org/wikipedia/en/e/ed/14_Peaks-_Nothing_Is_Impossible.jpg",
  },
];

