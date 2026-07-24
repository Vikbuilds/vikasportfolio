export interface Social {
  name: string;
  url: string;
  icon: string; // Lucide icon name or "custom:name" for custom SVGs
}

export const socials: Social[] = [
  {
    name: "GitHub",
    url: "https://github.com/theadroitdev",
    icon: "github",
  },
  {
    name: "X",
    url: "https://x.com/theadroitdev",
    icon: "twitter",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shivam-verma-079780312/",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/theadroitdev",
    icon: "instagram",
  },
  {
    name: "Discord",
    url: "https://discord.com/users/theadroitdev",
    icon: "custom:discord",
  },
  {
    name: "Medium",
    url: "https://medium.com/@html.shivam8",
    icon: "custom:medium",
  },
  {
    name: "Peerlist",
    url: "https://peerlist.io/theadroitdev",
    icon: "custom:peerlist",
  },
  {
    name: "Hashnode",
    url: "https://hashnode.com/@theadroitdev",
    icon: "custom:hashnode",
  },
  {
    name: "Email",
    url: "mailto:theadroitdev@gmail.com",
    icon: "mail",
  },
];
