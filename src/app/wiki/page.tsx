import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Search, ChevronRight, Zap, Coins, Mountain, Sword, Users, Shield, HelpCircle, ScrollText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Wiki",
  description: "Panduan lengkap untuk bermain di SkyForge Minecraft Server.",
};

const wikiCategories = [
  {
    id: "getting-started",
    icon: BookOpen,
    title: "Panduan Pemula",
    color: "from-green-400 to-emerald-600",
    bg: "bg-green-400/10",
    articles: [
      { title: "Cara Bergabung ke Server", slug: "getting-started/join" },
      { title: "Membuat Island Pertama", slug: "getting-started/first-island" },
      { title: "Dasar-dasar Skyblock", slug: "getting-started/basics" },
      { title: "Commands yang Penting", slug: "getting-started/commands" },
    ],
  },
  {
    id: "island",
    icon: Mountain,
    title: "Island Guide",
    color: "from-sky-400 to-blue-600",
    bg: "bg-sky-400/10",
    articles: [
      { title: "Island Creation & Setup", slug: "island/creation" },
      { title: "Island Upgrades", slug: "island/upgrades" },
      { title: "Island Permissions", slug: "island/permissions" },
      { title: "Island Coop & Members", slug: "island/coop" },
      { title: "Island Warp", slug: "island/warp" },
    ],
  },
  {
    id: "economy",
    icon: Coins,
    title: "Economy",
    color: "from-yellow-400 to-amber-600",
    bg: "bg-yellow-400/10",
    articles: [
      { title: "Auction House Guide", slug: "economy/auction-house" },
      { title: "Bazaar & Trading", slug: "economy/bazaar" },
      { title: "Player Shop Setup", slug: "economy/player-shop" },
      { title: "Banking System", slug: "economy/banking" },
      { title: "Daily & Weekly Rewards", slug: "economy/rewards" },
    ],
  },
  {
    id: "skills",
    icon: Zap,
    title: "Skills & Progression",
    color: "from-purple-400 to-violet-600",
    bg: "bg-purple-400/10",
    articles: [
      { title: "Skill Overview", slug: "skills/overview" },
      { title: "Skill Tree Guide", slug: "skills/skill-tree" },
      { title: "XP & Leveling", slug: "skills/xp" },
      { title: "Prestige System", slug: "skills/prestige" },
    ],
  },
  {
    id: "enchants",
    icon: Sword,
    title: "Custom Enchants",
    color: "from-pink-400 to-fuchsia-600",
    bg: "bg-pink-400/10",
    articles: [
      { title: "Enchant List", slug: "enchants/list" },
      { title: "Anvil & Combining", slug: "enchants/combining" },
      { title: "Best Enchant Builds", slug: "enchants/builds" },
    ],
  },
  {
    id: "jobs",
    icon: Users,
    title: "Jobs",
    color: "from-orange-400 to-red-500",
    bg: "bg-orange-400/10",
    articles: [
      { title: "Jobs Overview", slug: "jobs/overview" },
      { title: "Miner Guide", slug: "jobs/miner" },
      { title: "Farmer Guide", slug: "jobs/farmer" },
      { title: "Fisher Guide", slug: "jobs/fisher" },
    ],
  },
  {
    id: "rules",
    icon: ScrollText,
    title: "Rules",
    color: "from-red-400 to-rose-600",
    bg: "bg-red-400/10",
    articles: [
      { title: "Server Rules", slug: "rules/server" },
      { title: "Punishment System", slug: "rules/punishments" },
      { title: "Banned Modifications", slug: "rules/mods" },
    ],
  },
  {
    id: "faq",
    icon: HelpCircle,
    title: "FAQ",
    color: "from-cyan-400 to-teal-600",
    bg: "bg-cyan-400/10",
    articles: [
      { title: "General FAQ", slug: "faq/general" },
      { title: "Technical Issues", slug: "faq/technical" },
      { title: "Store & Payment FAQ", slug: "faq/store" },
    ],
  },
];

export default function WikiPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Knowledge Base
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            SkyForge <span className="gradient-text">Wiki</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Panduan lengkap untuk semua fitur, mekanik, dan tips bermain di SkyForge.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search wiki articles..."
              className="w-full h-12 pl-11 pr-4 rounded-2xl glass border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {wikiCategories.map((category) => (
            <Card key={category.id} className="border-white/8 card-hover overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-white">{category.title}</h2>
                </div>
                <ul className="space-y-1.5">
                  {category.articles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/wiki/${article.slug}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200 group"
                      >
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-sky-400" />
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
