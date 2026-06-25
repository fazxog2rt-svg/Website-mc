import React from "react";
import type { Metadata } from "next";
import { Users, Search, Shield, Ban, Volume2, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Player Management" };

const mockPlayers = [
  { uuid: "uuid-1", username: "StormKing", rank: "MVP+", status: "online", joined: "2024-01-15", playtime: "320h", violations: 0 },
  { uuid: "uuid-2", username: "IsleQueen", rank: "MVP", status: "offline", joined: "2024-02-20", playtime: "280h", violations: 1 },
  { uuid: "uuid-3", username: "NightForge", rank: "VIP+", status: "online", joined: "2024-03-10", playtime: "195h", violations: 0 },
  { uuid: "uuid-4", username: "SkyCraft", rank: "VIP", status: "offline", joined: "2024-04-05", playtime: "150h", violations: 3 },
  { uuid: "uuid-5", username: "DragonMage", rank: "DEFAULT", status: "banned", joined: "2024-05-12", playtime: "45h", violations: 8 },
];

export default function AdminPlayersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">Player Management</h1>
          <p className="text-white/50 text-sm">Manage all registered players.</p>
        </div>
        <div className="text-sm text-white/40">
          Total: <span className="text-white font-bold">15,234</span> players
        </div>
      </div>

      <Card className="border-white/8">
        <CardContent className="p-5">
          <div className="flex gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input placeholder="Search by username or UUID..." className="pl-9" />
            </div>
            <Button variant="outline" size="default">Filter</Button>
          </div>

          <div className="space-y-2">
            {mockPlayers.map((player) => (
              <div key={player.uuid} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <img
                  src={`https://crafatar.com/avatars/${player.uuid}?size=36&overlay`}
                  alt={player.username}
                  className="w-9 h-9 rounded-lg bg-white/5"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">{player.username}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full glass border border-white/10 text-white/60">
                      {player.rank}
                    </span>
                    <Badge
                      variant={player.status === "online" ? "success" : player.status === "banned" ? "destructive" : "secondary"}
                      className="text-[10px]"
                    >
                      {player.status}
                    </Badge>
                    {player.violations > 0 && (
                      <span className="text-[10px] text-red-400">{player.violations} violation{player.violations > 1 ? "s" : ""}</span>
                    )}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">
                    Joined: {player.joined} · Playtime: {player.playtime}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-yellow-400/10 text-yellow-400/50 hover:text-yellow-400 transition-colors" title="Mute">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-orange-400/10 text-orange-400/50 hover:text-orange-400 transition-colors" title="Kick">
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-400/10 text-red-400/50 hover:text-red-400 transition-colors" title="Ban">
                    <Ban className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
