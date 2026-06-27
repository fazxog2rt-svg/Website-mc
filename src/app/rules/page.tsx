import React from "react";
import type { Metadata } from "next";
import { Shield, AlertTriangle, Gavel, MessageSquare, Coins, Swords } from "lucide-react";

export const metadata: Metadata = {
  title: "Aturan Server",
  description: "Aturan dan ketentuan bermain di SkyForge Minecraft Server.",
};

const ruleCategories = [
  {
    id: "umum",
    icon: Shield,
    title: "Aturan Umum",
    color: "from-sky-400 to-blue-600",
    borderColor: "border-sky-500/30",
    rules: [
      {
        number: 1,
        title: "Hormati Sesama Pemain",
        description: "Bersikap sopan kepada semua pemain. Pelecehan, diskriminasi, dan kata-kata kasar tidak ditoleransi sama sekali.",
        severity: "high",
      },
      {
        number: 2,
        title: "Dilarang Griefing",
        description: "Merusak bangunan atau island milik pemain lain tanpa izin merupakan pelanggaran serius.",
        severity: "high",
      },
      {
        number: 3,
        title: "Dilarang Cheating",
        description: "Penggunaan cheat, hack, exploit, atau bug yang memberikan keuntungan tidak fair akan langsung dikenakan sanksi permanen.",
        severity: "high",
      },
      {
        number: 4,
        title: "Patuhi Keputusan Staff",
        description: "Keputusan staff bersifat final. Jika merasa tidak adil, ajukan banding melalui ticket resmi.",
        severity: "medium",
      },
      {
        number: 5,
        title: "Satu Akun Per Pemain",
        description: "Dilarang memiliki lebih dari satu akun aktif. Alt account untuk farming akan diblokir.",
        severity: "medium",
      },
    ],
  },
  {
    id: "ekonomi",
    icon: Coins,
    title: "Aturan Ekonomi",
    color: "from-yellow-400 to-amber-600",
    borderColor: "border-yellow-500/30",
    rules: [
      {
        number: 1,
        title: "Dilarang Scamming",
        description: "Penipuan dalam transaksi jual beli, trade, atau auction akan dikenakan sanksi berat dan permanen.",
        severity: "high",
      },
      {
        number: 2,
        title: "Harga Wajar di Auction House",
        description: "Dilarang sengaja mempermahal atau memanipulasi harga pasar untuk merugikan pemain lain.",
        severity: "medium",
      },
      {
        number: 3,
        title: "Jual Beli Nyata Dilarang",
        description: "Transaksi item in-game dengan uang nyata (IRL trading) di luar sistem store resmi dilarang keras.",
        severity: "high",
      },
    ],
  },
  {
    id: "pvp",
    icon: Swords,
    title: "Aturan PvP",
    color: "from-red-400 to-rose-600",
    borderColor: "border-red-500/30",
    rules: [
      {
        number: 1,
        title: "PvP Hanya di Zona PvP",
        description: "PvP hanya diperbolehkan di zona yang telah ditentukan: Warzone, Arena, dan Event PvP. Di luar itu dilarang.",
        severity: "medium",
      },
      {
        number: 2,
        title: "Dilarang Kill Farming",
        description: "Membunuh pemain yang sama berulang kali untuk mendapatkan kill count / reward tidak diperbolehkan.",
        severity: "medium",
      },
      {
        number: 3,
        title: "Spawn Killing Dilarang",
        description: "Menyerang pemain yang baru spawn atau baru masuk ke zona PvP dalam hitungan detik adalah pelanggaran.",
        severity: "low",
      },
    ],
  },
  {
    id: "chat",
    icon: MessageSquare,
    title: "Aturan Chat",
    color: "from-purple-400 to-violet-600",
    borderColor: "border-purple-500/30",
    rules: [
      {
        number: 1,
        title: "Gunakan Bahasa yang Sopan",
        description: "Chat server menggunakan Bahasa Indonesia atau Inggris. Kata-kata kasar, SARA, dan konten dewasa dilarang.",
        severity: "medium",
      },
      {
        number: 2,
        title: "Dilarang Spam",
        description: "Mengirim pesan yang sama berulang kali atau flooding chat akan mendapatkan peringatan dan mute.",
        severity: "low",
      },
      {
        number: 3,
        title: "Dilarang Iklan",
        description: "Mempromosikan server lain, produk eksternal, atau layanan jasa tanpa izin admin dilarang keras.",
        severity: "high",
      },
      {
        number: 4,
        title: "Hormati Privasi",
        description: "Dilarang menyebarkan informasi pribadi pemain lain tanpa izin (doxxing).",
        severity: "high",
      },
    ],
  },
];

const sanctions = [
  { offense: "Kata-kata kasar / tidak sopan", punishment: "Peringatan → Mute 1 jam", level: "low" },
  { offense: "Spam chat berulang", punishment: "Mute 6 jam → 24 jam", level: "low" },
  { offense: "Iklan server lain", punishment: "Mute permanen + Warning", level: "medium" },
  { offense: "PvP di luar zona", punishment: "Peringatan → Kick → Temp Ban", level: "medium" },
  { offense: "Scam / penipuan", punishment: "Banned permanen", level: "high" },
  { offense: "Griefing", punishment: "Banned 7-30 hari + rollback", level: "high" },
  { offense: "Cheat / hack", punishment: "Banned permanen", level: "high" },
  { offense: "Alt account farming", punishment: "Banned semua akun", level: "high" },
];

const severityConfig = {
  high: { label: "Berat", className: "bg-red-500/15 text-red-400 border border-red-500/30" },
  medium: { label: "Sedang", className: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30" },
  low: { label: "Ringan", className: "bg-sky-500/15 text-sky-400 border border-sky-500/30" },
};

const sanctionLevelConfig = {
  high: "border-l-red-500/50 bg-red-500/5",
  medium: "border-l-yellow-500/50 bg-yellow-500/5",
  low: "border-l-sky-500/50 bg-sky-500/5",
};

export default function RulesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Shield className="w-3.5 h-3.5" />
            Aturan Server
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Peraturan <span className="gradient-text">SkyForge</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-base leading-relaxed">
            Demi kenyamanan semua pemain, mohon baca dan patuhi aturan berikut. Ketidaktahuan tidak menjadi alasan untuk menghindari sanksi.
          </p>
        </div>

        {/* Rule Categories */}
        <div className="space-y-10 mb-16">
          {ruleCategories.map((category) => (
            <div key={category.id}>
              {/* Category Header */}
              <div className={`flex items-center gap-3 mb-5 pb-3 border-b ${category.borderColor}`}>
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <category.icon className="w-4.5 h-4.5 text-white" />
                </div>
                <h2 className="text-xl font-black text-white">{category.title}</h2>
              </div>

              {/* Rules List */}
              <div className="space-y-3">
                {category.rules.map((rule) => {
                  const sev = severityConfig[rule.severity as keyof typeof severityConfig];
                  return (
                    <div
                      key={rule.number}
                      className="glass border border-white/8 rounded-xl p-5 flex gap-4 hover:border-white/15 transition-colors duration-200"
                    >
                      <div className={`shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white font-black text-sm`}>
                        {rule.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h3 className="font-bold text-white text-sm">{rule.title}</h3>
                          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${sev.className}`}>
                            {sev.label}
                          </span>
                        </div>
                        <p className="text-sm text-white/55 leading-relaxed">{rule.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sanctions Table */}
        <div>
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
              <Gavel className="w-4.5 h-4.5 text-white" />
            </div>
            <h2 className="text-xl font-black text-white">Tabel Sanksi</h2>
          </div>

          <div className="glass border border-white/8 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 text-xs font-bold text-white/40 uppercase tracking-wider px-5 py-3 border-b border-white/5">
              <span>Pelanggaran</span>
              <span>Sanksi</span>
            </div>
            <div className="divide-y divide-white/5">
              {sanctions.map((sanction, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-2 px-5 py-3.5 border-l-2 ${sanctionLevelConfig[sanction.level as keyof typeof sanctionLevelConfig]}`}
                >
                  <span className="text-sm text-white/70">{sanction.offense}</span>
                  <span className="text-sm text-white/50">{sanction.punishment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 glass border border-yellow-500/20 rounded-2xl p-5 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <p className="text-sm text-white/60 leading-relaxed">
            Aturan ini dapat berubah sewaktu-waktu. Pastikan kamu selalu memeriksa halaman ini secara berkala. Pertanyaan? Hubungi staff melalui Discord atau buat support ticket.
          </p>
        </div>
      </div>
    </div>
  );
}
