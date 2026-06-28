"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Heart, Mountain, Star, Crown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Island {
  id: string;
  ownerUsername: string;
  ownerUUID: string | null;
  islandName: string;
  description: string | null;
  islandLevel: number;
  islandValue: number;
  votes: number;
  isFeatured: boolean;
  month: number;
  year: number;
}

const GRADIENTS = [
  "from-sky-500/30 to-blue-700/30",
  "from-pink-500/30 to-fuchsia-700/30",
  "from-purple-500/30 to-violet-700/30",
  "from-green-500/30 to-emerald-700/30",
  "from-red-500/30 to-orange-700/30",
  "from-cyan-500/30 to-teal-700/30",
  "from-amber-500/30 to-yellow-700/30",
  "from-indigo-500/30 to-blue-800/30",
];

const MONTHS = ["", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

export default function IslandShowcasePage() {
  const [islands, setIslands] = useState<Island[]>([]);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "featured">("all");

  useEffect(() => {
    const stored = localStorage.getItem("island_votes");
    if (stored) setVoted(new Set(JSON.parse(stored)));

    fetch("/api/island-showcase")
      .then((r) => r.json())
      .then((data) => setIslands(Array.isArray(data) ? data : []))
      .catch(() => setIslands([]))
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (id: string) => {
    if (voted.has(id)) {
      toast.error("Kamu sudah vote island ini!");
      return;
    }
    const res = await fetch(`/api/island-showcase/${id}/vote`, { method: "POST" });
    if (res.ok) {
      const newVoted = new Set(voted).add(id);
      setVoted(newVoted);
      localStorage.setItem("island_votes", JSON.stringify([...newVoted]));
      setIslands((prev) => prev.map((isl) => isl.id === id ? { ...isl, votes: isl.votes + 1 } : isl));
      toast.success("Vote berhasil! Terima kasih sudah mendukung island ini.");
    } else if (res.status === 409) {
      toast.error("Kamu sudah vote island ini!");
    } else {
      toast.error("Gagal melakukan vote. Coba lagi.");
    }
  };

  const displayed = filter === "featured" ? islands.filter((i) => i.isFeatured) : islands;
  const top3 = [...islands].sort((a, b) => b.votes - a.votes).slice(0, 3);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Mountain className="w-3.5 h-3.5" />
            Island Showcase 1.21.8
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Island <span className="gradient-text">Showcase</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Vote island terbaik bulan ini! Island dengan vote terbanyak akan mendapat Featured Badge dan hadiah eksklusif.
          </p>
        </div>

        {/* Top 3 Podium */}
        {top3.length >= 3 && (
          <div className="mb-12">
            <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              Top 3 Island Bulan Ini
            </h2>
            <div className="grid grid-cols-3 gap-4 items-end">
              {[top3[1], top3[0], top3[2]].map((island, i) => {
                const rank = [2, 1, 3][i];
                const heights = ["h-36", "h-44", "h-32"];
                const colors = ["text-gray-300", "text-yellow-400", "text-amber-600"];
                return (
                  <motion.div
                    key={island.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="text-center">
                      {island.ownerUUID && (
                        <Image src={`https://crafatar.com/avatars/${island.ownerUUID}?size=48&overlay`} alt={island.ownerUsername} width={48} height={48} className="w-12 h-12 rounded-xl mx-auto mb-1 border-2 border-white/20" unoptimized />
                      )}
                      <div className="text-xs font-bold text-white truncate max-w-[100px]">{island.islandName}</div>
                      <div className="text-[10px] text-white/40">{island.ownerUsername}</div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                        <span className="text-xs font-bold text-pink-400">{island.votes}</span>
                      </div>
                    </div>
                    <div className={`w-full ${heights[i]} glass border border-white/10 rounded-t-2xl flex items-center justify-center`}>
                      <span className={`text-3xl font-black ${colors[i]}`}>#{rank}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${filter === f ? "bg-sky-500/20 border border-sky-500/50 text-sky-400" : "glass border border-white/10 text-white/50 hover:text-white"}`}
            >
              {f === "all" ? "Semua Island" : "Island Unggulan"}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-1.5 text-xs text-white/40">
            <Star className="w-3.5 h-3.5" />
            {MONTHS[6]} 2026
          </div>
        </div>

        {/* Islands Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 glass rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayed.map((island, idx) => (
              <IslandCard
                key={island.id}
                island={island}
                gradient={GRADIENTS[idx % GRADIENTS.length]}
                hasVoted={voted.has(island.id)}
                onVote={() => handleVote(island.id)}
                rank={islands.sort((a, b) => b.votes - a.votes).findIndex((i) => i.id === island.id) + 1}
              />
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-10 glass border border-sky-500/20 rounded-2xl p-6 text-center">
          <TrendingUp className="w-8 h-8 text-sky-400 mx-auto mb-3" />
          <h3 className="text-white font-bold mb-1">Ingin island kamu tampil di sini?</h3>
          <p className="text-white/50 text-sm">Daftarkan island kamu melalui Discord atau hubungi staff di-game. Island terbaik dipilih setiap bulan berdasarkan votes komunitas dan penilaian staff.</p>
        </div>
      </div>
    </div>
  );
}

function IslandCard({ island, gradient, hasVoted, onVote, rank }: {
  island: Island;
  gradient: string;
  hasVoted: boolean;
  onVote: () => void;
  rank: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-white/8 overflow-hidden card-hover group h-full">
        <div className={`h-28 bg-gradient-to-br ${gradient} relative`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Mountain className="w-16 h-16 text-white" />
          </div>
          {island.isFeatured && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-yellow-500/90 text-black text-[10px] font-bold gap-1">
                <Crown className="w-2.5 h-2.5" />
                Unggulan
              </Badge>
            </div>
          )}
          {rank <= 3 && (
            <div className="absolute top-2 right-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black ${rank === 1 ? "bg-yellow-400 text-black" : rank === 2 ? "bg-gray-300 text-black" : "bg-amber-600 text-white"}`}>
                #{rank}
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
              {island.ownerUUID ? (
                <Image src={`https://crafatar.com/avatars/${island.ownerUUID}?size=36&overlay`} alt={island.ownerUsername} width={36} height={36} className="w-full h-full object-cover" unoptimized />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/30 text-xs font-bold">
                  {island.ownerUsername[0]}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-white text-sm truncate">{island.islandName}</div>
              <div className="text-[10px] text-white/40">oleh {island.ownerUsername}</div>
            </div>
          </div>
          <p className="text-xs text-white/50 mb-3 leading-relaxed line-clamp-2">{island.description}</p>
          <div className="grid grid-cols-3 gap-1.5 mb-3 text-center">
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
          <Button
            onClick={onVote}
            disabled={hasVoted}
            size="sm"
            className={`w-full gap-1.5 text-xs h-8 ${hasVoted ? "bg-pink-500/20 border border-pink-500/30 text-pink-400 cursor-default" : "bg-white/8 border border-white/15 text-white hover:bg-pink-500/20 hover:border-pink-500/40 hover:text-pink-400"}`}
          >
            <Heart className={`w-3 h-3 ${hasVoted ? "fill-pink-400" : ""}`} />
            {hasVoted ? "Sudah Vote" : "Vote Island"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
