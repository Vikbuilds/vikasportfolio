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
    id: "lighthouse-dog",
    title: "Siesta Under the Beacon",
    location: "Puducherry Beach, India",
    camera: "iPhone 15 Pro",
    lens: "24mm f/1.78",
    settings: "1/1000s · f/1.8 · ISO 50",
    date: "Jan 2026",
    category: "Minimal",
    src: "/photos/lighthouse-dog.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "street-mechanic",
    title: "Crafting on the Sidewalk",
    location: "Puducherry, India",
    camera: "iPhone 15 Pro",
    lens: "24mm f/1.78",
    settings: "1/320s · f/1.8 · ISO 64",
    date: "Jan 2026",
    category: "Street",
    src: "/photos/street-mechanic.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "beach-found-object",
    title: "Traces on Sand",
    location: "Puducherry Beach, India",
    camera: "iPhone 15 Pro",
    lens: "24mm f/1.78",
    settings: "1/500s · f/1.8 · ISO 50",
    date: "Jan 2026",
    category: "Minimal",
    src: "/photos/beach-found-object.jpg",
    aspectRatio: "landscape",
  },
  {
    id: "harbor-boats",
    title: "Colors of the Coastal Fleet",
    location: "Puducherry Harbor, India",
    camera: "iPhone 15 Pro",
    lens: "24mm f/1.78",
    settings: "1/640s · f/1.8 · ISO 50",
    date: "Jan 2026",
    category: "Street",
    src: "/photos/harbor-boats.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "pondicherry-street",
    title: "Quiet Afternoon on Rue Romain Rolland",
    location: "Puducherry, India",
    camera: "iPhone 15 Pro",
    lens: "24mm f/1.78",
    settings: "1/400s · f/1.8 · ISO 50",
    date: "Jan 2026",
    category: "Street",
    src: "/photos/pondicherry-street.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "beach-dog",
    title: "Watcher of the Ocean",
    location: "Promenade Beach, Puducherry",
    camera: "iPhone 15 Pro",
    lens: "77mm f/2.8",
    settings: "1/800s · f/2.8 · ISO 50",
    date: "Jan 2026",
    category: "Minimal",
    src: "/photos/beach-dog.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "street-tricycle",
    title: "Rhythm of the Morning Commute",
    location: "Puducherry, India",
    camera: "iPhone 15 Pro",
    lens: "13mm f/2.2",
    settings: "1/500s · f/2.2 · ISO 64",
    date: "Jan 2026",
    category: "Street",
    src: "/photos/street-tricycle.jpg",
    aspectRatio: "portrait",
  },
  {
    id: "vendor-clock",
    title: "Time & Everyday Objects",
    location: "Puducherry, India",
    camera: "iPhone 15 Pro",
    lens: "24mm f/1.78",
    settings: "1/250s · f/1.8 · ISO 100",
    date: "Jan 2026",
    category: "Minimal",
    src: "/photos/vendor-clock.jpg",
    aspectRatio: "portrait",
  },
];
