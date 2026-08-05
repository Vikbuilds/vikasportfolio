export interface PhotoItem {
  id: string;
  title: string;
  src: string;
  location?: string;
  date?: string;
  story?: string;
}

export const photos: PhotoItem[] = [
  {
    id: "golden-hour-eye",
    title: "Golden Light Reflection",
    src: "/photos/golden-hour-eye.jpg",
    date: "Feb 2026",
    story: "Light caught the warm amber tones right as the sun began dipping below the horizon. A quiet moment where time seemed to pause entirely.",
  },
  {
    id: "lighthouse-dog",
    title: "Siesta Under the Beacon",
    location: "Puducherry Beach, India",
    date: "Jan 2026",
    src: "/photos/lighthouse-dog.jpg",
    story: "Found this stray catching a midday nap in the shadow of the old lighthouse. The sea breeze was warm, and he didn't care about a single thing in the world.",
  },
  {
    id: "street-mechanic",
    title: "Crafting on the Sidewalk",
    location: "Puducherry, India",
    date: "Jan 2026",
    src: "/photos/street-mechanic.jpg",
    story: "Watching him work with total focus on the sidewalk was inspiring. Decades of muscle memory turned routine repair work into pure art.",
  },
  {
    id: "beach-found-object",
    title: "Traces on Sand",
    location: "Puducherry Beach, India",
    date: "Jan 2026",
    src: "/photos/beach-found-object.jpg",
    story: "Washed ashore at dawn—nature's own sculpture shaped by salt water and tide. A gentle reminder that beauty lives in quiet details.",
  },
  {
    id: "harbor-boats",
    title: "Colors of the Coastal Fleet",
    location: "Puducherry Harbor, India",
    date: "Jan 2026",
    src: "/photos/harbor-boats.jpg",
    story: "The harbor was alive with vibrant blues and weathered wood. Fishermen calling out, seagulls overhead, and the smell of fresh salt air.",
  },
  {
    id: "pondicherry-street",
    title: "Quiet Afternoon on Rue Romain Rolland",
    location: "Puducherry, India",
    date: "Jan 2026",
    src: "/photos/pondicherry-street.jpg",
    story: "Sunlight filtered through yellow French colonial walls. The street was still, save for the faint sound of distant waves.",
  },
  {
    id: "beach-dog",
    title: "Watcher of the Ocean",
    location: "Promenade Beach, Puducherry",
    date: "Jan 2026",
    src: "/photos/beach-dog.jpg",
    story: "He sat there staring at the horizon for nearly an hour, watching waves crash without moving a muscle. A soul of pure calm.",
  },
  {
    id: "street-tricycle",
    title: "Rhythm of the Morning Commute",
    location: "Puducherry, India",
    date: "Jan 2026",
    src: "/photos/street-tricycle.jpg",
    story: "Morning routines in Puducherry move to their own slow rhythm. A solitary ride through narrow lanes before the city fully wakes up.",
  },
  {
    id: "vendor-clock",
    title: "Time & Everyday Objects",
    location: "Puducherry, India",
    date: "Jan 2026",
    src: "/photos/vendor-clock.jpg",
    story: "Tucked away in a local market corner, an old clock ticking amidst everyday clutter—a small anchor of time in a bustling world.",
  },
];
