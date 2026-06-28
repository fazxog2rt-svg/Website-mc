"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, Share2, ShoppingBag, ArrowLeft, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RANKS } from "@/lib/constants";

interface WishlistItem {
  id: string;
  name: string;
  color: string;
  price: number;
  perks: readonly string[];
  addedAt: number;
  targetUsername?: string;
}

const STORAGE_KEY = "skyforge_wishlist";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [targetName, setTargetName] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setWishlist(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const save = (items: WishlistItem[]) => {
    setWishlist(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addRank = (rank: typeof RANKS[number]) => {
    if (wishlist.some((w) => w.id === rank.id)) {
      toast.error(`${rank.name} sudah ada di wishlist!`);
      return;
    }
    const item: WishlistItem = { id: rank.id, name: rank.name, color: rank.color, price: rank.price, perks: rank.perks, addedAt: Date.now() };
    save([...wishlist, item]);
    toast.success(`${rank.name} ditambahkan ke wishlist!`);
  };

  const removeItem = (id: string) => {
    save(wishlist.filter((w) => w.id !== id));
    toast.success("Dihapus dari wishlist");
  };

  const updateTarget = (id: string, name: string) => {
    setTargetName((prev) => ({ ...prev, [id]: name }));
    save(wishlist.map((w) => w.id === id ? { ...w, targetUsername: name } : w));
  };

  const shareWishlist = () => {
    const text = wishlist.map((w) => `• ${w.name} (Rp ${w.price.toLocaleString("id-ID")})`).join("\n");
    const msg = `🎮 Wishlist Rank SkyForge 1.21.8 saya:\n\n${text}\n\nBeli di: ${window.location.origin}/store`;
    navigator.clipboard.writeText(msg);
    setCopied(true);
    toast.success("Link wishlist disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  const totalPrice = wishlist.reduce((sum, w) => sum + w.price, 0);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/store" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Store
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-pink-500/30 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            Wishlist Rank
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Wishlist <span className="gradient-text">Rank Kamu</span>
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Simpan rank yang kamu inginkan dan bagikan ke teman atau orang tua. Cocok untuk hadiah!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add Ranks */}
          <div className="md:col-span-1">
            <h2 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3">Pilih Rank</h2>
            <div className="space-y-2">
              {RANKS.map((rank) => {
                const inWishlist = wishlist.some((w) => w.id === rank.id);
                return (
                  <button
                    key={rank.id}
                    onClick={() => addRank(rank)}
                    disabled={inWishlist}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${inWishlist ? "glass border border-white/8 opacity-50 cursor-default" : "glass border border-white/10 hover:border-white/30 cursor-pointer"}`}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: rank.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white">{rank.name}</div>
                      <div className="text-xs text-white/40">Rp {rank.price.toLocaleString("id-ID")}</div>
                    </div>
                    {inWishlist ? (
                      <Heart className="w-4 h-4 text-pink-400 fill-pink-400 shrink-0" />
                    ) : (
                      <Heart className="w-4 h-4 text-white/20 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wishlist */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white/60 uppercase tracking-wider">Wishlist Saya ({wishlist.length})</h2>
              {wishlist.length > 0 && (
                <Button variant="outline" size="sm" onClick={shareWishlist} className="gap-1.5 text-xs">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copied ? "Tersalin!" : "Bagikan"}
                </Button>
              )}
            </div>

            {wishlist.length === 0 ? (
              <div className="glass border border-white/10 rounded-2xl py-16 text-center">
                <Heart className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-white/40 text-sm">Wishlist kamu masih kosong</p>
                <p className="text-white/25 text-xs mt-1">Tambahkan rank dari menu sebelah kiri</p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {wishlist.map((item) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <Card className="border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + "20", border: `1px solid ${item.color}40` }}>
                              <span className="font-black text-sm" style={{ color: item.color }}>{item.name[0]}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-black text-white">{item.name}</span>
                                <span className="text-xs font-semibold text-yellow-400">Rp {item.price.toLocaleString("id-ID")}</span>
                              </div>
                              <div className="text-xs text-white/40 mt-0.5">Ditambahkan {new Date(item.addedAt).toLocaleDateString("id-ID")}</div>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.perks.slice(0, 3).map((perk) => (
                              <span key={perk} className="text-[10px] text-white/50 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">{perk}</span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Username Minecraft (opsional)"
                              value={targetName[item.id] ?? item.targetUsername ?? ""}
                              onChange={(e) => updateTarget(item.id, e.target.value)}
                              className="flex-1 px-3 py-1.5 rounded-lg glass border border-white/10 bg-transparent text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-sky-500/40"
                            />
                            <a href={`https://wa.me/message/BPHTIEBSHUBIF1?text=${encodeURIComponent(`Halo, saya ingin beli rank ${item.name} untuk username: ${targetName[item.id] || "..."} di SkyForge 1.21.8. Harga: Rp ${item.price.toLocaleString("id-ID")}`)}`} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="gold" className="gap-1.5 text-xs whitespace-nowrap">
                                <ShoppingBag className="w-3.5 h-3.5" />
                                Beli
                              </Button>
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Total */}
                <div className="glass border border-yellow-500/20 rounded-2xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/40">Total Wishlist</div>
                    <div className="text-xl font-black text-yellow-400">Rp {totalPrice.toLocaleString("id-ID")}</div>
                  </div>
                  <Button variant="gold" onClick={shareWishlist} className="gap-2">
                    <Copy className="w-4 h-4" />
                    Salin Wishlist
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
