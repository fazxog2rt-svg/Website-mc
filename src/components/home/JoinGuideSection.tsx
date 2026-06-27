"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Copy, Check, Wifi, Swords, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";

const SERVER_IP = `${SITE_CONFIG.serverIp}:${SITE_CONFIG.serverPort}`;

const STEPS = [
  {
    number: "01",
    icon: Download,
    title: "Download Minecraft",
    description: "Java Edition 1.8-1.21 atau Bedrock Edition 1.20+. Dua-duanya didukung penuh di SkyForge.",
    color: "from-sky-400 to-blue-600",
    action: null,
  },
  {
    number: "02",
    icon: Copy,
    title: "Copy Server IP",
    description: SERVER_IP,
    color: "from-purple-400 to-violet-600",
    action: "copy",
  },
  {
    number: "03",
    icon: Wifi,
    title: "Connect ke Server",
    description: "Buka Multiplayer → Add Server → Paste IP → Join Server. Semudah itu!",
    color: "from-green-400 to-emerald-600",
    action: null,
  },
  {
    number: "04",
    icon: Swords,
    title: "Mulai Petualangan",
    description: "Buat island pertamamu dengan /is create dan mulai farming menuju puncak leaderboard!",
    color: "from-yellow-400 to-amber-600",
    action: null,
  },
];

export default function JoinGuideSection() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard?.writeText(SERVER_IP);
    setCopied(true);
    toast.success("Server IP copied!", { description: SERVER_IP });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/3 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeader
          badge="Cara Bergabung"
          title="4 Langkah Mudah"
          titleGradient="Mulai Bermain"
          description="Bergabung ke SkyForge sangat mudah. Ikuti langkah-langkah berikut dan kamu siap bertualang!"
        />

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ top: "2.5rem" }} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex flex-col items-center text-center md:items-center"
              >
                {/* Number + icon */}
                <div className="relative mb-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  {/* Large gradient number behind */}
                  <span className={`absolute -top-3 -right-3 text-4xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-50 leading-none select-none`}>
                    {step.number}
                  </span>
                </div>

                {/* Arrow between steps — desktop */}
                {i < STEPS.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-5 -right-2 text-white/20 w-4 h-4 z-10" />
                )}

                <h3 className="text-base font-black text-white mb-2">{step.title}</h3>

                {step.action === "copy" ? (
                  <div className="w-full">
                    <p className="text-xs text-white/40 mb-2">Klik untuk copy:</p>
                    <button
                      onClick={copyIP}
                      className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 hover:border-sky-500/40 transition-colors duration-200 text-xs font-mono text-sky-400 hover:text-sky-300"
                    >
                      {copied
                        ? <Check className="w-3.5 h-3.5 text-green-400" />
                        : <Copy className="w-3.5 h-3.5" />
                      }
                      <span className="truncate max-w-[140px]">{SERVER_IP}</span>
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 glass border border-sky-500/20 rounded-3xl p-8 text-center"
        >
          <p className="text-white/60 text-sm mb-2">Masih ada pertanyaan?</p>
          <h3 className="text-xl font-black text-white mb-4">Bergabunglah ke Discord kami</h3>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={SITE_CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 text-white font-semibold text-sm transition-colors duration-200"
            >
              <Wifi className="w-4 h-4" />
              Join Discord
            </a>
            <button
              onClick={copyIP}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 hover:border-sky-500/30 text-white/70 hover:text-white font-semibold text-sm transition-all duration-200"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy IP"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
