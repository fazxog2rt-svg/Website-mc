"use client";
import React, { useState } from "react";
import { Trophy, Crown, Star, Coins, Clock, Vote, Mountain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatNumber, formatPlaytime, getRankBadgeStyle } from "@/lib/utils";

const mockLeaderboard = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  uuid: `uuid-${i}`,
  username: ["StormKing", "IsleQueen", "NightForge", "SkyCraft", "DragonMage", "IronFist", "MoonRider", "StarBreaker", "WildHunter", "GoldMiner"][i],
  rankTitle: ["MVP+", "MVP", "VIP+", "VIP", "MVP+", "MVP", "VIP+", "VIP", "DEFAULT", "DEFAULT"][i],
  balance: (10000000 - i * 800000),
  islandLevel: (100 - i * 8),
  islandValue: (500000 - i * 40000),
  skillLevel: (95 - i * 7),
  voteCount: (500 - i * 40),
  playtime: (50000 - i * 4000),
  isOnline: i < 3,
}));

const leaderboardTypes = [
  { id: "islandValue", label: "Island Value", icon: Mountain, format: (v: number) => `${formatNumber(v)} coins` },
  { id: "balance", label: "Richest", icon: Coins, format: (v: number) => `${formatNumber(v)} coins` },
  { id: "islandLevel", label: "Island Level", icon: Star, format: (v: number) => `Level ${v}` },
  { id: "skillLevel", label: "Skill Level", icon: Crown, format: (v: number) => `Level ${v}` },
  { id: "voteCount", label: "Top Voters", icon: Vote, format: (v: number) => `${v} votes` },
  { id: "playtime", label: "Playtime", icon: Clock, format: (v: number) => formatPlaytime(v) },
];

function LeaderboardTable({ type }: { type: typeof leaderboardTypes[0] }) {
  return (
    <div className="space-y-2">
      {mockLeaderboard.map((player, i) => (
        <div
          key={player.uuid}
          className={`flex items-center gap-4 p-4 rounded-2xl glass border transition-all duration-200 hover:border-white/20 ${
            i === 0 ? "border-yellow-500/30 bg-yellow-500/5" :
            i === 1 ? "border-gray-400/30 bg-gray-400/5" :
            i === 2 ? "border-amber-600/30 bg-amber-600/5" :
            "border-white/8"
          }`}
        >
          {/* Rank number */}
          <div className={`w-8 text-center font-black text-lg shrink-0 ${
            i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : i === 2 ? "text-amber-500" : "text-white/30"
          }`}>
            {i < 3 ? ["🥇","🥈","🥉"][i] : `#${player.rank}`}
          </div>

          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={`https://crafatar.com/avatars/${player.uuid}?size=40&overlay`}
              alt={player.username}
              width={40}
              height={40}
              className="rounded-xl w-10 h-10 bg-white/5"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${player.username}&background=0ea5e9&color=fff&size=40`;
              }}
            />
            {player.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#050a14]" />
            )}
          </div>

          {/* Player info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white text-sm truncate">{player.username}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${getRankBadgeStyle(player.rankTitle)}`}>
                {player.rankTitle}
              </span>
            </div>
          </div>

          {/* Value */}
          <div className="text-right shrink-0">
            <div className="font-black text-white text-sm">
              {type.format((player as any)[type.id])}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("islandValue");

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Trophy className="w-3.5 h-3.5" />
            Realtime Leaderboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Top <span className="gradient-text-gold">Players</span>
          </h1>
          <p className="text-white/60">Rankings diperbarui secara real-time setiap 60 detik.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap h-auto gap-1 mb-8 p-1.5">
            {leaderboardTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="gap-1.5 text-xs">
                <type.icon className="w-3.5 h-3.5" />
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {leaderboardTypes.map((type) => (
            <TabsContent key={type.id} value={type.id}>
              <LeaderboardTable type={type} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
