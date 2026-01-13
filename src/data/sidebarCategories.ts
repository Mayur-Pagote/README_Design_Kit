import type { LucideIcon } from "lucide-react";
import { Atom, ChartColumn, Code, FolderGit2, Github, Link, Minus, PartyPopper, Quote, RefreshCwOff, Smile, Sparkles, SquareCode, TrendingUp, Trophy, UserPlus } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}

export const sidebarCategories = [
  { id: "graphs", name: "Graphs", icon: ChartColumn },
  { id: "stats", name: "Stats Cards", icon: TrendingUp },
  { id: "counter",name: "Profile Views Counter",icon: UserPlus },
  { id: "animation", name: "Animations", icon: Sparkles },
  { id: "techStack", name: "Animated Tech Stack", icon: Atom },
  { id: "emojis", name: "Emojis", icon: Smile },
  { id: "quotes", name: "Quotes & Jokes", icon: Quote },
  { id: "languages", name: "Languages", icon: Code },
  { id: "repos", name: "Repositories", icon: FolderGit2 },
  { id: "dividers", name: "Lines & Waves", icon: Minus },
  { id: "gitanimals", name: "GitAnimals", icon: Github },
  {id: "decorations", name: "Decorations", icon: PartyPopper },
  { id: "socials", name: "Socials", icon: Link },
  { id: "coding", name: "Coding Platform Stats", icon: SquareCode },
  { id: "achievements", name: "Achievements", icon: Trophy },
  { id: "discontinued", name: "Discontinued", icon: RefreshCwOff },
];
