import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function formatCurrency(amount: number, currency = "IDR"): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency }).format(amount);
}

export function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}...` : str;
}

export function getRankColor(rank: string): string {
  const colors: Record<string, string> = {
    OWNER: "text-red-500",
    ADMIN: "text-red-400",
    MODERATOR: "text-green-400",
    HELPER: "text-blue-400",
    YOUTUBER: "text-red-300",
    MVP_PLUS: "text-yellow-400",
    MVP: "text-cyan-400",
    VIP_PLUS: "text-yellow-300",
    VIP: "text-green-300",
    DEFAULT: "text-gray-400",
  };
  return colors[rank] ?? "text-gray-400";
}

export function getRankBadgeStyle(rank: string): string {
  const styles: Record<string, string> = {
    OWNER: "bg-red-500/20 text-red-400 border border-red-500/30",
    ADMIN: "bg-red-400/20 text-red-300 border border-red-400/30",
    MODERATOR: "bg-green-400/20 text-green-300 border border-green-400/30",
    HELPER: "bg-blue-400/20 text-blue-300 border border-blue-400/30",
    YOUTUBER: "bg-red-300/20 text-red-200 border border-red-300/30",
    MVP_PLUS: "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30",
    MVP: "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30",
    VIP_PLUS: "bg-yellow-300/20 text-yellow-200 border border-yellow-300/30",
    VIP: "bg-green-300/20 text-green-200 border border-green-300/30",
    DEFAULT: "bg-gray-400/20 text-gray-300 border border-gray-400/30",
  };
  return styles[rank] ?? "bg-gray-400/20 text-gray-300 border border-gray-400/30";
}
