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
    icon: "/favorites/robin-williams-icon.jpg",
    coverImage: "/favorites/robin-williams-cover.jpg",
    ogImage: "/favorites/robin-williams-cover.jpg",
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
    ogImage: "https://image.thum.io/get/width/600/crop/400/https://vercel.com",
  },
  {
    id: "claude",
    title: "Claude",
    description: "My go to tool for almost everything...",
    domain: "claude.ai",
    url: "https://claude.ai",
    category: "Tools",
    icon: "https://www.google.com/s2/favicons?domain=claude.ai&sz=64",
    ogImage: "https://image.thum.io/get/width/600/crop/400/https://claude.ai",
  },
  {
    id: "antigravity",
    title: "Antigravity",
    description: "I could code anything with Antigravity...",
    domain: "deepmind.google",
    url: "https://deepmind.google",
    category: "Tools",
    icon: "https://www.google.com/s2/favicons?domain=deepmind.google&sz=64",
    ogImage: "https://image.thum.io/get/width/600/crop/400/https://deepmind.google",
  },
  {
    id: "dead-poets-society",
    title: "Dead Poets Society",
    author: "Peter Weir",
    description: "Carpe diem. Seize the day, boys. Make your lives extraordinary.",
    domain: "imdb.com",
    url: "https://www.imdb.com/title/tt0097165/",
    category: "Movies",
    icon: "https://www.google.com/s2/favicons?domain=imdb.com&sz=64",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780140139969-L.jpg",
    ogImage: "https://covers.openlibrary.org/b/isbn/9780140139969-L.jpg",
  },
  {
    id: "into-the-wild",
    title: "Into the Wild",
    author: "Sean Penn",
    description: "Happiness is only real when shared. Christopher McCandless's journey into the Alaskan wilderness.",
    domain: "imdb.com",
    url: "https://www.imdb.com/title/tt0758758/",
    category: "Movies",
    icon: "https://www.google.com/s2/favicons?domain=imdb.com&sz=64",
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
    icon: "https://www.google.com/s2/favicons?domain=imdb.com&sz=64",
    coverImage: "https://upload.wikimedia.org/wikipedia/en/e/ed/14_Peaks-_Nothing_Is_Impossible.jpg",
    ogImage: "https://upload.wikimedia.org/wikipedia/en/e/ed/14_Peaks-_Nothing_Is_Impossible.jpg",
  },
];

