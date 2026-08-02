export interface Social {
  name: string;
  url: string;
  icon: string; // Lucide icon name or "custom:name" for custom SVGs
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/Vikbuilds",
    icon: "github",
  },
  {
    name: "X",
    url: "https://x.com/VikasAcharyaa",
    icon: "twitter",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vikasacharyaa/",
    icon: "linkedin",
  },
  {
    name: "Product Hunt",
    url: "https://www.producthunt.com/@vikdev",
    icon: "custom:producthunt",
  },
  {
    name: "Peerlist",
    url: "https://peerlist.io/vikasacharya",
    icon: "custom:peerlist",
  },
  {
    name: "Medium",
    url: "https://medium.com/@vikas.devopp",
    icon: "custom:medium",
  },
  {
    name: "Buy Me a Coffee",
    url: "https://buymeacoffee.com/vikasdevopp",
    icon: "custom:buymeacoffee",
  },
  {
    name: "Email",
    url: "mailto:vikasacharya@gmail.com",
    icon: "mail",
  },
];
