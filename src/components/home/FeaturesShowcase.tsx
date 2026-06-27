"use client";
import React from "react";
import { motion } from "framer-motion";
import { Coins, Swords, Zap, Package, Crown, Mountain } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

export default function FeaturesShowcase() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader
          badge="Keunggulan"
          title="Kenapa Main di"
          titleGradient="SkyForge?"
          description="Bukan sekadar Skyblock biasa — SkyForge punya ekosistem tersendiri yang terus berkembang setiap season."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 relative overflow-hidden rounded-2xl glass border border-white/10 p-6 min-h-[220px] hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-40 h-28 opacity-30 float-animation">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-green-500/60 to-stone-700/60 shadow-xl" />
                <div className="absolute bottom-0 inset-x-6 h-1/2 rounded-b-2xl bg-gradient-to-b from-stone-600/60 to-stone-900/60" />
                <div className="absolute top-2 left-8 w-4 h-8 rounded-t-full bg-green-600/70" />
                <div className="absolute top-2 left-14 w-3 h-6 rounded-t-full bg-green-700/60" />
              </div>
              <div className="absolute -bottom-4 -left-8 w-14 h-8 rounded-xl bg-gradient-to-b from-green-500/40 to-stone-700/40 float-animation-slow opacity-20" />
              <div className="absolute -top-6 right-2 w-10 h-6 rounded-xl bg-gradient-to-b from-green-600/30 to-stone-800/30 float-animation-fast opacity-20" />
            </div>
            <div className="relative z-10 max-w-xs">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Custom Island System</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                Bangun pulau impianmu dari awal. Upgrade border, unlock biome baru, buat warp publik, dan bersaing di leaderboard island terkaya.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Economy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl glass border border-white/10 p-6 hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Economy & Trading</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                Auction House real-time, Bazaar dengan grafik harga, Player Shop, dan sistem banking. Jadilah sultan di SkyForge!
              </p>
            </div>
          </motion.div>

          {/* Dungeon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative overflow-hidden rounded-2xl glass border border-white/10 p-6 hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Swords className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Dungeon & Boss</h3>
              <p className="text-sm text-white/55 leading-relaxed">
                Dungeon multi-floor dengan boss battle epik. Dapatkan gear langka dan cosmetic eksklusif yang tidak bisa dibeli.
              </p>
            </div>
          </motion.div>

          {/* Custom Enchants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl glass border border-white/10 p-5 hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center shrink-0 shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-white mb-1">50+ Custom Enchants</h3>
                <p className="text-xs text-white/50">Enchantment eksklusif yang tidak ada di tempat lain</p>
              </div>
            </div>
          </motion.div>

          {/* Pets & Minions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative overflow-hidden rounded-2xl glass border border-white/10 p-5 hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-fuchsia-600 flex items-center justify-center shrink-0 shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-white mb-1">Pet & Minion System</h3>
                <p className="text-xs text-white/50">Ratusan pet unik yang bekerja bahkan saat offline</p>
              </div>
            </div>
          </motion.div>

          {/* Season Pass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl glass border border-sky-500/20 p-5 hover:-translate-y-1 transition-transform duration-300 group"
          >
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-sky-400 to-purple-400" />
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center shrink-0 shadow-lg">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-white">Season Pass</h3>
                  <span className="text-[10px] font-black text-sky-400 bg-sky-400/10 border border-sky-400/30 px-1.5 py-0.5 rounded-full">SEASON 3</span>
                </div>
                <p className="text-xs text-white/50">Reward eksklusif setiap season baru yang tidak bisa dilewatkan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
