"use client";
import React, { useState } from "react";
import { Search, Clock, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AuctionItem {
  id: string;
  name: string;
  seller: string;
  price: number;
  quantity: number;
  timeRemaining: string;
  category: string;
  rarity: string;
  enchants?: string[];
}

const mockAuctions: AuctionItem[] = [
  { id: "1", name: "Sharpness X Diamond Sword", seller: "DragonSlayer99", price: 250000, quantity: 1, timeRemaining: "2j 30m", category: "Weapons", rarity: "LEGENDARY", enchants: ["Sharpness X", "Fire Aspect V", "Looting IV"] },
  { id: "2", name: "Protection VIII Netherite Chestplate", seller: "ArmorKing", price: 380000, quantity: 1, timeRemaining: "5j 15m", category: "Armor", rarity: "EPIC", enchants: ["Protection VIII", "Unbreaking IV", "Mending II"] },
  { id: "3", name: "Diamond Ore x64", seller: "MinerPro", price: 45000, quantity: 64, timeRemaining: "12j 0m", category: "Resources", rarity: "RARE" },
  { id: "4", name: "Enchanted Golden Apple x10", seller: "FoodMaster", price: 120000, quantity: 10, timeRemaining: "1j 45m", category: "Food", rarity: "EPIC" },
  { id: "5", name: "Dragon Egg", seller: "EndSlayer", price: 2000000, quantity: 1, timeRemaining: "23j 59m", category: "Misc", rarity: "LEGENDARY" },
  { id: "6", name: "Efficiency X Diamond Pickaxe", seller: "SuperMiner", price: 180000, quantity: 1, timeRemaining: "8j 20m", category: "Weapons", rarity: "EPIC", enchants: ["Efficiency X", "Fortune IV", "Silk Touch II"] },
  { id: "7", name: "Emerald Block x32", seller: "TraderJoe", price: 28000, quantity: 32, timeRemaining: "3j 10m", category: "Resources", rarity: "UNCOMMON" },
  { id: "8", name: "Speed Boots Netherite", seller: "RunnerX", price: 155000, quantity: 1, timeRemaining: "6j 55m", category: "Armor", rarity: "RARE", enchants: ["Feather Falling X", "Speed Boost III", "Unbreaking IV"] },
  { id: "9", name: "Cake x16", seller: "BakerBob", price: 8000, quantity: 16, timeRemaining: "11j 30m", category: "Food", rarity: "COMMON" },
  { id: "10", name: "Wither Skull x3", seller: "BossFarmer", price: 95000, quantity: 3, timeRemaining: "4j 45m", category: "Misc", rarity: "RARE" },
  { id: "11", name: "Ancient Debris x8", seller: "NetherRunner", price: 320000, quantity: 8, timeRemaining: "7j 0m", category: "Resources", rarity: "EPIC" },
  { id: "12", name: "Trident with Riptide V", seller: "OceanMaster", price: 210000, quantity: 1, timeRemaining: "9j 25m", category: "Weapons", rarity: "EPIC", enchants: ["Riptide V", "Loyalty IV", "Channeling II"] },
];

const categories = ["All", "Weapons", "Armor", "Resources", "Food", "Misc"];

const rarityConfig: Record<string, { color: string; bg: string }> = {
  COMMON: { color: "text-white/60", bg: "bg-white/10" },
  UNCOMMON: { color: "text-green-400", bg: "bg-green-400/10" },
  RARE: { color: "text-sky-400", bg: "bg-sky-400/10" },
  EPIC: { color: "text-purple-400", bg: "bg-purple-400/10" },
  LEGENDARY: { color: "text-yellow-400", bg: "bg-yellow-400/10" },
};

export default function AuctionPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = mockAuctions.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.seller.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Package className="w-3.5 h-3.5" />
            Auction House
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">Auction House</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Beli dan jual item terbaik dari pemain lain. Temukan barang langka dengan harga terbaik!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari item atau seller..."
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-sky-500/20 border border-sky-500/40 text-sky-400"
                    : "glass border border-white/10 text-white/50 hover:text-white/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-sm text-white/40">
          {filtered.length} item ditemukan
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const rarity = rarityConfig[item.rarity] ?? rarityConfig.COMMON;
            return (
              <Card key={item.id} className="border-white/8 card-hover group overflow-hidden">
                <CardContent className="p-4">
                  <div className="mb-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white leading-snug group-hover:text-sky-300 transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${rarity.color} ${rarity.bg}`}>
                        {item.rarity}
                      </span>
                    </div>
                    <div className="text-xs text-white/40">oleh {item.seller}</div>
                  </div>

                  {item.enchants && item.enchants.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.enchants.slice(0, 2).map((ench) => (
                        <span key={ench} className="text-[10px] px-1.5 py-0.5 rounded-md glass border border-purple-400/20 text-purple-300">
                          {ench}
                        </span>
                      ))}
                      {item.enchants.length > 2 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md glass border border-white/10 text-white/30">
                          +{item.enchants.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-xs text-white/40">
                      <Clock className="w-3 h-3" />
                      {item.timeRemaining}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-white/40">x{item.quantity}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/40 mb-0.5">Harga</div>
                      <div className="flex items-center gap-1 text-yellow-400 font-black">
                        <span className="text-base">{item.price.toLocaleString("id-ID")}</span>
                        <span className="text-xs font-normal text-yellow-400/70">SC</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs h-7 gap-1 border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10">
                      Beli
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <div className="font-semibold">Tidak ada item ditemukan</div>
            <div className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</div>
          </div>
        )}
      </div>
    </div>
  );
}
