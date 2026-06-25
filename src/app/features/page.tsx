import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mountain, Coins, Star, Zap, Shield, Users, Swords, Package,
  Pickaxe, Fish, TreePine, Hammer, ChevronRight, Crown, Sparkles, Scroll
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features",
  description: "Temukan semua fitur eksklusif SkyForge Minecraft Skyblock Server.",
};

const featureCategories = [
  {
    id: "island",
    title: "Island System",
    icon: Mountain,
    color: "from-green-400 to-emerald-600",
    description: "Sistem island tercanggih dengan ratusan opsi kustomisasi.",
    features: ["Island Creation", "Border Upgrade", "Island Level & Value", "Island Top Rankings", "Coop & Members", "Island Warp", "Island Permissions", "Island Bank", "Island Missions", "Island Logs"],
    href: "/features/islands",
  },
  {
    id: "economy",
    title: "Economy",
    icon: Coins,
    color: "from-yellow-400 to-amber-600",
    description: "Ekonomi server yang seimbang dengan berbagai cara mendapatkan penghasilan.",
    features: ["Auction House", "Bazaar Real-time", "Player Shop", "Coin System", "Banking System", "Daily Rewards", "Weekly Rewards", "Vote Rewards"],
    href: "/features/economy",
  },
  {
    id: "progression",
    title: "Progression",
    icon: Star,
    color: "from-sky-400 to-blue-600",
    description: "Sistem progression mendalam dengan XP, Skill, dan Prestige.",
    features: ["Player Level", "Prestige System", "XP System", "8 Skills", "Skill Tree", "Mastery System", "Achievement System", "Title Unlock"],
    href: "/features/skills",
  },
  {
    id: "jobs",
    title: "Jobs System",
    icon: Pickaxe,
    color: "from-orange-400 to-red-500",
    description: "6 job unik yang memberikan reward dari aktivitas bermain.",
    features: ["Miner", "Farmer", "Fisher", "Hunter", "Woodcutter", "Builder", "Blacksmith", "Job Level Rewards"],
    href: "/features/jobs",
  },
  {
    id: "adventure",
    title: "Adventure",
    icon: Swords,
    color: "from-red-400 to-rose-600",
    description: "Dungeon, boss, dan quest yang menantang untuk petualangan epik.",
    features: ["Custom Dungeons", "Epic Boss Battles", "Custom Mobs", "Daily Quests", "Weekly Quests", "Seasonal Events", "Loot System", "Party System"],
    href: "/features/dungeons",
  },
  {
    id: "custom",
    title: "Custom Features",
    icon: Sparkles,
    color: "from-purple-400 to-violet-600",
    description: "Ratusan fitur custom eksklusif yang tidak ada di server lain.",
    features: ["Custom Enchants", "Pets System", "Minions", "Mounts", "Cosmetics", "Titles & Prefix", "Crates", "Backpacks", "Artifacts", "Relics"],
    href: "/features/custom",
  },
  {
    id: "utility",
    title: "Utility",
    icon: Package,
    color: "from-cyan-400 to-teal-600",
    description: "Utilitas lengkap untuk kenyamanan bermain sehari-hari.",
    features: ["Mail System", "Trading", "Friends List", "Party System", "Player Ignore", "Warp Network", "RTP", "AFK Rewards"],
    href: "/features/utility",
  },
  {
    id: "enchants",
    title: "Custom Enchants",
    icon: Zap,
    color: "from-pink-400 to-fuchsia-600",
    description: "Lebih dari 150 custom enchant eksklusif untuk armor, senjata, dan tools.",
    features: ["150+ Enchants", "Tiered System", "Anvil Combining", "Enchant Orbs", "Protection Scrolls", "Dust System", "Soul Enchants", "Unique Effects"],
    href: "/features/enchants",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            All Features
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            What Makes <span className="gradient-text">SkyForge</span> Special
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Ratusan fitur eksklusif dirancang untuk memberikan pengalaman Skyblock terbaik. Setiap fitur dikembangkan dengan gameplay yang mendalam dan pengalaman pengguna yang menyenangkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featureCategories.map((cat) => (
            <Card key={cat.id} className="border-white/8 card-hover group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">{cat.title}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{cat.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cat.features.map((feature) => (
                    <span key={feature} className="text-[11px] px-2 py-0.5 rounded-full glass border border-white/10 text-white/60">
                      {feature}
                    </span>
                  ))}
                </div>

                <Link href={cat.href}>
                  <Button variant="ghost" size="sm" className="w-full gap-2 justify-between text-white/50 hover:text-white">
                    Learn More <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
