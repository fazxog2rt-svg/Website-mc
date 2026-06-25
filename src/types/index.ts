export interface ServerStatus {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version: string;
  ping: number;
  uptime: number;
}

export interface Player {
  uuid: string;
  username: string;
  rank: string;
  balance: number;
  islandName?: string;
  islandLevel: number;
  islandValue: number;
  skillLevel: number;
  playtime: number;
  voteCount: number;
  achievements: number;
  lastSeen?: Date;
  isOnline: boolean;
  skinUrl: string;
  headUrl: string;
}

export interface LeaderboardEntry {
  rank: number;
  player: Player;
  value: number | string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category: string;
  imageUrl?: string;
  publishedAt?: Date;
  viewCount: number;
}

export interface WikiPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
}

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};
