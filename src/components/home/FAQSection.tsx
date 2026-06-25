"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const faqs = [
  {
    q: "Bagaimana cara bergabung ke SkyForge?",
    a: "Buka Minecraft Java Edition atau Bedrock, tambahkan server dengan IP play.skyforge.id port 25565 (Java) atau 19132 (Bedrock). Versi yang didukung: 1.8 - 1.21.",
  },
  {
    q: "Apakah SkyForge gratis untuk dimainkan?",
    a: "Ya! SkyForge sepenuhnya gratis. Kamu bisa menikmati semua fitur dasar tanpa biaya. Rank dan item premium tersedia di Store untuk mendukung server.",
  },
  {
    q: "Apa yang membuat SkyForge berbeda dari server lain?",
    a: "SkyForge memiliki custom plugin, fitur eksklusif yang tidak ada di server lain, anti-cheat yang ketat, server performance tinggi, dan tim admin yang aktif 24/7.",
  },
  {
    q: "Apakah ada rank gratis?",
    a: "Setiap pemain baru mendapat rank Default. Kamu bisa mendapatkan rank Vote dengan aktif vote, atau membeli rank premium di Store kami.",
  },
  {
    q: "Bagaimana cara mendapatkan SkyCoins?",
    a: "SkyCoins bisa didapatkan dari daily rewards, vote, quest, dungeon, trading di Auction House, atau pembelian langsung via Store.",
  },
  {
    q: "Apakah ada proteksi dari grief/pencurian?",
    a: "Ya! Island di SkyForge dilindungi sepenuhnya. Hanya member yang kamu izinkan yang bisa masuk dan berinteraksi dengan islandmu.",
  },
  {
    q: "Berapa ukuran island yang diberikan?",
    a: "Island default berukuran 100x100 blok. Bisa diupgrade menggunakan Island Upgrades hingga 500x500 blok untuk rank tertinggi.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Data pemain di-backup setiap hari. Jika ada masalah, hubungi tim support kami melalui Discord atau Submit Ticket di website.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked"
          titleGradient="Questions"
          description="Temukan jawaban untuk pertanyaan umum seputar SkyForge."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="glass rounded-2xl border border-white/8 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-white hover:bg-white/5 transition-colors duration-200"
                >
                  <span className="font-semibold text-sm pr-4">{faq.q}</span>
                  <div className="shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    {openIndex === i ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
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
                      <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
