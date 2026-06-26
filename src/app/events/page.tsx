import React from "react";
import type { Metadata } from "next";
import { Calendar, Clock, Trophy, Star, Swords, Gift, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Events",
  description: "Kalender event dan turnamen SkyForge.",
};

interface GameEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: "TOURNAMENT" | "SEASONAL" | "SPECIAL" | "DAILY";
  icon: React.ElementType;
  color: string;
  reward: string;
  status: "UPCOMING" | "ACTIVE" | "ENDED";
}

const events: GameEvent[] = [
  {
    id: "1",
    title: "Summer Festival 2026",
    description: "Festival musim panas tahunan dengan event eksklusif, crate spesial, dan kontes build island terbaik. Menangkan hadiah jutaan koin dan item langka!",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    type: "SEASONAL",
    icon: Star,
    color: "from-yellow-400 to-orange-500",
    reward: "Exclusive Summer Pet + 1,000,000 Coins",
    status: "UPCOMING",
  },
  {
    id: "2",
    title: "PvP Tournament Season 4",
    description: "Turnamen PvP 1v1 season 4 dengan bracket system. Daftarkan dirimu dan buktikan kamu yang terkuat di SkyForge!",
    startDate: "2026-06-28",
    endDate: "2026-06-29",
    type: "TOURNAMENT",
    icon: Swords,
    color: "from-red-400 to-rose-600",
    reward: "Champion Title + Legendary Key x10 + 500,000 Coins",
    status: "UPCOMING",
  },
  {
    id: "3",
    title: "Island Build Contest",
    description: "Tunjukkan kreativitasmu! Bangun island terbaik dengan tema 'Peradaban Kuno' dan menangkan hadiah menarik. Voting dilakukan oleh komunitas.",
    startDate: "2026-06-20",
    endDate: "2026-06-30",
    type: "SPECIAL",
    icon: Trophy,
    color: "from-purple-400 to-violet-600",
    reward: "Featured Island Badge + 750,000 Coins + VIP Rank 30 Hari",
    status: "ACTIVE",
  },
  {
    id: "4",
    title: "Double XP Weekend",
    description: "Semua aktivitas memberikan 2x XP selama akhir pekan! Manfaatkan momen ini untuk leveling cepat di semua skill.",
    startDate: "2026-06-21",
    endDate: "2026-06-22",
    type: "SPECIAL",
    icon: Star,
    color: "from-sky-400 to-blue-600",
    reward: "2x XP semua skill + Bonus Daily Reward",
    status: "ENDED",
  },
  {
    id: "5",
    title: "Dungeon Race Challenge",
    description: "Selesaikan dungeon The Abyssal Citadel dalam waktu tercepat bersama party. Top 3 party tercepat mendapatkan hadiah eksklusif.",
    startDate: "2026-06-15",
    endDate: "2026-06-17",
    type: "TOURNAMENT",
    icon: Swords,
    color: "from-emerald-400 to-teal-600",
    reward: "Speed Demon Title + Epic Key x5 + 300,000 Coins",
    status: "ENDED",
  },
  {
    id: "6",
    title: "Economy Marathon",
    description: "Siapa yang bisa mengumpulkan koin terbanyak dalam 48 jam? Gunakan semua cara legal untuk memaksimalkan pendapatanmu!",
    startDate: "2026-06-10",
    endDate: "2026-06-12",
    type: "SPECIAL",
    icon: Gift,
    color: "from-amber-400 to-yellow-600",
    reward: "Rich Player Title + Exclusive Cosmetic + 200,000 Coins",
    status: "ENDED",
  },
];

const statusConfig = {
  UPCOMING: { label: "Segera", variant: "default" as const, dot: "bg-sky-400" },
  ACTIVE: { label: "Berlangsung", variant: "success" as const, dot: "bg-green-400 animate-pulse" },
  ENDED: { label: "Selesai", variant: "secondary" as const, dot: "bg-white/30" },
};

const typeLabels: Record<string, string> = {
  TOURNAMENT: "Turnamen",
  SEASONAL: "Seasonal",
  SPECIAL: "Special",
  DAILY: "Daily",
};

function getDaysUntil(dateStr: string): number {
  const now = new Date("2026-06-26");
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export default function EventsPage() {
  const activeEvents = events.filter((e) => e.status === "ACTIVE");
  const upcomingEvents = events.filter((e) => e.status === "UPCOMING");
  const endedEvents = events.filter((e) => e.status === "ENDED");

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Calendar className="w-3.5 h-3.5" />
            Event Calendar
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Event & <span className="gradient-text">Turnamen</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Ikuti berbagai event seru dan turnamen kompetitif di SkyForge. Raih hadiah eksklusif dan buktikan kemampuanmu!
          </p>
        </div>

        {activeEvents.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Sedang Berlangsung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {upcomingEvents.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              Event Mendatang
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {endedEvents.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white/40 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Event Lalu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 opacity-60">
              {endedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: GameEvent }) {
  const statusCfg = statusConfig[event.status];
  const daysUntil = event.status === "UPCOMING" ? getDaysUntil(event.startDate) : null;
  const Icon = event.icon;

  return (
    <Card className="border-white/8 card-hover overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-white font-bold text-sm leading-snug">{event.title}</h3>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-semibold text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                {typeLabels[event.type]}
              </span>
              <div className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                <span className="text-[10px] font-semibold text-white/50">{statusCfg.label}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/55 mb-4 leading-relaxed">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>
              {new Date(event.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
              {" – "}
              {new Date(event.endDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-yellow-400/80">
            <Trophy className="w-3.5 h-3.5 shrink-0" />
            <span>{event.reward}</span>
          </div>
        </div>

        {daysUntil !== null && (
          <div className="glass border border-sky-500/20 rounded-xl px-4 py-2 text-center">
            <span className="text-sky-400 font-bold text-sm">Mulai dalam {daysUntil} hari</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
