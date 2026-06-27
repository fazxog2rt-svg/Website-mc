"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Gamepad2, Wrench, ShoppingCart, User } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: FAQItem[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "gameplay",
    label: "Gameplay",
    icon: Gamepad2,
    color: "from-sky-400 to-blue-600",
    items: [
      {
        q: "Versi Minecraft apa yang didukung?",
        a: "SkyForge mendukung Java Edition 1.8 hingga 1.21, serta Bedrock Edition 1.20 ke atas. Kamu bisa bermain dari PC, laptop, bahkan HP (melalui Bedrock Edition).",
      },
      {
        q: "Apakah server ini gratis?",
        a: "Ya! SkyForge sepenuhnya gratis untuk dimainkan. Semua fitur utama — island, dungeon, skill, economy — bisa dinikmati tanpa biaya apapun. Rank premium tersedia untuk yang ingin mendukung server.",
      },
      {
        q: "Bagaimana cara membuat island pertama?",
        a: "Setelah bergabung, ketik perintah /is create di chat. Kamu bisa memilih template island starter, lalu mulai membangun dari sana. Tutorial lengkap tersedia di Wiki kami.",
      },
      {
        q: "Apakah ada reset season? Apakah data saya hilang?",
        a: "Season reset terjadi setiap beberapa bulan. Data item dan island akan direset untuk fairness kompetitif, namun rank berbayar dan beberapa cosmetic permanen tidak akan hilang. Pengumuman reset selalu diberikan minimal 2 minggu sebelumnya.",
      },
    ],
  },
  {
    id: "teknis",
    label: "Teknis",
    icon: Wrench,
    color: "from-green-400 to-emerald-600",
    items: [
      {
        q: "Server lag? Apa yang harus dilakukan?",
        a: "Coba langkah berikut: (1) Ketik /ping untuk cek latensimu. (2) Pastikan koneksi internetmu stabil. (3) Kurangi render distance di pengaturan Minecraft. Jika masalah berlanjut, laporkan di Discord dengan screenshot TPS server.",
      },
      {
        q: "Saya tidak bisa konek ke server, apa yang salah?",
        a: "Pastikan IP yang digunakan benar: basic-1.hexnityhost.my.id dengan port 19986. Untuk Bedrock, gunakan port yang sama. Cek juga status server di halaman Status kami sebelum menghubungi support.",
      },
      {
        q: "Bagaimana cara report bug atau glitch?",
        a: "Laporkan bug melalui halaman Report di website ini, atau buka ticket di Discord kami. Sertakan screenshot/video dan langkah untuk mereproduksi bug. Bug reporter aktif akan mendapatkan reward SkyCoins!",
      },
    ],
  },
  {
    id: "pembelian",
    label: "Pembelian",
    icon: ShoppingCart,
    color: "from-yellow-400 to-amber-600",
    items: [
      {
        q: "Bagaimana cara membeli rank?",
        a: "Pembelian dilakukan melalui WhatsApp admin kami. Klik tombol 'Beli via WhatsApp' di halaman Store, kirim pesan, dan admin akan memandu proses pembayaran. Aktivasi biasanya instan setelah konfirmasi pembayaran.",
      },
      {
        q: "Metode pembayaran apa yang diterima?",
        a: "Kami menerima transfer bank (BCA, Mandiri, BRI, BNI), GoPay, OVO, DANA, ShopeePay, dan QRIS. Semua transaksi dicatat dan aman.",
      },
      {
        q: "Apakah rank bisa refund?",
        a: "Karena sifat produk digital, rank yang sudah diaktifkan tidak bisa di-refund. Pastikan kamu membaca detail rank sebelum membeli. Jika ada masalah teknis dengan aktivasi, hubungi support segera.",
      },
    ],
  },
  {
    id: "akun",
    label: "Akun",
    icon: User,
    color: "from-purple-400 to-violet-600",
    items: [
      {
        q: "Bagaimana cara mendapatkan rank gratis?",
        a: "Ada beberapa cara: (1) Vote setiap hari di /vote untuk mengumpulkan Vote Points dan ditukar rank. (2) Ikuti event dan giveaway rutin di Discord. (3) Daftar sebagai Staff untuk mendapatkan perks eksklusif.",
      },
      {
        q: "Bagaimana cara report pemain lain?",
        a: "Gunakan perintah /report <nama> <alasan> di dalam game, atau buka ticket di Discord dengan bukti screenshot/video. Staff akan menindaklanjuti dalam 24 jam.",
      },
      {
        q: "Apakah data saya aman saat reset season?",
        a: "Data rank berbayar, cosmetic permanen, dan achievement akun tidak direset. Hanya progression in-game (island, inventory, coins) yang direset untuk fairness season baru. Kamu akan diberikan kompensasi berupa bonus item starter.",
      },
      {
        q: "Akun saya kena ban, apa yang harus dilakukan?",
        a: "Jika kamu merasa ban tidak adil, buka ticket banding di Discord kami dalam 7 hari sejak ban. Sertakan username Minecraft, tanggal ban, dan alasan mengapa kamu merasa ban tidak tepat. Ban karena cheat bersifat permanen dan tidak dapat dibanding.",
      },
    ],
  },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {items.map((faq, i) => (
        <div key={i} className="glass rounded-xl border border-white/8 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors duration-200"
          >
            <span className="font-semibold text-sm text-white pr-4 leading-snug">{faq.q}</span>
            <div className="shrink-0 w-6 h-6 rounded-full bg-white/8 flex items-center justify-center">
              {openIndex === i
                ? <Minus className="w-3 h-3 text-sky-400" />
                : <Plus className="w-3 h-3 text-white/60" />
              }
            </div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 text-sm text-white/55 leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("gameplay");
  const active = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Pertanyaan yang <span className="gradient-text">Sering Ditanya</span>
          </h1>
          <p className="text-white/50 max-w-lg mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar SkyForge. Tidak menemukan jawabanmu? Hubungi kami di Discord.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-sky-500/20 border border-sky-500/40 text-sky-300"
                  : "glass border border-white/8 text-white/60 hover:text-white hover:border-white/20"
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active category */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${active.color} flex items-center justify-center`}>
              <active.icon className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-black text-white">{active.label}</h2>
            <span className="text-xs text-white/30 ml-auto">{active.items.length} pertanyaan</span>
          </div>

          <FAQAccordion items={active.items} />
        </motion.div>

        {/* Still need help */}
        <div className="mt-12 glass border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-white/50 text-sm mb-2">Masih belum menemukan jawaban?</p>
          <h3 className="text-lg font-black text-white mb-4">Tanya langsung di Discord kami</h3>
          <a
            href="https://discord.gg/3NAKrYaBgh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 text-white font-semibold text-sm transition-colors duration-200"
          >
            <HelpCircle className="w-4 h-4" />
            Buka Discord Support
          </a>
        </div>
      </div>
    </div>
  );
}
