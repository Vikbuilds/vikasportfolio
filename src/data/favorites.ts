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
];

