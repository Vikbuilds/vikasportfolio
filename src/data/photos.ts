export interface PhotoItem {
  id: string;
  title: string;
  location: string;
  camera: string;
  lens: string;
  settings: string;
  date: string;
  category: "Street" | "Architecture" | "Nature" | "Minimal";
  src: string;
  aspectRatio: "portrait" | "landscape" | "square";
}

export const photos: PhotoItem[] = [
  {
    id: "cyberpunk-tokyo",
    title: "Neon Reflections in Shinjuku",
    location: "Tokyo, Japan",
    camera: "Sony A7IV",
    lens: "35mm f/1.4 GM",
    settings: "1/160s · f/1.8 · ISO 400",
    date: "Nov 2025",
    category: "Street",
    src: "/photos/cyberpunk-tokyo.png",
    aspectRatio: "portrait",
  },
  {
    id: "minimal-architecture",
    title: "Geometry of Silence",
    location: "Copenhagen, Denmark",
    camera: "Leica Q3",
    lens: "28mm f/1.7 Summilux",
    settings: "1/500s · f/5.6 · ISO 100",
    date: "Aug 2025",
    category: "Architecture",
    src: "/photos/minimal-architecture.png",
    aspectRatio: "square",
  },
  {
    id: "misty-mountain",
    title: "Whispers of the Ridge",
    location: "Swiss Alps, Switzerland",
    camera: "Fujifilm X-T5",
    lens: "50-140mm f/2.8",
    settings: "1/250s · f/8.0 · ISO 160",
    date: "Oct 2025",
    category: "Nature",
    src: "/photos/misty-mountain.png",
    aspectRatio: "landscape",
  },
  {
    id: "golden-hour-silhouette",
    title: "Solitude at Dusk",
    location: "Kyoto, Japan",
    camera: "Sony A7IV",
    lens: "50mm f/1.2 GM",
    settings: "1/1000s · f/2.0 · ISO 100",
    date: "Dec 2025",
    category: "Minimal",
    src: "/photos/golden-hour-silhouette.png",
    aspectRatio: "portrait",
  },
];
