"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Clock, Trophy, Star, Zap, Shield } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import SectionHeader from "@/components/shared/SectionHeader";

const stats = [
  { icon: Users, label: "Total Players", value: 15000, suffix: "+", color: "text-sky-400", bgColor: "bg-sky-400/10" },
  { icon: Clock, label: "Hours Played", value: 500, suffix: "K+", color: "text-purple-400", bgColor: "bg-purple-400/10" },
  { icon: Trophy, label: "Islands Created", value: 8500, suffix: "+", color: "text-yellow-400", bgColor: "bg-yellow-400/10" },
  { icon: Star, label: "Custom Features", value: 200, suffix: "+", color: "text-green-400", bgColor: "bg-green-400/10" },
  { icon: Zap, label: "Custom Enchants", value: 150, suffix: "+", color: "text-orange-400", bgColor: "bg-orange-400/10" },
  { icon: Shield, label: "Server Uptime", value: 99.8, suffix: "%", color: "text-cyan-400", bgColor: "bg-cyan-400/10", decimals: 1 },
];

export default function StatisticsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-purple-500/5 to-sky-500/5" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative container mx-auto px-4 max-w-6xl">
        <SectionHeader
          badge="Server Statistics"
          title="Numbers That"
          titleGradient="Speak Loudly"
          description="Data real dari server SkyForge yang terus berkembang setiap harinya."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass border border-white/8 rounded-2xl p-6 text-center card-hover group"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-black mb-1 ${stat.color}`}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={(stat as { decimals?: number }).decimals ?? 0}
                />
              </div>
              <p className="text-sm text-white/50 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
