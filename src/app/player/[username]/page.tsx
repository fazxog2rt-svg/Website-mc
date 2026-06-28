"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sword, Trophy, Clock, Vote, Star, Shield, Activity, Zap, Mountain, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlayerData {
  uuid: string;
  name: string;
  profile: {
    rank: string;
    balance: number;
    islandName: string | null;
    islandLevel: number;
    islandValue: number;
    skillLevel: number;
    playtime: number;
    voteCount: number;
    achievements: number;
    isOnline: boolean;
    lastSeen: string | null;
    stats?: {
      blocksPlaced: number;
      blocksBroken: number;
      mobsKilled: number;
      deaths: number;
      questsCompleted: number;
      dungeonsCleared: number;
      prestige: number;
    };
  } | null;
}

const RANK_COLORS: Record<string, string> = {
  VIP: "#55ff55",
  VIP_PLUS: "#ffff55",
  MVP: "#55ffff",
  MVP_PLUS: "#ffaa00",
  DEFAULT: "#aaaaaa",
};

const MOCK_PROFILES: Record<string, PlayerData> = {
  stormking: { uuid: "069a79f4-44e9-4726-a5be-fca90e38aaf5", name: "StormKing", profile: { rank: "MVP_PLUS", balance: 12500000, islandName: "Storm Citadel", islandLevel: 487, islandValue: 12500000, skillLevel: 85, playtime: 7200000, voteCount: 342, achievements: 156, isOnline: true, lastSeen: new Date().toISOString(), stats: { blocksPlaced: 1240000, blocksBroken: 980000, mobsKilled: 45200, deaths: 123, questsCompleted: 287, dungeonsCleared: 94, prestige: 3 } } },
  islequeen: { uuid: "853c80ef-3c37-49fd-aa49-938b674adae6", name: "IsleQueen", profile: { rank: "MVP", balance: 9800000, islandName: "Crystal Paradise", islandLevel: 412, islandValue: 9800000, skillLevel: 72, playtime: 5400000, voteCount: 289, achievements: 128, isOnline: false, lastSeen: new Date(Date.now() - 3600000).toISOString(), stats: { blocksPlaced: 890000, blocksBroken: 720000, mobsKilled: 38000, deaths: 198, questsCompleted: 214, dungeonsCleared: 67, prestige: 2 } } },
};

function formatPlaytime(ms: number): string {
  const h = Math.floor(ms / 3600000);
  if (h >= 24) return `${Math.floor(h / 24)} hari ${h % 24} jam`;
  return `${h} jam`;
}

export default function PlayerProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const lowerName = username.toLowerCase();
    if (MOCK_PROFILES[lowerName]) {
      setPlayer(MOCK_PROFILES[lowerName]);
      setLoading(false);
      return;
    }
    fetch(`/api/player/${encodeURIComponent(username)}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setPlayer(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="h-8 w-32 glass rounded-lg animate-pulse mb-8" />
        <div className="h-48 glass rounded-2xl animate-pulse mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 glass rounded-2xl animate-pulse" />)}
        </div>
      </div>
    </div>
  );

  if (notFound || !player) return (
    <div className="min-h-screen py-16 text-center">
      <User className="w-16 h-16 mx-auto text-white/10 mb-4" />
      <p className="text-white/40 text-lg font-semibold">Pemain tidak ditemukan</p>
      <p className="text-white/25 text-sm mt-1 mb-6">Username <span className="text-white/40 font-mono">"{username}"</span> tidak terdaftar di SkyForge</p>
      <Link href="/player"><Badge variant="outline" className="cursor-pointer">Cari Pemain Lain</Badge></Link>
    </div>
  );

  const rankColor = RANK_COLORS[player.profile?.rank ?? "DEFAULT"] ?? "#aaaaaa";
  const profile = player.profile;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/player" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Pencarian
        </Link>

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-white/15 mb-6 overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-sky-900/30 to-purple-900/30 relative">
              <div className="absolute inset-0 bg-grid opacity-20" />
            </div>
            <CardContent className="p-6 -mt-10 relative">
              <div className="flex items-end gap-4 mb-4">
                <div className="relative shrink-0">
                  <Image
                    src={`https://crafatar.com/renders/body/${player.uuid}?size=96&overlay`}
                    alt={player.name}
                    width={80}
                    height={96}
                    className="rounded-2xl border-4 border-[#050a14] shadow-xl"
                    unoptimized
                  />
                  {profile?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#050a14] flex items-center justify-center">
                      <Activity className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div className="pb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-black text-white">{player.name}</h1>
                    {profile?.rank && profile.rank !== "DEFAULT" && (
                      <span className="text-sm font-black px-2 py-0.5 rounded-lg" style={{ color: rankColor, backgroundColor: rankColor + "20", border: `1px solid ${rankColor}40` }}>
                        [{profile.rank.replace("_PLUS", "+")}]
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                    {profile?.isOnline ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Online Sekarang
                      </span>
                    ) : profile?.lastSeen ? (
                      <span>Terakhir online: {new Date(profile.lastSeen).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</span>
                    ) : null}
                    <span className="font-mono text-white/20">{player.uuid.slice(0, 8)}...</span>
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Mountain, label: "Island Level", value: profile ? `Lv. ${profile.islandLevel}` : "—", color: "text-sky-400" },
                  { icon: Trophy, label: "Skill Level", value: profile ? `${profile.skillLevel}` : "—", color: "text-purple-400" },
                  { icon: Vote, label: "Total Votes", value: profile ? `${profile.voteCount}` : "—", color: "text-yellow-400" },
                  { icon: Star, label: "Achievement", value: profile ? `${profile.achievements}` : "—", color: "text-pink-400" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="glass rounded-xl p-3 text-center">
                    <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
                    <div className={`text-sm font-black ${color}`}>{value}</div>
                    <div className="text-[10px] text-white/40">{label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {profile ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Island Info */}
            <Card className="border-white/8">
              <CardContent className="p-5">
                <h2 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-sky-400" />
                  Informasi Island
                </h2>
                <div className="space-y-2.5">
                  {[
                    { label: "Nama Island", value: profile.islandName ?? "Unnamed Island" },
                    { label: "Island Level", value: `Level ${profile.islandLevel}`, valueClass: "text-sky-400" },
                    { label: "Island Value", value: `${profile.islandValue.toLocaleString("id-ID")} SC`, valueClass: "text-yellow-400" },
                    { label: "Balance", value: `${profile.balance.toLocaleString("id-ID")} SC`, valueClass: "text-yellow-400" },
                  ].map(({ label, value, valueClass }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-white/40">{label}</span>
                      <span className={`font-semibold text-white ${valueClass ?? ""}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Stats */}
            <Card className="border-white/8">
              <CardContent className="p-5">
                <h2 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Statistik Waktu
                </h2>
                <div className="space-y-2.5">
                  {[
                    { label: "Total Playtime", value: formatPlaytime(profile.playtime) },
                    { label: "Total Votes", value: profile.voteCount.toString(), valueClass: "text-yellow-400" },
                    { label: "Achievement", value: `${profile.achievements} / 500`, valueClass: "text-pink-400" },
                    { label: "Prestige", value: profile.stats ? `⭐ ${profile.stats.prestige}` : "0", valueClass: "text-yellow-400" },
                  ].map(({ label, value, valueClass }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-white/40">{label}</span>
                      <span className={`font-semibold text-white ${valueClass ?? ""}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Combat Stats */}
            {profile.stats && (
              <Card className="border-white/8">
                <CardContent className="p-5">
                  <h2 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                    <Sword className="w-4 h-4 text-red-400" />
                    Combat & Dungeon
                  </h2>
                  <div className="space-y-2.5">
                    {[
                      { label: "Mob Dibunuh", value: profile.stats.mobsKilled.toLocaleString("id-ID"), valueClass: "text-red-400" },
                      { label: "Total Kematian", value: profile.stats.deaths.toString(), valueClass: "text-white/60" },
                      { label: "Dungeon Selesai", value: profile.stats.dungeonsCleared.toString(), valueClass: "text-purple-400" },
                      { label: "Quest Selesai", value: profile.stats.questsCompleted.toString(), valueClass: "text-emerald-400" },
                    ].map(({ label, value, valueClass }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-white/40">{label}</span>
                        <span className={`font-semibold ${valueClass}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Building Stats */}
            {profile.stats && (
              <Card className="border-white/8">
                <CardContent className="p-5">
                  <h2 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    Building & Farming
                  </h2>
                  <div className="space-y-2.5">
                    {[
                      { label: "Blok Dipasang", value: profile.stats.blocksPlaced.toLocaleString("id-ID"), valueClass: "text-emerald-400" },
                      { label: "Blok Dipecah", value: profile.stats.blocksBroken.toLocaleString("id-ID"), valueClass: "text-orange-400" },
                    ].map(({ label, value, valueClass }) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-white/40">{label}</span>
                        <span className={`font-semibold ${valueClass}`}>{value}</span>
                      </div>
                    ))}
                    <div>
                      <div className="flex justify-between text-xs text-white/40 mb-1.5">
                        <span>Skill Progress</span>
                        <span className="text-purple-400 font-bold">Level {profile.skillLevel}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-sky-500" style={{ width: `${(profile.skillLevel % 10) * 10}%` }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="glass border border-white/10 rounded-2xl py-10 text-center text-white/40">
            <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Pemain ini belum pernah join SkyForge 1.21.8</p>
          </div>
        )}
      </div>
    </div>
  );
}
