export interface PhotoItem {
  id: string;
  title: string;
  src: string;
  location?: string;
  date?: string;
}

export const photos: PhotoItem[] = [
  {
    id: "golden-hour-eye",
    title: "Golden Light Reflection",
    src: "/photos/golden-hour-eye.jpg",
    date: "Feb 2026",
  },
  {
    id: "lighthouse-dog",
    title: "Siesta Under the Beacon",
    location: "Puducherry Beach, India",
    date: "Jan 2026",
    src: "/photos/lighthouse-dog.jpg",
  },
  {
    id: "street-mechanic",
    title: "Crafting on the Sidewalk",
    location: "Puducherry, India",
    date: "Jan 2026",
    src: "/photos/street-mechanic.jpg",
  },
  {
    id: "beach-found-object",
    title: "Traces on Sand",
    location: "Puducherry Beach, India",
    date: "Jan 2026",
    src: "/photos/beach-found-object.jpg",
  },
  {
    id: "harbor-boats",
    title: "Colors of the Coastal Fleet",
    location: "Puducherry Harbor, India",
    date: "Jan 2026",
    src: "/photos/harbor-boats.jpg",
  },
  {
    id: "pondicherry-street",
    title: "Quiet Afternoon on Rue Romain Rolland",
    location: "Puducherry, India",
    date: "Jan 2026",
    src: "/photos/pondicherry-street.jpg",
  },
  {
    id: "beach-dog",
    title: "Watcher of the Ocean",
    location: "Promenade Beach, Puducherry",
    date: "Jan 2026",
    src: "/photos/beach-dog.jpg",
  },
  {
    id: "street-tricycle",
    title: "Rhythm of the Morning Commute",
    location: "Puducherry, India",
    date: "Jan 2026",
    src: "/photos/street-tricycle.jpg",
  },
  {
    id: "vendor-clock",
    title: "Time & Everyday Objects",
    location: "Puducherry, India",
    date: "Jan 2026",
    src: "/photos/vendor-clock.jpg",
  },
];
