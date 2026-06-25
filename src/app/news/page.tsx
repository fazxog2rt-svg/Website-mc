import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Eye, Tag, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Berita terbaru, changelog, dan event dari SkyForge.",
};

const posts = [
  {
    id: "update-2-0-dungeon",
    title: "Update 2.0 - Dungeon System & New Boss Arrived!",
    excerpt: "Dungeon baru telah tiba! Jelajahi 3 dungeon eksklusif dengan boss Lich King, Dragon Overlord, dan Shadow Titan yang belum pernah ada sebelumnya di server Indonesia.",
    category: "Update",
    date: "2025-06-20",
    views: 2840,
    gradient: "from-red-600/30 to-orange-600/30",
    badgeVariant: "destructive" as const,
    featured: true,
  },
  {
    id: "summer-event-2025",
    title: "Summer Event 2025 - Kumpulkan Hadiah Eksklusif!",
    excerpt: "Event musim panas telah dimulai! Selesaikan quest spesial, kumpulkan Summer Tokens, dan tukarkan dengan cosmetic eksklusif yang tidak dijual di store.",
    category: "Event",
    date: "2025-06-15",
    views: 1920,
    gradient: "from-yellow-600/30 to-orange-500/30",
    badgeVariant: "warning" as const,
    featured: false,
  },
  {
    id: "patch-1-9-5",
    title: "Patch 1.9.5 - Economy Rebalance & Bug Fixes",
    excerpt: "Pembaruan besar untuk sistem ekonomi! Harga Bazaar, Auction House tax, dan coin drop rate dari mob telah disesuaikan untuk keseimbangan yang lebih baik.",
    category: "Changelog",
    date: "2025-06-10",
    views: 1450,
    gradient: "from-sky-600/30 to-blue-600/30",
    badgeVariant: "default" as const,
    featured: false,
  },
  {
    id: "maintenance-june-8",
    title: "Maintenance Terjadwal - 8 Juni 2025",
    excerpt: "Server akan mengalami maintenance terjadwal pada tanggal 8 Juni 2025 pukul 02:00 - 06:00 WIB untuk update sistem dan optimisasi database.",
    category: "Maintenance",
    date: "2025-06-07",
    views: 890,
    gradient: "from-gray-600/30 to-slate-600/30",
    badgeVariant: "secondary" as const,
    featured: false,
  },
  {
    id: "giveaway-anniversary",
    title: "Anniversary Giveaway - 1 Tahun SkyForge!",
    excerpt: "Rayakan 1 tahun SkyForge bersama kami! Total hadiah senilai 2 juta rupiah untuk 10 pemenang beruntung. Cara ikut sangat mudah!",
    category: "Giveaway",
    date: "2025-06-01",
    views: 3200,
    gradient: "from-purple-600/30 to-pink-600/30",
    badgeVariant: "purple" as const,
    featured: false,
  },
  {
    id: "new-pets-update",
    title: "15 Pet Baru Ditambahkan ke SkyForge!",
    excerpt: "Update pet terbesar sepanjang sejarah SkyForge! 15 pet baru dengan ability unik telah ditambahkan, termasuk pet legendaris Void Dragon.",
    category: "Update",
    date: "2025-05-25",
    views: 2100,
    gradient: "from-green-600/30 to-teal-600/30",
    badgeVariant: "success" as const,
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Update: "destructive",
  Event: "warning",
  Changelog: "default",
  Maintenance: "secondary",
  Giveaway: "purple",
};

export default function NewsPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            Latest News
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            News & <span className="gradient-text">Updates</span>
          </h1>
          <p className="text-white/60">Tetap update dengan berita terbaru dari SkyForge.</p>
        </div>

        {/* Featured Post */}
        {featured && (
          <Link href={`/news/${featured.id}`} className="block mb-8">
            <Card className="border-white/10 overflow-hidden card-hover group">
              <div className={`h-64 md:h-80 bg-gradient-to-br ${featured.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-[#050a14]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <Badge variant={featured.badgeVariant as any} className="mb-3">
                    Featured · {featured.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-sky-300 transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-white/60 text-sm line-clamp-2 max-w-2xl">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-white/40">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featured.views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link key={post.id} href={`/news/${post.id}`}>
              <Card className="border-white/8 card-hover h-full overflow-hidden group">
                <div className={`h-40 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-dots opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/80 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge variant={categoryColors[post.category] as any ?? "secondary"}>{post.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-xs text-white/40 mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-sky-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
