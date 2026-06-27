import React from "react";
import type { Metadata } from "next";
import { ExternalLink, Crown, Coins, Star, Package, Sparkles, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Store",
  description: "Beli rank, coins, dan item premium untuk SkyForge.",
};

const categories = [
  {
    id: "ranks",
    icon: Crown,
    label: "Ranks",
    color: "from-yellow-400 to-amber-600",
    items: [
      { name: "VIP", price: 50000, originalPrice: null, color: "#55ff55", popular: false, perks: ["Fly di island sendiri", "2x Island slots", "Custom prefix [VIP]", "5 Crate Keys bonus", "Access /ec"] },
      { name: "VIP+", price: 100000, originalPrice: null, color: "#ffff55", popular: false, perks: ["Fly everywhere", "3x Island slots", "Custom prefix [VIP+]", "10 Crate Keys bonus", "Pet slot +1", "Access /pv"] },
      { name: "MVP", price: 200000, originalPrice: 250000, color: "#55ffff", popular: true, perks: ["Fly everywhere", "4x Island slots", "Custom prefix [MVP]", "20 Crate Keys bonus", "Pet slot +2", "Access /back", "Exclusive MVP cosmetics"] },
      { name: "MVP+", price: 350000, originalPrice: null, color: "#ffaa00", popular: false, perks: ["Fly everywhere", "5x Island slots", "Custom prefix [MVP+]", "30 Crate Keys bonus", "Pet slot +3", "All utility commands", "Nick color", "Exclusive MVP+ cosmetics"] },
    ],
  },
  {
    id: "coins",
    icon: Coins,
    label: "SkyCoins",
    color: "from-sky-400 to-blue-600",
    items: [
      { name: "1,000 SkyCoins", price: 15000, originalPrice: null, color: "#38bdf8", popular: false, perks: ["1,000 in-game coins", "Instant delivery", "Never expires"] },
      { name: "5,000 SkyCoins", price: 65000, originalPrice: null, color: "#38bdf8", popular: false, perks: ["5,000 in-game coins", "Bonus 500 coins", "Instant delivery"] },
      { name: "15,000 SkyCoins", price: 175000, originalPrice: 200000, color: "#38bdf8", popular: true, perks: ["15,000 in-game coins", "Bonus 2,500 coins", "Instant delivery"] },
      { name: "50,000 SkyCoins", price: 500000, originalPrice: null, color: "#38bdf8", popular: false, perks: ["50,000 in-game coins", "Bonus 10,000 coins", "Instant delivery"] },
    ],
  },
  {
    id: "keys",
    icon: Star,
    label: "Crate Keys",
    color: "from-purple-400 to-violet-600",
    items: [
      { name: "Common Keys x5", price: 10000, originalPrice: null, color: "#a78bfa", popular: false, perks: ["5x Common Crate Keys", "Basic loot pool"] },
      { name: "Rare Keys x3", price: 20000, originalPrice: null, color: "#a78bfa", popular: false, perks: ["3x Rare Crate Keys", "Better loot pool"] },
      { name: "Epic Keys x1", price: 25000, originalPrice: null, color: "#a78bfa", popular: true, perks: ["1x Epic Crate Key", "Exclusive loot pool"] },
      { name: "Legendary Keys x1", price: 50000, originalPrice: null, color: "#a78bfa", popular: false, perks: ["1x Legendary Crate Key", "Rarest items pool"] },
    ],
  },
  {
    id: "cosmetics",
    icon: Sparkles,
    label: "Cosmetics",
    color: "from-pink-400 to-fuchsia-600",
    items: [
      { name: "Particle Pack", price: 30000, originalPrice: null, color: "#f472b6", popular: false, perks: ["10 particle effects", "Permanent unlock"] },
      { name: "Title Bundle", price: 25000, originalPrice: null, color: "#f472b6", popular: false, perks: ["5 exclusive titles", "Permanent unlock"] },
      { name: "Mount Bundle", price: 75000, originalPrice: null, color: "#f472b6", popular: true, perks: ["3 unique mounts", "Permanent unlock"] },
      { name: "Mega Cosmetic Pack", price: 150000, originalPrice: 200000, color: "#f472b6", popular: false, perks: ["30+ cosmetics", "Best value", "Permanent unlock"] },
    ],
  },
];

// Check if any ranks have discounts
const hasDiscount = categories.some((cat) => cat.items.some((item) => item.originalPrice !== null));

// Rank comparison features
const rankComparisonFeatures = [
  { feature: "Fly di island sendiri", vip: true, vipPlus: true, mvp: true, mvpPlus: true },
  { feature: "Fly di semua area", vip: false, vipPlus: true, mvp: true, mvpPlus: true },
  { feature: "Island slots", vip: "2x", vipPlus: "3x", mvp: "4x", mvpPlus: "5x" },
  { feature: "Access /ec", vip: true, vipPlus: true, mvp: true, mvpPlus: true },
  { feature: "Access /pv", vip: false, vipPlus: true, mvp: true, mvpPlus: true },
  { feature: "Access /back", vip: false, vipPlus: false, mvp: true, mvpPlus: true },
  { feature: "Pet slot bonus", vip: false, vipPlus: "+1", mvp: "+2", mvpPlus: "+3" },
  { feature: "Crate Keys bonus", vip: "5x", vipPlus: "10x", mvp: "20x", mvpPlus: "30x" },
  { feature: "Exclusive cosmetics", vip: false, vipPlus: false, mvp: true, mvpPlus: true },
  { feature: "Custom nick color", vip: false, vipPlus: false, mvp: false, mvpPlus: true },
  { feature: "All utility commands", vip: false, vipPlus: false, mvp: false, mvpPlus: true },
];

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-green-400 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-white/20 mx-auto" />;
  return <span className="text-xs font-semibold text-sky-400">{value}</span>;
}

export default function StorePage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* SALE Banner */}
        {hasDiscount && (
          <div className="mb-8 glass border border-yellow-500/30 rounded-2xl px-6 py-4 flex items-center gap-3 bg-gradient-to-r from-yellow-500/5 to-amber-500/5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shrink-0">
              <span className="text-sm font-black text-white">%</span>
            </div>
            <div>
              <p className="font-black text-white text-sm">PROMO AKTIF 🎉</p>
              <p className="text-xs text-white/50">Beberapa item sedang dalam diskon terbatas. Jangan sampai terlewat!</p>
            </div>
            <div className="ml-auto shrink-0">
              <Badge variant="gold">SALE</Badge>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Official Store
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            SkyForge <span className="gradient-text-gold">Store</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Dukung server dan dapatkan privilege eksklusif. Semua pembelian melalui WhatsApp untuk keamanan transaksi.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 glass rounded-2xl border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white/70">Pembayaran via WhatsApp • Aktivasi Instan</span>
          </div>
        </div>

        {/* Categories */}
        {categories.map((cat) => (
          <div key={cat.id} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                <cat.icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white">{cat.label}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cat.items.map((item) => (
                <Card
                  key={item.name}
                  className={`relative overflow-hidden card-hover ${item.popular ? "border-yellow-500/40" : "border-white/8"}`}
                >
                  {item.popular && (
                    <>
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500" />
                      <div className="absolute top-2.5 right-2.5">
                        <Badge variant="gold" className="text-[10px]">
                          {cat.id === "ranks" ? "Most Popular" : "Popular"}
                        </Badge>
                      </div>
                    </>
                  )}
                  {item.originalPrice && (
                    <div className="absolute top-2.5 left-2.5">
                      <Badge variant="destructive" className="text-[10px]">SALE</Badge>
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="font-black text-xl mb-1" style={{ color: item.color }}>
                      {item.name}
                    </div>
                    <div className="mb-4">
                      <div className="text-2xl font-black text-white">
                        Rp {item.price.toLocaleString("id-ID")}
                      </div>
                      {item.originalPrice && (
                        <div className="text-sm text-white/30 line-through">
                          Rp {item.originalPrice.toLocaleString("id-ID")}
                        </div>
                      )}
                    </div>
                    <ul className="space-y-1.5 mb-5">
                      {item.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-xs text-white/60">
                          <div className="w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <a href={SITE_CONFIG.storeWhatsApp} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant={item.popular ? "gold" : "outline"}
                        size="sm"
                        className="w-full gap-1.5 text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Beli Sekarang
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Rank Comparison Table */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black text-white">Perbandingan Rank</h2>
          </div>

          <div className="glass border border-white/8 rounded-2xl overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-5 border-b border-white/8">
              <div className="p-4 text-xs font-bold text-white/40 uppercase tracking-wider">Fitur</div>
              {[
                { name: "VIP", color: "#55ff55" },
                { name: "VIP+", color: "#ffff55" },
                { name: "MVP", color: "#55ffff", popular: true },
                { name: "MVP+", color: "#ffaa00" },
              ].map((rank) => (
                <div key={rank.name} className={`p-4 text-center ${rank.popular ? "bg-yellow-500/5 border-x border-yellow-500/20" : ""}`}>
                  {rank.popular && (
                    <div className="text-[9px] font-black text-yellow-400 mb-0.5">POPULAR</div>
                  )}
                  <span className="text-sm font-black" style={{ color: rank.color }}>[{rank.name}]</span>
                </div>
              ))}
            </div>
            {/* Feature rows */}
            {rankComparisonFeatures.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-5 border-b border-white/5 last:border-0 ${i % 2 === 0 ? "bg-white/1" : ""}`}
              >
                <div className="p-3.5 text-sm text-white/60 flex items-center">{row.feature}</div>
                <div className="p-3.5 flex items-center justify-center"><CellValue value={row.vip} /></div>
                <div className="p-3.5 flex items-center justify-center"><CellValue value={row.vipPlus} /></div>
                <div className="p-3.5 flex items-center justify-center bg-yellow-500/3 border-x border-yellow-500/10"><CellValue value={row.mvp} /></div>
                <div className="p-3.5 flex items-center justify-center"><CellValue value={row.mvpPlus} /></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass border border-white/10 rounded-3xl p-8 md:p-12 text-center mt-8">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
            Butuh paket khusus?
          </h3>
          <p className="text-white/60 mb-6">Hubungi admin kami langsung untuk custom bundle dan penawaran spesial.</p>
          <a href={SITE_CONFIG.storeWhatsApp} target="_blank" rel="noopener noreferrer">
            <Button variant="gold" size="lg" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Chat Admin via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
