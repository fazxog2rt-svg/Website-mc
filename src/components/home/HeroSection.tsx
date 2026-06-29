"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Copy, Check, ExternalLink, ChevronDown, Users, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { useDiscordUrl } from "@/hooks/useDiscordUrl";
import { toast } from "sonner";

const MOTD_MESSAGES = [
  { text: "Forge Your Island, Build Your Legacy", icon: "⚡" },
  { text: "Custom Skyblock with Epic Progression", icon: "🏝️" },
  { text: "Java 1.8–1.21.8 + Bedrock Support", icon: "🎮" },
  { text: "Skyblock Premium #1 Indonesia", icon: "🏆" },
];

const FEATURES = [
  { icon: Zap, label: "Custom Enchants" },
  { icon: Shield, label: "Anti-Cheat" },
  { icon: Users, label: "12k+ Pemain" },
];

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [motdIndex, setMotdIndex] = useState(0);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const discordUrl = useDiscordUrl();

  useEffect(() => {
    const interval = setInterval(() => {
      setMotdIndex((i) => (i + 1) % MOTD_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetch_ = () =>
      fetch("/api/online-players")
        .then((r) => r.json())
        .then((d) => setOnlinePlayers(d.online ?? null))
        .catch(() => null);
    fetch_();
    const t = setInterval(fetch_, 30000);
    return () => clearInterval(t);
  }, []);

  const copyIP = () => {
    navigator.clipboard?.writeText(SITE_CONFIG.serverIp);
    setCopied(true);
    toast.success("IP disalin!", { description: SITE_CONFIG.serverIp });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Aurora background ── */}
      <div className="absolute inset-0 bg-[#050a14]">
        {/* Base grid */}
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Aurora layers */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[10%] w-[70%] h-[60%] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.18) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[5%] left-[20%] w-[60%] h-[40%] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.10) 0%, transparent 70%)" }}
        />

        {/* Stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Floating clouds */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            initial={{ x: "-15%", opacity: 0 }}
            animate={{ x: "115%", opacity: [0, 0.25, 0.25, 0] }}
            transition={{ duration: 20 + i * 4, repeat: Infinity, delay: i * 5, ease: "linear" }}
            className="absolute"
            style={{ top: `${18 + i * 14}%` }}
          >
            <div className="w-32 md:w-56 h-6 bg-white/4 rounded-full blur-xl" />
          </motion.div>
        ))}
      </div>

      {/* ── Floating islands ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 mt-16 opacity-[0.12]"
        >
          <div className="w-72 h-44 md:w-[420px] md:h-60 relative">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-emerald-500/50 to-stone-700/50 shadow-2xl" />
            <div className="absolute bottom-0 inset-x-10 h-1/2 rounded-b-[40px] bg-gradient-to-b from-stone-600/40 to-stone-900/40" />
            {/* Trees */}
            {[20, 40, 60, 78].map((x) => (
              <div key={x} className="absolute bottom-[40%]" style={{ left: `${x}%` }}>
                <div className="w-2 h-6 bg-stone-600/60 mx-auto" />
                <div className="w-8 h-8 rounded-full bg-emerald-600/50 -mt-4 mx-auto" />
              </div>
            ))}
          </div>
        </motion.div>

        {[
          { x: "12%", y: "38%", size: 80, delay: 0 },
          { x: "82%", y: "30%", size: 60, delay: 1.5 },
          { x: "76%", y: "62%", size: 48, delay: 0.8 },
          { x: "6%", y: "58%", size: 40, delay: 2.2 },
          { x: "55%", y: "80%", size: 36, delay: 1 },
        ].map((island, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: island.delay }}
            className="absolute opacity-[0.10]"
            style={{ left: island.x, top: island.y }}
          >
            <div
              className="rounded-2xl bg-gradient-to-b from-emerald-500/40 to-stone-700/40 shadow-xl"
              style={{ width: island.size, height: island.size * 0.55 }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center pt-8">

        {/* Version + Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-7 flex-wrap"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Server Online
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-sky-500/25 bg-sky-500/8 text-sky-400/80 text-xs font-semibold">
            <Zap className="w-3 h-3" />
            Minecraft 1.21.8
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/8 text-purple-400/80 text-xs font-semibold">
            🏆 #1 Indonesia
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 leading-[0.88] tracking-tighter"
        >
          <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">Sky</span>
          <span
            className="gradient-text"
            style={{ filter: "drop-shadow(0 0 32px rgba(56,189,248,0.4))" }}
          >
            Forge
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/55 mb-5 font-medium tracking-wide"
        >
          Forge Your Island, Build Your Legacy.
        </motion.p>

        {/* MOTD ticker — no box, just clean animated text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center justify-center gap-2 mb-10 h-7"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={motdIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2"
            >
              <span className="text-base">{MOTD_MESSAGES[motdIndex].icon}</span>
              <span className="text-sm text-white/45 font-medium">{MOTD_MESSAGES[motdIndex].text}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <Button
            variant="glow"
            size="xl"
            className="gap-2.5 text-base font-bold px-8"
            onClick={copyIP}
          >
            <Play className="w-5 h-5 fill-white" />
            Main Sekarang
          </Button>

          <Button
            variant="outline"
            size="xl"
            className="gap-2.5 text-base"
            onClick={copyIP}
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            {copied ? "Tersalin!" : "Copy IP"}
          </Button>

          <a href={discordUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="xl" className="gap-2.5 text-base bg-indigo-500/15 border border-indigo-500/30 hover:bg-indigo-500/25">
              <ExternalLink className="w-5 h-5" />
              Discord
            </Button>
          </a>

          <Link href="/store">
            <Button variant="gold" size="xl" className="gap-2.5 text-base font-bold">
              🛒 Store
            </Button>
          </Link>
        </motion.div>

        {/* Server info bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="inline-flex flex-wrap items-center justify-center gap-4 px-7 py-4 glass rounded-2xl border border-white/10 mb-14"
          style={{ boxShadow: "0 0 40px rgba(14,165,233,0.06), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/50 text-sm">Online:</span>
            </div>
            <span className="text-white font-bold text-sm">
              {onlinePlayers !== null ? `${onlinePlayers} pemain` : "Memuat…"}
            </span>
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-white/40 text-sm">IP:</span>
            <button onClick={copyIP} className="font-mono text-sky-400 font-bold text-sm hover:text-sky-300 transition-colors">
              {SITE_CONFIG.serverIp}
            </button>
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1 text-xs text-white/35">
                <Icon className="w-3 h-3" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-1.5 text-white/20"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
