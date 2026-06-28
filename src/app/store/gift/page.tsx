"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, ArrowLeft, User, ShoppingBag, Check, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { RANKS } from "@/lib/constants";

const GIFT_MESSAGES = [
  "Selamat ulang tahun! Nikmati rank barumu di SkyForge 🎂",
  "Hadiah spesial untukmu, semoga menyenangkan! 🎁",
  "Terus semangat main SkyForge! 🏝️",
  "Jadikan hari-harimu lebih seru di SkyForge! ⚡",
];

export default function GiftRankPage() {
  const [selectedRank, setSelectedRank] = useState<typeof RANKS[number] | null>(null);
  const [recipientUsername, setRecipientUsername] = useState("");
  const [senderName, setSenderName] = useState("");
  const [giftMessage, setGiftMessage] = useState(GIFT_MESSAGES[0]);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleProceed = () => {
    if (!selectedRank) { toast.error("Pilih rank terlebih dahulu"); return; }
    if (!recipientUsername.trim()) { toast.error("Masukkan username penerima"); return; }
    setStep(2);
  };

  const handleConfirm = () => {
    setStep(3);
  };

  const waMessage = encodeURIComponent(
    `Halo admin SkyForge, saya ingin membeli *Gift Rank ${selectedRank?.name}* untuk pemain berikut:\n\n` +
    `👤 Penerima: ${recipientUsername}\n` +
    `👤 Pengirim: ${senderName || "Anonim"}\n` +
    `💬 Pesan: "${giftMessage}"\n` +
    `💰 Harga: Rp ${selectedRank?.price.toLocaleString("id-ID")}\n\n` +
    `Server: SkyForge 1.21.8`
  );

  if (step === 3) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-green-400/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Gift Siap Dikirim!</h1>
            <p className="text-white/60 text-sm mb-6">Selesaikan pembelian via WhatsApp admin untuk mengirim hadiah rank <span className="text-yellow-400 font-bold">{selectedRank?.name}</span> ke <span className="text-sky-400 font-bold">{recipientUsername}</span>.</p>
            <a href={`https://wa.me/message/BPHTIEBSHUBIF1?text=${waMessage}`} target="_blank" rel="noopener noreferrer" className="block mb-4">
              <Button variant="gold" size="xl" className="w-full gap-2 text-base">
                <ShoppingBag className="w-5 h-5" />
                Bayar via WhatsApp
              </Button>
            </a>
            <Button variant="outline" onClick={() => { setStep(1); setSelectedRank(null); setRecipientUsername(""); setSenderName(""); }} className="w-full">
              Kirim Gift Lain
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/store" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Store
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Gift className="w-3.5 h-3.5" />
            Gift Rank 1.21.8
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Hadiah <span className="gradient-text">Rank</span> untuk Teman
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Hadiahkan rank SkyForge kepada teman, saudara, atau siapa saja. Pengiriman otomatis setelah pembayaran dikonfirmasi.
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? "bg-sky-500 text-white" : "glass border border-white/20 text-white/30"}`}>{s}</div>
              {s < 2 && <div className={`w-12 h-px transition-all ${step > s ? "bg-sky-500" : "bg-white/10"}`} />}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rank Selection */}
              <div>
                <h2 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3">1. Pilih Rank</h2>
                <div className="space-y-2">
                  {RANKS.map((rank) => (
                    <button
                      key={rank.id}
                      onClick={() => setSelectedRank(rank)}
                      className={`w-full flex items-start gap-3 p-4 rounded-xl transition-all text-left border ${selectedRank?.id === rank.id ? "border-white/30 bg-white/8" : "border-white/8 glass hover:border-white/20"}`}
                    >
                      <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-black text-sm" style={{ backgroundColor: rank.color + "20", border: `1px solid ${rank.color}40`, color: rank.color }}>
                        {rank.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-white">{rank.name}</span>
                          {selectedRank?.id === rank.id && <Check className="w-3.5 h-3.5 text-green-400" />}
                        </div>
                        <div className="text-yellow-400 text-xs font-bold mb-1">Rp {rank.price.toLocaleString("id-ID")}</div>
                        <div className="flex flex-wrap gap-1">
                          {rank.perks.slice(0, 2).map((p) => <span key={p} className="text-[9px] text-white/40 bg-white/5 px-1.5 py-0.5 rounded-full">{p}</span>)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient */}
              <div>
                <h2 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3">2. Detail Penerima</h2>
                <Card className="border-white/10">
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <label className="text-xs text-white/50 font-semibold mb-1.5 block flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Username Penerima *
                      </label>
                      <Input placeholder="Masukkan username Minecraft" value={recipientUsername} onChange={(e) => setRecipientUsername(e.target.value)} className="glass border-white/10 bg-transparent" />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 font-semibold mb-1.5 block">Nama Pengirim (opsional)</label>
                      <Input placeholder="Nama kamu" value={senderName} onChange={(e) => setSenderName(e.target.value)} className="glass border-white/10 bg-transparent" />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 font-semibold mb-1.5 block flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Pesan Hadiah
                      </label>
                      <div className="space-y-1.5 mb-2">
                        {GIFT_MESSAGES.map((msg) => (
                          <button key={msg} onClick={() => setGiftMessage(msg)} className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-all ${giftMessage === msg ? "bg-sky-500/20 border border-sky-500/30 text-sky-400" : "glass border border-white/8 text-white/50 hover:text-white"}`}>
                            {msg}
                          </button>
                        ))}
                      </div>
                      <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} rows={2} placeholder="Atau tulis pesan sendiri..." className="w-full px-3 py-2 rounded-lg glass border border-white/10 bg-transparent text-xs text-white resize-none focus:outline-none focus:border-sky-500/40 placeholder:text-white/25" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button variant="gold" size="xl" onClick={handleProceed} className="gap-2">
                <Gift className="w-5 h-5" />
                Lanjut ke Konfirmasi
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && selectedRank && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-white/15 max-w-lg mx-auto">
              <CardContent className="p-6">
                <h2 className="text-lg font-black text-white mb-5 text-center">Konfirmasi Gift</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Rank", value: selectedRank.name, valueClass: "font-black" },
                    { label: "Penerima", value: recipientUsername, valueClass: "text-sky-400 font-bold" },
                    { label: "Pengirim", value: senderName || "Anonim" },
                    { label: "Pesan", value: giftMessage, valueClass: "text-white/60 italic text-xs" },
                    { label: "Total Harga", value: `Rp ${selectedRank.price.toLocaleString("id-ID")}`, valueClass: "text-yellow-400 font-black text-lg" },
                  ].map(({ label, value, valueClass }) => (
                    <div key={label} className="flex justify-between items-start gap-4 py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/40">{label}</span>
                      <span className={`text-sm text-white text-right ${valueClass ?? ""}`}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Ubah</Button>
                  <Button variant="gold" onClick={handleConfirm} className="flex-1 gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Beli Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
