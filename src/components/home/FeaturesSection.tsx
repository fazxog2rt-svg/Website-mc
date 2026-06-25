"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Mountain, Coins, Star, Zap, Shield, Swords, Package,
  Crown, Sparkles
} from "lucide-react";
import type { Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/shared/SectionHeader";

const features = [
  {
    icon: Mountain,
    title: "Custom Islands",
    description: "Buat dan kembangkan pulau unikmu. Upgrade border, level, value, dan warp untuk mengundang pemain lain.",
    color: "from-green-400 to-emerald-600",
    glow: "group-hover:shadow-green-500/20",
    badge: "Core Feature",
  },
  {
    icon: Coins,
    title: "Economy System",
    description: "Auction House, Bazaar real-time, Player Shop, Banking, dan sistem koin yang seimbang.",
    color: "from-yellow-400 to-amber-600",
    glow: "group-hover:shadow-yellow-500/20",
    badge: "Economy",
  },
  {
    icon: Star,
    title: "Skill & Progression",
    description: "8 skill unik dengan Skill Tree, Mastery system, XP, dan Prestige yang memberikan reward eksklusif.",
    color: "from-sky-400 to-blue-600",
    glow: "group-hover:shadow-sky-500/20",
    badge: "Progression",
  },
  {
    icon: Zap,
    title: "Custom Enchants",
    description: "Ratusan enchantment eksklusif yang tidak ada di server lain. Craft kombinasi sempurna untuk charactermu.",
    color: "from-purple-400 to-violet-600",
    glow: "group-hover:shadow-purple-500/20",
    badge: "Custom",
  },
  {
    icon: Shield,
    title: "Epic Dungeons",
    description: "Custom Dungeon dengan Boss Battle yang menantang. Dapatkan loot langka dan cosmetic eksklusif.",
    color: "from-red-400 to-rose-600",
    glow: "group-hover:shadow-red-500/20",
    badge: "Adventure",
  },
  {
    icon: Sparkles,
    title: "Pets & Minions",
    description: "Koleksi puluhan Pet dengan ability unik dan Minion yang bekerja otomatis saat kamu offline.",
    color: "from-pink-400 to-fuchsia-600",
    glow: "group-hover:shadow-pink-500/20",
    badge: "Collection",
  },
  {
    icon: Crown,
    title: "Jobs System",
    description: "6 job berbeda: Miner, Farmer, Fisher, Hunter, Woodcutter, Builder. Dapatkan reward dari aktivitas harian.",
    color: "from-orange-400 to-red-500",
    glow: "group-hover:shadow-orange-500/20",
    badge: "Jobs",
  },
  {
    icon: Package,
    title: "Cosmetics",
    description: "Ratusan Cosmetic: Title, Prefix, Particle, Mount, Capes, dan masih banyak lagi untuk tampil beda.",
    color: "from-cyan-400 to-teal-600",
    glow: "group-hover:shadow-cyan-500/20",
    badge: "Cosmetics",
  },
  {
    icon: Swords,
    title: "Quest System",
    description: "Daily, Weekly, dan Seasonal Quest dengan reward menarik. Event spesial setiap bulan!",
    color: "from-indigo-400 to-blue-600",
    glow: "group-hover:shadow-indigo-500/20",
    badge: "Quests",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] } },
};

export default function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeader
          badge="Gameplay Features"
          title="Everything You Need"
          titleGradient="to Dominate"
          description="SkyForge hadir dengan ratusan fitur eksklusif yang dirancang untuk memberikan pengalaman Skyblock terbaik."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="group card-hover h-full relative overflow-hidden border-white/8 hover:border-white/15">
                {/* Hover glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.color} group-hover:opacity-5`} />

                <CardContent className="p-6">
                  {/* Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 bg-white/5 px-2 py-1 rounded-full">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
