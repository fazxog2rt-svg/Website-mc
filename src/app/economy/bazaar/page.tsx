"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Search, Minus, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface BazaarItem {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  change24h: number;
  volume24h: number;
  priceHistory: number[];
}

const ITEMS: BazaarItem[] = [
  { id: "diamond", name: "Diamond Ore", category: "Resources", currentPrice: 720, minPrice: 580, maxPrice: 890, change24h: 5.2, volume24h: 142800, priceHistory: [600, 620, 610, 650, 680, 700, 690, 710, 730, 720] },
  { id: "netherite", name: "Netherite Ingot", category: "Resources", currentPrice: 85000, minPrice: 70000, maxPrice: 102000, change24h: 12.8, volume24h: 45200, priceHistory: [72000, 75000, 73000, 78000, 80000, 82000, 79000, 84000, 87000, 85000] },
  { id: "heavy-core", name: "Heavy Core", category: "1.21.8 Drop", currentPrice: 1200000, minPrice: 900000, maxPrice: 1500000, change24h: 25.3, volume24h: 8, priceHistory: [900000, 950000, 980000, 1050000, 1100000, 1080000, 1150000, 1200000, 1250000, 1200000] },
  { id: "wind-charge", name: "Wind Charge", category: "1.21.8 Item", currentPrice: 45000, minPrice: 38000, maxPrice: 62000, change24h: -8.2, volume24h: 12400, priceHistory: [55000, 58000, 62000, 60000, 55000, 52000, 48000, 46000, 47000, 45000] },
  { id: "mace", name: "Mace (Unenchanted)", category: "Weapons", currentPrice: 2800000, minPrice: 2200000, maxPrice: 3500000, change24h: 18.4, volume24h: 24, priceHistory: [2200000, 2300000, 2400000, 2500000, 2600000, 2700000, 2650000, 2750000, 2800000, 2800000] },
  { id: "breeze-rod", name: "Breeze Rod", category: "1.21.8 Drop", currentPrice: 380000, minPrice: 290000, maxPrice: 450000, change24h: -3.1, volume24h: 156, priceHistory: [410000, 420000, 405000, 415000, 400000, 395000, 390000, 385000, 382000, 380000] },
  { id: "trial-key", name: "Trial Key", category: "1.21.8 Item", currentPrice: 125000, minPrice: 95000, maxPrice: 160000, change24h: 7.6, volume24h: 2840, priceHistory: [110000, 115000, 112000, 118000, 120000, 122000, 119000, 124000, 127000, 125000] },
  { id: "ominous-bottle", name: "Ominous Bottle", category: "1.21.8 Item", currentPrice: 28000, minPrice: 22000, maxPrice: 35000, change24h: 2.4, volume24h: 4500, priceHistory: [25000, 26000, 25500, 27000, 27500, 28000, 27200, 28500, 28800, 28000] },
  { id: "copper-bulb", name: "Copper Bulb", category: "Blocks", currentPrice: 1800, minPrice: 1400, maxPrice: 2200, change24h: -1.5, volume24h: 89000, priceHistory: [2000, 1950, 1900, 1850, 1900, 1850, 1820, 1800, 1810, 1800] },
  { id: "tuff-brick", name: "Tuff Bricks", category: "Blocks", currentPrice: 950, minPrice: 750, maxPrice: 1200, change24h: 0.5, volume24h: 134000, priceHistory: [930, 940, 945, 950, 942, 955, 960, 950, 948, 950] },
];

const CATEGORIES = ["Semua", "Resources", "1.21.8 Drop", "1.21.8 Item", "Weapons", "Blocks"];

function MiniChart({ data, positive }: { data: number[]; positive: boolean }) {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 32;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={pts} fill="none" stroke={positive ? "#34d399" : "#f87171"} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function BazaarPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [selected, setSelected] = useState<BazaarItem | null>(ITEMS[0]);

  const filtered = ITEMS.filter((it) => {
    const matchCat = category === "Semua" || it.category === category;
    const matchSearch = !search || it.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            Bazaar 1.21.8
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Grafik Harga <span className="gradient-text">Bazaar</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Pantau harga item bazaar SkyForge 1.21.8 termasuk item baru seperti Heavy Core, Wind Charge, dan Breeze Rod.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: item list */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-3 sticky top-24">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input placeholder="Cari item..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 glass border-white/10 bg-transparent text-sm" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => setCategory(cat)} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${category === cat ? "bg-yellow-500/20 border border-yellow-500/40 text-yellow-400" : "glass border border-white/10 text-white/40 hover:text-white"}`}>{cat}</button>
                ))}
              </div>
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                {filtered.map((item) => (
                  <button key={item.id} onClick={() => setSelected(item)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${selected?.id === item.id ? "bg-yellow-500/15 border border-yellow-500/30" : "glass border border-white/8 hover:border-white/20"}`}>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                      <div className="text-[10px] text-white/40">{item.category}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-yellow-400">{item.currentPrice.toLocaleString("id-ID")}</div>
                      <div className={`text-[10px] font-semibold flex items-center justify-end gap-0.5 ${item.change24h > 0 ? "text-emerald-400" : item.change24h < 0 ? "text-red-400" : "text-white/40"}`}>
                        {item.change24h > 0 ? <TrendingUp className="w-2.5 h-2.5" /> : item.change24h < 0 ? <TrendingDown className="w-2.5 h-2.5" /> : <Minus className="w-2.5 h-2.5" />}
                        {item.change24h > 0 ? "+" : ""}{item.change24h}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: detail chart */}
          <div className="lg:col-span-2">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-white/10 mb-4">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-black text-white mb-1">{selected.name}</h2>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{selected.category}</span>
                          <span className="flex items-center gap-1 text-xs text-white/30"><Clock className="w-3 h-3" />Update setiap 10 menit</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-yellow-400">{selected.currentPrice.toLocaleString("id-ID")} SC</div>
                        <div className={`flex items-center justify-end gap-1 text-sm font-bold ${selected.change24h > 0 ? "text-emerald-400" : selected.change24h < 0 ? "text-red-400" : "text-white/40"}`}>
                          {selected.change24h > 0 ? <TrendingUp className="w-4 h-4" /> : selected.change24h < 0 ? <TrendingDown className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                          {selected.change24h > 0 ? "+" : ""}{selected.change24h}% (24j)
                        </div>
                      </div>
                    </div>

                    {/* Price chart (CSS-based) */}
                    <div className="mb-6">
                      <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-3">Grafik Harga (10 Hari Terakhir)</div>
                      <div className="relative h-40 glass rounded-2xl overflow-hidden p-4">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox={`0 0 100 100`}>
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={selected.change24h >= 0 ? "#34d399" : "#f87171"} stopOpacity="0.3" />
                              <stop offset="100%" stopColor={selected.change24h >= 0 ? "#34d399" : "#f87171"} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {(() => {
                            const d = selected.priceHistory;
                            const mn = Math.min(...d) * 0.98;
                            const mx = Math.max(...d) * 1.02;
                            const range = mx - mn;
                            const pts = d.map((v, i) => `${(i / (d.length - 1)) * 100},${100 - ((v - mn) / range) * 90}`);
                            const pathD = `M${pts.join(" L")} L100,100 L0,100 Z`;
                            const linePts = pts.join(" ");
                            return (
                              <>
                                <path d={pathD} fill="url(#chartGrad)" />
                                <polyline points={linePts} fill="none" stroke={selected.change24h >= 0 ? "#34d399" : "#f87171"} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                                {pts.map((pt, i) => {
                                  const [x, y] = pt.split(",").map(Number);
                                  return <circle key={i} cx={x} cy={y} r="1.5" fill={selected.change24h >= 0 ? "#34d399" : "#f87171"} />;
                                })}
                              </>
                            );
                          })()}
                        </svg>
                        <div className="absolute right-3 top-3 text-[10px] text-white/30">Harga dalam SC</div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "Harga Terendah (10hr)", value: selected.minPrice.toLocaleString("id-ID") + " SC", color: "text-emerald-400" },
                        { label: "Harga Tertinggi (10hr)", value: selected.maxPrice.toLocaleString("id-ID") + " SC", color: "text-red-400" },
                        { label: "Harga Saat Ini", value: selected.currentPrice.toLocaleString("id-ID") + " SC", color: "text-yellow-400" },
                        { label: "Volume 24 Jam", value: selected.volume24h.toLocaleString("id-ID"), color: "text-sky-400" },
                      ].map((stat) => (
                        <div key={stat.label} className="glass rounded-xl p-3 text-center">
                          <div className={`text-sm font-black ${stat.color} mb-1`}>{stat.value}</div>
                          <div className="text-[10px] text-white/40">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* All items mini chart */}
                <div className="glass border border-white/10 rounded-2xl p-4">
                  <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-3">Perbandingan Perubahan 24 Jam</div>
                  <div className="space-y-2">
                    {[...ITEMS].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)).slice(0, 6).map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="text-xs text-white/70 w-36 truncate">{item.name}</div>
                        <div className="flex-1 relative h-4">
                          <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />
                          {item.change24h !== 0 && (
                            <div
                              className={`absolute top-1 h-2 rounded-full ${item.change24h > 0 ? "bg-emerald-400 left-1/2" : "bg-red-400 right-1/2"}`}
                              style={{ width: `${Math.min(Math.abs(item.change24h) * 2, 48)}%` }}
                            />
                          )}
                        </div>
                        <div className={`text-xs font-bold w-14 text-right ${item.change24h > 0 ? "text-emerald-400" : item.change24h < 0 ? "text-red-400" : "text-white/40"}`}>
                          {item.change24h > 0 ? "+" : ""}{item.change24h}%
                        </div>
                        <MiniChart data={item.priceHistory} positive={item.change24h >= 0} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-64 glass rounded-2xl flex items-center justify-center text-white/30 text-sm">
                Pilih item untuk melihat grafik harga
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
