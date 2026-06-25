"use client";
import React, { useState } from "react";
import { Search, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRankBadgeStyle, formatPlaytime, formatNumber } from "@/lib/utils";

interface PlayerData {
  uuid: string;
  username: string;
  skinUrl: string;
  headUrl: string;
  profile?: {
    rank: string;
    balance: number;
    islandName?: string;
    islandLevel: number;
    islandValue: number;
    skillLevel: number;
    playtime: number;
    voteCount: number;
    achievements: number;
    isOnline: boolean;
    stats?: {
      blocksPlaced: number;
      blocksBroken: number;
      mobsKilled: number;
      deaths: number;
      questsCompleted: number;
      dungeonsCleared: number;
      prestige: number;
    };
  };
}

export default function PlayerSearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setPlayer(null);
    try {
      const res = await fetch(`/api/player/${encodeURIComponent(query.trim())}`);
      if (!res.ok) throw new Error("Player not found");
      const data = await res.json();
      setPlayer(data);
    } catch {
      setError("Player not found. Make sure the username is correct.");
    } finally {
      setLoading(false);
    }
  };

  const stats = player?.profile ? [
    { label: "Rank", value: <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getRankBadgeStyle(player.profile.rank)}`}>{player.profile.rank}</span> },
    { label: "Balance", value: `${formatNumber(player.profile.balance)} coins` },
    { label: "Island", value: player.profile.islandName ?? "No island" },
    { label: "Island Level", value: `Level ${player.profile.islandLevel}` },
    { label: "Island Value", value: `${formatNumber(player.profile.islandValue)} coins` },
    { label: "Skill Level", value: `Level ${player.profile.skillLevel}` },
    { label: "Playtime", value: formatPlaytime(player.profile.playtime) },
    { label: "Votes", value: `${player.profile.voteCount} votes` },
    { label: "Achievements", value: `${player.profile.achievements} unlocked` },
    { label: "Status", value: player.profile.isOnline ? <span className="text-green-400">● Online</span> : <span className="text-white/40">● Offline</span> },
  ] : [];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <User className="w-3.5 h-3.5" />
            Player Lookup
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Find a <span className="gradient-text">Player</span>
          </h1>
          <p className="text-white/60">Cari profil pemain SkyForge berdasarkan username Minecraft.</p>
        </div>

        {/* Search bar */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="Enter Minecraft username..."
                className="pl-9"
              />
            </div>
            <Button onClick={search} disabled={loading || !query.trim()}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <Card className="border-red-500/20 bg-red-500/5 max-w-lg mx-auto mb-8">
            <CardContent className="p-4 text-center text-red-400 text-sm">{error}</CardContent>
          </Card>
        )}

        {/* Player Profile */}
        {player && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skin */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={player.skinUrl}
                  alt={`${player.username} skin`}
                  className="w-32 h-64 object-contain drop-shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-black text-white">{player.username}</h2>
                <code className="text-xs text-white/40 block mt-1 break-all">{player.uuid}</code>
              </div>
            </div>

            {/* Stats */}
            <div className="md:col-span-2">
              <Card className="border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Player Stats</h3>
                  {player.profile ? (
                    <div className="grid grid-cols-2 gap-3">
                      {stats.map(({ label, value }) => (
                        <div key={label} className="glass rounded-xl p-3">
                          <div className="text-xs text-white/40 mb-1">{label}</div>
                          <div className="text-sm font-bold text-white">{value}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/50 text-sm">This player has not joined SkyForge yet.</p>
                      <p className="text-white/30 text-xs mt-1">Join at play.skyforge.id to create your profile!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {player.profile?.stats && (
                <Card className="border-white/10 mt-4">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Combat & Activity</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "Blocks Placed", value: formatNumber(player.profile.stats.blocksPlaced) },
                        { label: "Blocks Broken", value: formatNumber(player.profile.stats.blocksBroken) },
                        { label: "Mobs Killed", value: formatNumber(player.profile.stats.mobsKilled) },
                        { label: "Deaths", value: player.profile.stats.deaths },
                        { label: "Quests Done", value: player.profile.stats.questsCompleted },
                        { label: "Dungeons", value: player.profile.stats.dungeonsCleared },
                        { label: "Prestige", value: player.profile.stats.prestige },
                      ].map(({ label, value }) => (
                        <div key={label} className="glass rounded-xl p-3 text-center">
                          <div className="text-lg font-black text-sky-400">{value}</div>
                          <div className="text-xs text-white/40">{label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!player && !loading && !error && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-2xl glass border border-white/10 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white/20" />
            </div>
            <p className="text-white/40">Enter a Minecraft username to search for a player profile.</p>
          </div>
        )}
      </div>
    </div>
  );
}
