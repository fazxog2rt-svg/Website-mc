import React from "react";
import type { Metadata } from "next";
import { ExternalLink, Gift, Star, Clock, Trophy, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Vote",
  description: "Vote untuk SkyForge dan dapatkan reward eksklusif setiap hari.",
};

const voteSites = [
  { name: "MinecraftServerList.com", url: "https://minecraftserverlist.com", cooldown: "24h", reward: "Vote Key + 500 Coins", votes: 1250, icon: "🏆" },
  { name: "Planet Minecraft", url: "https://planetminecraft.com", cooldown: "24h", reward: "Vote Key + 300 Coins", votes: 980, icon: "🌍" },
  { name: "Minecraft-MP", url: "https://minecraft-mp.com", cooldown: "24h", reward: "Vote Key + 200 Coins", votes: 765, icon: "⚡" },
  { name: "TopMinecraftServers", url: "https://topminecraftservers.org", cooldown: "24h", reward: "Vote Key + 400 Coins", votes: 1100, icon: "⭐" },
  { name: "Minecraft Buzz", url: "https://minecraft.buzz", cooldown: "12h", reward: "500 Coins + XP Boost", votes: 640, icon: "🎯" },
  { name: "Minecraft Servers", url: "https://minecraft-servers.com", cooldown: "24h", reward: "Vote Key + 250 Coins", votes: 890, icon: "🎮" },
];

const voteRewards = [
  { votes: 1, icon: "🎁", title: "Daily Vote", reward: "Vote Key + 500 Coins", color: "text-green-400" },
  { votes: 7, icon: "🔥", title: "7-Day Streak", reward: "Rare Key + 5,000 Coins + XP Boost", color: "text-orange-400" },
  { votes: 30, icon: "👑", title: "30-Day Streak", reward: "Epic Key + Custom Title + 25,000 Coins", color: "text-yellow-400" },
  { votes: 100, icon: "💎", title: "100 Total Votes", reward: "Legendary Key + Exclusive Pet", color: "text-purple-400" },
];

export default function VotePage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Support Server
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Vote & Get <span className="gradient-text">Rewards</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Vote untuk SkyForge setiap hari dan dapatkan reward eksklusif. Semakin sering vote, semakin besar hadiahnya!
          </p>
        </div>

        {/* Vote Rewards Info */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-5 text-center">Vote Rewards</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {voteRewards.map((reward) => (
              <Card key={reward.votes} className="border-white/8 card-hover">
                <CardContent className="p-5 text-center">
                  <div className="text-3xl mb-2">{reward.icon}</div>
                  <div className={`text-sm font-bold mb-1 ${reward.color}`}>{reward.title}</div>
                  <div className="text-xs text-white/50 leading-relaxed">{reward.reward}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vote Sites */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-5 text-center">Vote Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voteSites.map((site, i) => (
              <Card key={site.name} className="border-white/8 card-hover">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{site.icon}</div>
                      <div>
                        <div className="font-bold text-white text-sm">{site.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-1 text-xs text-white/40">
                            <Clock className="w-3 h-3" />
                            {site.cooldown}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-white/40">
                            <Trophy className="w-3 h-3" />
                            {site.votes.toLocaleString()} votes
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="success" className="text-[10px]">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                      <Gift className="w-3 h-3 text-yellow-400" />
                      {site.reward}
                    </div>
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="default" size="sm" className="gap-1.5 text-xs h-7">
                        <ExternalLink className="w-3 h-3" />
                        Vote
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Vote */}
        <div className="glass border border-white/10 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-black text-white mb-3">Cara Vote</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { step: "1", title: "Klik Vote", desc: "Klik tombol Vote pada salah satu site di atas" },
              { step: "2", title: "Masukkan Username", desc: "Masukkan username Minecraft kamu di form yang tersedia" },
              { step: "3", title: "Claim Reward", desc: "Login ke server dan ketik /vote claim untuk mengambil hadiahmu" },
            ].map((step) => (
              <div key={step.step} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center font-black text-white mb-3">
                  {step.step}
                </div>
                <div className="font-bold text-white mb-1 text-sm">{step.title}</div>
                <div className="text-xs text-white/50">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
