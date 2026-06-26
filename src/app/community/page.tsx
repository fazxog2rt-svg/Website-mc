import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, MessageCircle, Camera, PlayCircle, Music2, Users, Star, Mountain, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Community",
  description: "Bergabung dengan komunitas SkyForge di berbagai platform.",
};

function getSocialPlatforms(discordUrl: string) { return [
  {
    name: "Discord",
    description: "Server utama komunitas SkyForge. Chat, voice, support, dan event eksklusif.",
    icon: MessageCircle,
    url: discordUrl,
    color: "from-indigo-400 to-indigo-600",
    members: "12,500+",
    badge: "Most Active",
  },
  {
    name: "Instagram",
    description: "Update terbaru, screenshot community, dan behind-the-scenes SkyForge.",
    icon: Camera,
    url: SITE_CONFIG.instagramUrl,
    color: "from-pink-400 to-fuchsia-600",
    members: "8,200+",
    badge: "Daily Posts",
  },
  {
    name: "YouTube",
    description: "Trailer update, tutorial, event highlights, dan konten eksklusif.",
    icon: PlayCircle,
    url: SITE_CONFIG.youtubeUrl,
    color: "from-red-400 to-red-600",
    members: "5,100+",
    badge: "Weekly Videos",
  },
  {
    name: "TikTok",
    description: "Short clips, highlights, dan konten viral dari server SkyForge.",
    icon: Music2,
    url: SITE_CONFIG.tiktokUrl,
    color: "from-gray-600 to-gray-800",
    members: "3,800+",
    badge: "Trending",
  },
]; }

const featuredIslands = [
  { ownerUsername: "StormKing", ownerUUID: "069a79f4-44e9-4726-a5be-fca90e38aaf5", islandName: "Storm Citadel", description: "Island berbentuk kastil besar dengan menara tinggi dan moat penuh air.", islandLevel: 487, islandValue: 12500000, votes: 342, gradient: "from-sky-500/30 to-blue-700/30" },
  { ownerUsername: "IsleQueen", ownerUUID: "853c80ef-3c37-49fd-aa49-938b674adae6", islandName: "Crystal Paradise", description: "Island dengan dekorasi kristal cantik dan taman bunga warna-warni.", islandLevel: 412, islandValue: 9800000, votes: 289, gradient: "from-pink-500/30 to-fuchsia-700/30" },
  { ownerUsername: "NightForge", ownerUUID: "61699b2e-d327-4a01-9f1e-0ea8c3f06bc6", islandName: "Obsidian Tower", description: "Menara obsidian menjulang dengan lab enchanting tersembunyi di bawahnya.", islandLevel: 391, islandValue: 8600000, votes: 256, gradient: "from-purple-500/30 to-violet-700/30" },
  { ownerUsername: "SkyCraft", ownerUUID: "107af014-4e17-4bf4-9b7c-dc3f75049c1e", islandName: "Sky Garden", description: "Taman melayang yang penuh dengan tanaman eksotis dan rumah pohon.", islandLevel: 345, islandValue: 7200000, votes: 198, gradient: "from-green-500/30 to-emerald-700/30" },
  { ownerUsername: "DragonMage", ownerUUID: "e6b5c840-c20d-47a2-a1d2-6fbba4de4c18", islandName: "Dragon Lair", description: "Sarang naga epik dengan dungeon di bawah tanah dan harta karun tersembunyi.", islandLevel: 329, islandValue: 6700000, votes: 187, gradient: "from-red-500/30 to-orange-700/30" },
  { ownerUsername: "AquaLord", ownerUUID: "3c2ead6f-d7ab-4a52-8e1f-c5b76e8fd59a", islandName: "Ocean Depths", description: "Island bawah air dengan struktur koral dan jalan kaca transparan.", islandLevel: 298, islandValue: 5900000, votes: 165, gradient: "from-cyan-500/30 to-teal-700/30" },
];

const galleryItems = [
  { title: "Island of the Month - June 2025", author: "StormKing", gradient: "from-sky-500/40 to-blue-700/40" },
  { title: "Epic Dungeon Run", author: "IsleQueen", gradient: "from-red-500/40 to-orange-600/40" },
  { title: "Mega Island Build", author: "NightForge", gradient: "from-purple-500/40 to-violet-700/40" },
  { title: "Summer Event Screenshot", author: "SkyCraft", gradient: "from-yellow-500/40 to-amber-600/40" },
  { title: "PvP Tournament Finals", author: "DragonMage", gradient: "from-green-500/40 to-emerald-700/40" },
  { title: "Anniversary Party!", author: "Community", gradient: "from-pink-500/40 to-fuchsia-700/40" },
];

export default function CommunityPage() {
  const discordUrl =
    process.env.DISCORD_INVITE_URL ||
    process.env.NEXT_PUBLIC_DISCORD_INVITE ||
    "https://discord.gg/3NAKrYaBgh";
  const socialPlatforms = getSocialPlatforms(discordUrl);
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Users className="w-3.5 h-3.5" />
            Community
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Join the <span className="gradient-text">Community</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Bergabung dengan ribuan pemain SkyForge di berbagai platform komunitas kami.
          </p>
        </div>

        {/* Social Platforms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {socialPlatforms.map((platform) => (
            <Card key={platform.name} className="border-white/8 card-hover group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <platform.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-bold text-white">{platform.name}</h3>
                      <span className="text-[10px] font-bold text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2 py-0.5 rounded-full">
                        {platform.badge}
                      </span>
                    </div>
                    <p className="text-sm text-white/55 mb-3">{platform.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Users className="w-4 h-4 text-white/40" />
                        <span className="font-bold text-white">{platform.members}</span>
                        <span className="text-white/40">members</span>
                      </div>
                      <a href={platform.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Join
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Island Showcase */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white">
              Island <span className="gradient-text">Showcase</span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Trophy className="w-3.5 h-3.5" />
              Juni 2026
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredIslands.map((island) => (
              <Card key={island.ownerUsername} className="border-white/8 card-hover group overflow-hidden">
                <div className={`h-28 bg-gradient-to-br ${island.gradient} relative`}>
                  <div className="absolute inset-0 bg-dots opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Mountain className="w-16 h-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
                      <Image
                        src={`https://crafatar.com/avatars/${island.ownerUUID}?size=40&overlay`}
                        alt={island.ownerUsername}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white text-sm truncate">{island.islandName}</div>
                      <div className="text-xs text-white/40">oleh {island.ownerUsername}</div>
                    </div>
                  </div>
                  <p className="text-xs text-white/50 mb-3 leading-relaxed line-clamp-2">{island.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="glass rounded-lg p-1.5">
                      <div className="text-xs font-bold text-sky-400">Lv.{island.islandLevel}</div>
                      <div className="text-[10px] text-white/35">Level</div>
                    </div>
                    <div className="glass rounded-lg p-1.5">
                      <div className="text-xs font-bold text-yellow-400">{(island.islandValue / 1000000).toFixed(1)}M</div>
                      <div className="text-[10px] text-white/35">Nilai</div>
                    </div>
                    <div className="glass rounded-lg p-1.5">
                      <div className="text-xs font-bold text-pink-400">{island.votes}</div>
                      <div className="text-[10px] text-white/35">Votes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6 text-center">
            Community <span className="gradient-text">Gallery</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.title}
                className={`aspect-video rounded-2xl bg-gradient-to-br ${item.gradient} relative overflow-hidden group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-dots opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-xs font-bold text-white leading-tight">{item.title}</div>
                  <div className="text-xs text-white/60">by {item.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
