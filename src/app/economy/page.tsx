import React from "react";
import type { Metadata } from "next";
import { TrendingUp, TrendingDown, Minus, BarChart3, Users, ArrowUpRight, Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Ekonomi Server",
  description: "Statistik ekonomi dan pasar SkyForge.",
};

interface TradedItem {
  rank: number;
  name: string;
  category: string;
  avgPrice: number;
  volume: number;
  priceChange: number;
}

interface EconStat {
  label: string;
  value: string;
  sub: string;
  color: string;
}

const topTradedItems: TradedItem[] = [
  { rank: 1, name: "Diamond Ore", category: "Resources", avgPrice: 720, volume: 142800, priceChange: 5.2 },
  { rank: 2, name: "Enchanted Golden Apple", category: "Food", avgPrice: 12000, volume: 98500, priceChange: -2.1 },
  { rank: 3, name: "Netherite Ingot", category: "Resources", avgPrice: 85000, volume: 45200, priceChange: 12.8 },
  { rank: 4, name: "Ancient Debris", category: "Resources", avgPrice: 40000, volume: 38700, priceChange: 8.4 },
  { rank: 5, name: "Dragon Egg", category: "Special", avgPrice: 2100000, volume: 12, priceChange: 0.0 },
  { rank: 6, name: "Elytra", category: "Armor", avgPrice: 650000, volume: 285, priceChange: -5.7 },
  { rank: 7, name: "Shulker Box", category: "Misc", avgPrice: 15000, volume: 24600, priceChange: 1.3 },
  { rank: 8, name: "Blaze Rod x64", category: "Resources", avgPrice: 8500, volume: 67400, priceChange: -0.8 },
  { rank: 9, name: "Wither Skull", category: "Boss Drop", avgPrice: 32000, volume: 8900, priceChange: 3.6 },
  { rank: 10, name: "Beacon", category: "Special", avgPrice: 280000, volume: 142, priceChange: -1.2 },
];

const econStats: EconStat[] = [
  { label: "Total Transaksi (24j)", value: "847,291", sub: "+12.4% dari kemarin", color: "text-sky-400" },
  { label: "Trader Aktif", value: "3,842", sub: "online saat ini", color: "text-emerald-400" },
  { label: "Total Volume (24j)", value: "12.4B SC", sub: "SkyCoins beredar", color: "text-yellow-400" },
  { label: "Listing Aktif", value: "24,581", sub: "item di auction", color: "text-purple-400" },
];

const categoryBreakdown = [
  { category: "Resources", pct: 38, color: "bg-sky-500" },
  { category: "Weapons", pct: 22, color: "bg-red-500" },
  { category: "Armor", pct: 18, color: "bg-purple-500" },
  { category: "Food", pct: 11, color: "bg-green-500" },
  { category: "Misc", pct: 11, color: "bg-orange-500" },
];

export default function EconomyPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            Ekonomi Server
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Statistik <span className="gradient-text">Ekonomi</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Pantau tren pasar, harga item, dan statistik ekonomi server SkyForge secara real-time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {econStats.map((stat) => (
            <Card key={stat.label} className="border-white/8">
              <CardContent className="p-5">
                <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs font-semibold text-white/70 mb-0.5">{stat.label}</div>
                <div className="text-xs text-white/35">{stat.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <Card className="border-white/8 h-full">
              <CardContent className="p-6">
                <h2 className="text-lg font-black text-white mb-5 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  Item Paling Banyak Diperdagangkan
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-white/35 border-b border-white/8">
                        <th className="text-left py-2 font-semibold w-8">#</th>
                        <th className="text-left py-2 font-semibold">Item</th>
                        <th className="text-right py-2 font-semibold">Harga Rata-rata</th>
                        <th className="text-right py-2 font-semibold">Volume</th>
                        <th className="text-right py-2 font-semibold">Perubahan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topTradedItems.map((item) => (
                        <tr key={item.rank} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="py-3 text-white/30 text-xs">{item.rank}</td>
                          <td className="py-3">
                            <div className="text-white font-semibold text-xs leading-snug">{item.name}</div>
                            <div className="text-white/35 text-[10px]">{item.category}</div>
                          </td>
                          <td className="py-3 text-right text-yellow-400 font-bold text-xs">
                            {item.avgPrice.toLocaleString("id-ID")} SC
                          </td>
                          <td className="py-3 text-right text-white/60 text-xs">
                            {item.volume.toLocaleString("id-ID")}
                          </td>
                          <td className="py-3 text-right">
                            <div className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                              item.priceChange > 0
                                ? "text-emerald-400"
                                : item.priceChange < 0
                                ? "text-red-400"
                                : "text-white/40"
                            }`}>
                              {item.priceChange > 0 ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : item.priceChange < 0 ? (
                                <TrendingDown className="w-3 h-3" />
                              ) : (
                                <Minus className="w-3 h-3" />
                              )}
                              {item.priceChange > 0 ? "+" : ""}{item.priceChange}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="border-white/8">
              <CardContent className="p-6">
                <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sky-400" />
                  Volume per Kategori
                </h2>
                <div className="space-y-3">
                  {categoryBreakdown.map((cat) => (
                    <div key={cat.category}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/70">{cat.category}</span>
                        <span className="text-white/50">{cat.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cat.color}`}
                          style={{ width: `${cat.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/8">
              <CardContent className="p-6">
                <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  Top Trader Hari Ini
                </h2>
                <div className="space-y-3">
                  {[
                    { name: "TradeKing99", coins: "48.2M", rank: 1 },
                    { name: "MarketQueen", coins: "35.7M", rank: 2 },
                    { name: "AuctionPro", coins: "29.1M", rank: 3 },
                    { name: "WealthMaster", coins: "22.4M", rank: 4 },
                    { name: "DiamondDealer", coins: "19.8M", rank: 5 },
                  ].map((trader) => (
                    <div key={trader.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 text-center text-xs text-white/30 font-bold">{trader.rank}</span>
                        <span className="text-white text-xs font-semibold">{trader.name}</span>
                      </div>
                      <span className="text-yellow-400 text-xs font-bold">{trader.coins} SC</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/8">
              <CardContent className="p-6">
                <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  Ringkasan Ekonomi
                </h2>
                <div className="space-y-2.5">
                  {[
                    { label: "Total SkyCoins beredar", value: "847.2B SC" },
                    { label: "Rata-rata koin per pemain", value: "214,300 SC" },
                    { label: "Inflasi minggu ini", value: "+2.8%" },
                    { label: "Item terjual hari ini", value: "24,891" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center text-xs">
                      <span className="text-white/50">{row.label}</span>
                      <span className="text-white font-bold">{row.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
