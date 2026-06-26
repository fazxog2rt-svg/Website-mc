import React from "react";
import type { Metadata } from "next";
import { FileText, Bug, Flame, Wrench, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Riwayat pembaruan dan patch notes SkyForge.",
};

type ChangelogType = "UPDATE" | "BUGFIX" | "HOTFIX" | "MAINTENANCE";

interface ChangelogEntry {
  version: string;
  title: string;
  description: string;
  type: ChangelogType;
  changes: string[];
  publishedAt: string;
}

const mockChangelog: ChangelogEntry[] = [
  {
    version: "v2.4.0",
    title: "Season 4 Launch - New Biomes & Dungeons",
    description: "Update besar Season 4 membawa biome baru, dungeon epik, dan sistem pet yang diperbarui.",
    type: "UPDATE",
    publishedAt: "2026-06-20",
    changes: [
      "Tambah 3 biome baru: Crystal Cavern, Volcanic Plains, Mystic Forest",
      "Dungeon baru: The Abyssal Citadel (10-player raid)",
      "Sistem pet diperbarui dengan 15 pet baru",
      "Island border bisa di-expand hingga 500x500",
      "Prestige system Season 4 dengan reward eksklusif",
      "Custom enchant baru: Voidwalker, Thunderstrike, Glacial Surge",
      "Balancing ekonomi Auction House",
    ],
  },
  {
    version: "v2.3.5",
    title: "Perbaikan Bug Kritis Auction House",
    description: "Hotfix untuk bug duplikasi item di Auction House yang mempengaruhi ekonomi server.",
    type: "HOTFIX",
    publishedAt: "2026-06-10",
    changes: [
      "Fix bug duplikasi item saat bid di Auction House",
      "Fix item tidak kembali ke inventaris setelah listing expired",
      "Fix bug coin tidak berkurang saat pembelian instant",
      "Rollback transaksi yang terpengaruh bug duplikasi",
    ],
  },
  {
    version: "v2.3.4",
    title: "Perbaikan & Optimasi Performa",
    description: "Serangkaian perbaikan bug minor dan optimasi server untuk pengalaman bermain yang lebih smooth.",
    type: "BUGFIX",
    publishedAt: "2026-05-28",
    changes: [
      "Fix client disconnect saat buka menu skill tier 5+",
      "Fix pet tidak follow player setelah teleport antar island",
      "Fix quest counter tidak update untuk kill quest mob boss",
      "Fix tampilan leaderboard tidak refresh setelah season reset",
      "Optimasi query database island top, performa +40%",
      "Fix /is warp tidak berfungsi untuk username dengan karakter khusus",
    ],
  },
  {
    version: "v2.3.0",
    title: "Jobs System Overhaul & New Quests",
    description: "Sistem Jobs dirombak total dengan progression baru, reward lebih baik, dan 50+ quest baru.",
    type: "UPDATE",
    publishedAt: "2026-05-15",
    changes: [
      "Jobs system dirombak: level cap dari 50 ke 100",
      "50 quest baru untuk semua job type",
      "Job mastery system: unlock passive bonus setelah max level",
      "Daily job challenge dengan reward bonus",
      "Job party: bonus XP saat bermain dengan player job sama",
      "Tambah 2 job baru: Alchemist dan Enchanter",
      "Fix beberapa bug minor di job XP calculation",
    ],
  },
  {
    version: "v2.2.8",
    title: "Pemeliharaan Server & Update Database",
    description: "Maintenance rutin untuk optimasi database dan pembaruan infrastruktur server.",
    type: "MAINTENANCE",
    publishedAt: "2026-05-01",
    changes: [
      "Migrasi database ke server baru dengan performa lebih tinggi",
      "Update plugin dependencies ke versi terbaru",
      "Optimasi storage untuk data island player lama",
      "Backup system otomatis diperbarui ke interval 6 jam",
      "Monitoring sistem baru untuk deteksi masalah lebih cepat",
    ],
  },
];

const typeConfig: Record<ChangelogType, { label: string; color: string; bg: string; border: string; Icon: React.ElementType }> = {
  UPDATE: {
    label: "Update",
    color: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "border-sky-400/20",
    Icon: FileText,
  },
  BUGFIX: {
    label: "Bugfix",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    Icon: Bug,
  },
  HOTFIX: {
    label: "Hotfix",
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    Icon: Flame,
  },
  MAINTENANCE: {
    label: "Maintenance",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    Icon: Wrench,
  },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <FileText className="w-3.5 h-3.5" />
            Patch Notes
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="gradient-text">Changelog</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Riwayat semua pembaruan, perbaikan bug, dan perubahan pada server SkyForge.
          </p>
        </div>

        <div className="space-y-5">
          {mockChangelog.map((entry) => {
            const cfg = typeConfig[entry.type];
            const { Icon } = cfg;
            return (
              <Card key={entry.version} className="border-white/8 overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-white/8">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${cfg.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white font-black text-lg">{entry.version}</span>
                            <span className={`text-[10px] font-bold ${cfg.color} ${cfg.bg} border ${cfg.border} px-2 py-0.5 rounded-full`}>
                              {cfg.label}
                            </span>
                          </div>
                          <h3 className="text-white/80 font-semibold text-sm mt-0.5">{entry.title}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/40 shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(entry.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                      </div>
                    </div>
                    <p className="text-sm text-white/50 mt-3">{entry.description}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2">
                      {entry.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/65">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${cfg.color.replace("text-", "bg-")} shrink-0`} />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
