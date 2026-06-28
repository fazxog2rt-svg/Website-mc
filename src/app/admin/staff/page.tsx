import React from "react";
import type { Metadata } from "next";
import { Shield, Ticket, Bug, Users, Clock, CheckCircle2, AlertCircle, TrendingUp, MessageSquare, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Staff Dashboard | Admin",
  description: "Dashboard moderasi dan support SkyForge.",
};

const staffStats = [
  { label: "Tiket Aktif", value: 24, sub: "8 urgent", color: "text-orange-400", icon: Ticket },
  { label: "Bug Report Open", value: 12, sub: "3 high severity", color: "text-red-400", icon: Bug },
  { label: "Aplikasi Staff", value: 7, sub: "menunggu review", color: "text-yellow-400", icon: Users },
  { label: "Tiket Selesai (7hr)", value: 143, sub: "+22% dari minggu lalu", color: "text-emerald-400", icon: CheckCircle2 },
];

const recentTickets = [
  { id: "TK-1024", subject: "Rank MVP+ belum aktif setelah bayar", player: "StormKing", priority: "URGENT", status: "OPEN", age: "2j lalu" },
  { id: "TK-1023", subject: "Item hilang setelah server restart", player: "IsleQueen", priority: "HIGH", status: "IN_PROGRESS", age: "3j lalu" },
  { id: "TK-1022", subject: "Tidak bisa masuk ke trial chamber", player: "BreezeRider", priority: "MEDIUM", status: "IN_PROGRESS", age: "5j lalu" },
  { id: "TK-1021", subject: "Bug ekonomi: koin tidak bertambah dari vote", player: "DiamondFarmer", priority: "HIGH", status: "OPEN", age: "6j lalu" },
  { id: "TK-1020", subject: "Pertanyaan tentang cara craft Mace", player: "TrialMaster", priority: "LOW", status: "RESOLVED", age: "8j lalu" },
];

const recentBugs = [
  { id: "BG-287", title: "Wind Charge tidak berfungsi di island orang lain", severity: "MEDIUM", status: "OPEN", version: "1.21.8" },
  { id: "BG-286", title: "Vault Block tidak spawn loot", severity: "HIGH", status: "IN_PROGRESS", version: "1.21.8" },
  { id: "BG-285", title: "Mace fall damage bonus tidak dihitung", severity: "HIGH", status: "RESOLVED", version: "1.21.8" },
  { id: "BG-284", title: "Breeze Rod craft recipe tidak muncul di JEI", severity: "LOW", status: "OPEN", version: "1.21.8" },
];

const staffOnline = [
  { name: "AdminKing", role: "SUPERADMIN", status: "online", lastAction: "Menyelesaikan TK-1019", actionsToday: 23 },
  { name: "ModQueen", role: "MODERATOR", status: "online", lastAction: "Review BG-286", actionsToday: 18 },
  { name: "DevMaster", role: "ADMIN", status: "idle", lastAction: "Deploy update 1.21.8.3", actionsToday: 7 },
  { name: "HelperBoy", role: "MODERATOR", status: "offline", lastAction: "Tutup TK-1017", actionsToday: 12 },
];

const PRIORITY_CONFIG: Record<string, { label: string; color: string }> = {
  URGENT: { label: "Urgent", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  HIGH: { label: "Tinggi", color: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
  MEDIUM: { label: "Sedang", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  LOW: { label: "Rendah", color: "text-white/40 bg-white/5 border-white/10" },
};

const STATUS_COLORS: Record<string, string> = {
  OPEN: "text-yellow-400",
  IN_PROGRESS: "text-sky-400",
  RESOLVED: "text-emerald-400",
  CLOSED: "text-white/30",
};

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Terbuka",
  IN_PROGRESS: "Dikerjakan",
  RESOLVED: "Selesai",
  CLOSED: "Tutup",
};

export default function StaffDashboardPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Staff Dashboard</h1>
            <p className="text-white/40 text-sm">SkyForge 1.21.8 — Panel moderasi & support</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Live Update
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {staffStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-white/8">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-xs text-white/30">{stat.sub}</span>
                  </div>
                  <div className={`text-2xl font-black ${stat.color} mb-0.5`}>{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Ticket Queue */}
          <div className="lg:col-span-2">
            <Card className="border-white/8 h-full">
              <CardContent className="p-5">
                <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-orange-400" />
                  Antrian Tiket
                </h2>
                <div className="space-y-2">
                  {recentTickets.map((ticket) => {
                    const pri = PRIORITY_CONFIG[ticket.priority];
                    return (
                      <div key={ticket.id} className="flex items-center gap-3 p-3 glass rounded-xl">
                        <div className="shrink-0">
                          <div className="text-[10px] font-mono text-white/30">{ticket.id}</div>
                          <div className={`text-[10px] font-bold ${STATUS_COLORS[ticket.status] ?? ""}`}>{STATUS_LABELS[ticket.status]}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-white truncate">{ticket.subject}</div>
                          <div className="text-[10px] text-white/40">{ticket.player} · {ticket.age}</div>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${pri.color}`}>{pri.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Staff Status */}
          <div>
            <Card className="border-white/8 mb-4">
              <CardContent className="p-5">
                <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-400" />
                  Status Staff
                </h2>
                <div className="space-y-3">
                  {staffOnline.map((staff) => (
                    <div key={staff.name} className="flex items-start gap-2.5">
                      <div className="relative mt-0.5">
                        <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                          {staff.name[0]}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#050a14] ${staff.status === "online" ? "bg-emerald-400" : staff.status === "idle" ? "bg-yellow-400" : "bg-white/20"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">{staff.name}</span>
                          <span className="text-[9px] text-white/30">{staff.role}</span>
                        </div>
                        <div className="text-[10px] text-white/40 truncate">{staff.lastAction}</div>
                        <div className="text-[10px] text-sky-400">{staff.actionsToday} aksi hari ini</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Productivity Chart */}
            <Card className="border-white/8">
              <CardContent className="p-5">
                <h2 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Tiket Selesai (7 Hari)
                </h2>
                <div className="flex items-end gap-1.5 h-20">
                  {[18, 22, 15, 28, 24, 31, 25].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-emerald-400/30 rounded-t-sm transition-all" style={{ height: `${(val / 35) * 64}px` }} />
                      <div className="text-[9px] text-white/30">{["S", "M", "S", "R", "K", "J", "S"][i]}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bug Reports */}
        <Card className="border-white/8">
          <CardContent className="p-5">
            <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
              <Bug className="w-4 h-4 text-red-400" />
              Bug Report Aktif — 1.21.8
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-white/35 border-b border-white/8">
                    <th className="text-left py-2 font-semibold">ID</th>
                    <th className="text-left py-2 font-semibold">Judul</th>
                    <th className="text-left py-2 font-semibold">Severity</th>
                    <th className="text-left py-2 font-semibold">Status</th>
                    <th className="text-left py-2 font-semibold">Versi</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBugs.map((bug) => (
                    <tr key={bug.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="py-3 text-white/30 text-xs font-mono">{bug.id}</td>
                      <td className="py-3 text-white text-xs font-semibold">{bug.title}</td>
                      <td className="py-3">
                        <span className={`text-xs font-bold ${PRIORITY_CONFIG[bug.severity]?.color ?? "text-white/40"}`}>
                          {bug.severity}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs font-bold ${STATUS_COLORS[bug.status] ?? "text-white/40"}`}>
                          {STATUS_LABELS[bug.status]}
                        </span>
                      </td>
                      <td className="py-3 text-sky-400 text-xs">{bug.version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
