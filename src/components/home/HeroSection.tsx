"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Copy, Check, ExternalLink, ChevronDown, Users, Zap, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { useDiscordUrl } from "@/hooks/useDiscordUrl";
import { toast } from "sonner";

const MOTD_MESSAGES = [
  { text: "Forge Your Island, Build Your Legacy", icon: "⚡" },
  { text: "Custom Skyblock dengan Epic Progression", icon: "🏝️" },
  { text: "Java 1.8–1.21.8 + Bedrock Support", icon: "🎮" },
  { text: "Skyblock Premium #1 Indonesia", icon: "🏆" },
  { text: "Trial Chamber & Mace Enchants Tersedia", icon: "⚔️" },
];

const FEATURES = [
  { icon: Zap,    label: "Custom Enchants" },
  { icon: Shield, label: "Anti-Cheat" },
  { icon: Users,  label: "12k+ Pemain" },
  { icon: Star,   label: "1.21.8 Ready" },
];

const BLOCKS = [
  { x: "8%",  y: "22%", size: 18, color: "emerald", delay: 0 },
  { x: "88%", y: "18%", size: 14, color: "sky",     delay: 0.6 },
  { x: "91%", y: "55%", size: 22, color: "purple",  delay: 1.2 },
  { x: "5%",  y: "65%", size: 16, color: "emerald", delay: 1.8 },
  { x: "14%", y: "80%", size: 12, color: "sky",     delay: 0.9 },
  { x: "80%", y: "78%", size: 18, color: "purple",  delay: 0.3 },
  { x: "50%", y: "88%", size: 10, color: "emerald", delay: 1.5 },
];

const BLOCK_COLORS: Record<string, { bg: string; border: string }> = {
  emerald: { bg: "bg-emerald-500/20", border: "border-emerald-400/30" },
  sky:     { bg: "bg-sky-500/20",     border: "border-sky-400/30" },
  purple:  { bg: "bg-purple-500/20",  border: "border-purple-400/30" },
};

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

      {/* ── Deep space base ── */}
      <div className="absolute inset-0 bg-[#03080f]" />

      {/* ── Dot grid overlay ── */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* ── Static hero radial gradients ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 50% -5%, rgba(14,165,233,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at 15% 40%, rgba(139,92,246,0.15) 0%, transparent 55%),
            radial-gradient(ellipse 55% 45% at 85% 35%, rgba(14,165,233,0.12) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── Animated aurora orbs ── */}
      <motion.div
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.08, 1], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-18%] left-[5%] w-[72%] h-[62%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(14,165,233,0.28) 0%, transparent 68%)", filter: "blur(80px)" }}
      />
      <motion.div
        animate={{ opacity: [0.4, 0.65, 0.4], scale: [1, 1.1, 1], x: [0, -20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[5%] right-[-8%] w-[55%] h-[55%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.25) 0%, transparent 68%)", filter: "blur(90px)" }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[0%] left-[15%] w-[65%] h-[45%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.18) 0%, transparent 68%)", filter: "blur(100px)" }}
      />

      {/* ── Twinkling stars ── */}
      {Array.from({ length: 60 }).map((_, i) => {
        const size = (i % 5 === 0) ? 2.5 : (i % 3 === 0) ? 1.8 : 1.1;
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: size,
              height: size,
              left: `${(i * 1.618 * 37) % 100}%`,
              top: `${(i * 1.618 * 53) % 100}%`,
              boxShadow: size > 2 ? "0 0 4px rgba(255,255,255,0.9)" : "none",
            }}
            animate={{ opacity: [0.05, 0.95, 0.05] }}
            transition={{
              duration: 2.5 + (i % 7) * 0.6,
              repeat: Infinity,
              delay: (i % 11) * 0.45,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* ── Minecraft pixel blocks ── */}
      {BLOCKS.map((b, i) => {
        const colors = BLOCK_COLORS[b.color];
        return (
          <motion.div
            key={`block-${i}`}
            className="absolute pointer-events-none"
            style={{ left: b.x, top: b.y }}
            animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
          >
            <div
              className={`${colors.bg} border ${colors.border} backdrop-blur-sm`}
              style={{
                width: b.size,
                height: b.size,
                borderRadius: 3,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 10px rgba(0,0,0,0.5)",
              }}
            />
          </motion.div>
        );
      })}

      {/* ── Floating clouds ── */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          initial={{ x: "-20%" }}
          animate={{ x: "120%", opacity: [0, 0.18, 0.18, 0] }}
          transition={{ duration: 22 + i * 5, repeat: Infinity, delay: i * 6, ease: "linear" }}
          className="absolute pointer-events-none"
          style={{ top: `${15 + i * 16}%` }}
        >
          <div className="w-40 md:w-64 h-5 bg-white/5 rounded-full blur-2xl" />
        </motion.div>
      ))}

      {/* ── Floating islands ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[28%] opacity-[0.16]"
        >
          <div className="w-80 h-48 md:w-[460px] md:h-64 relative">
            <div className="absolute inset-0 rounded-[44px] bg-gradient-to-b from-emerald-400/60 to-stone-700/60 shadow-2xl" />
            <div className="absolute bottom-0 inset-x-8 h-[52%] rounded-b-[44px] bg-gradient-to-b from-stone-600/50 to-stone-900/50" />
            {[15, 32, 52, 70, 85].map((x) => (
              <div key={x} className="absolute" style={{ left: `${x}%`, bottom: "42%" }}>
                <div className="w-1.5 h-7 bg-stone-500/70 mx-auto" />
                <div className="w-7 h-7 rounded-full bg-emerald-500/60 -mt-4 mx-auto" />
              </div>
            ))}
          </div>
        </motion.div>

        {[
          { x: "10%", y: "36%", w: 90,  delay: 0 },
          { x: "80%", y: "28%", w: 68,  delay: 1.4 },
          { x: "78%", y: "60%", w: 54,  delay: 0.7 },
          { x: "4%",  y: "56%", w: 46,  delay: 2.1 },
          { x: "53%", y: "82%", w: 40,  delay: 0.9 },
        ].map((isl, i) => (
          <motion.div
            key={`isle-${i}`}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5 + i, repeat: Infinity, ease: "easeInOut", delay: isl.delay }}
            className="absolute opacity-[0.14]"
            style={{ left: isl.x, top: isl.y }}
          >
            <div
              className="rounded-2xl bg-gradient-to-b from-emerald-400/50 to-stone-700/50 shadow-lg"
              style={{ width: isl.w, height: isl.w * 0.52 }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center pt-10">

        {/* Status badge pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-8 flex-wrap"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-bold tracking-wide"
               style={{ boxShadow: "0 0 20px rgba(52,211,153,0.12)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  style={{ boxShadow: "0 0 6px rgba(52,211,153,0.9)" }} />
            SERVER ONLINE
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sky-500/12 border border-sky-400/30 text-sky-300/90 text-xs font-bold tracking-wide">
            <Zap className="w-3 h-3 text-sky-400" />
            MINECRAFT 1.21.8
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-yellow-500/12 border border-yellow-400/25 text-yellow-300/85 text-xs font-bold tracking-wide">
            🏆 #1 INDONESIA
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-black leading-[0.85] tracking-tighter mb-5"
          style={{ fontSize: "clamp(5rem, 14vw, 9.5rem)" }}
        >
          <span
            className="text-white"
            style={{ textShadow: "0 0 60px rgba(255,255,255,0.15), 0 2px 0 rgba(0,0,0,0.5)" }}
          >
            Sky
          </span>
          <span
            className="gradient-text"
            style={{ filter: "drop-shadow(0 0 40px rgba(56,189,248,0.55)) drop-shadow(0 0 80px rgba(129,140,248,0.3))" }}
          >
            Forge
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="text-lg md:text-xl text-white/60 mb-5 font-medium tracking-wide"
        >
          Forge Your Island, Build Your Legacy.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-24 h-px mx-auto mb-5 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"
        />

        {/* MOTD ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          className="flex items-center justify-center gap-2 mb-11 h-7"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={motdIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="text-base">{MOTD_MESSAGES[motdIndex].icon}</span>
              <span className="text-sm text-white/50 font-medium">{MOTD_MESSAGES[motdIndex].text}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-11"
        >
          <Button
            variant="glow"
            size="xl"
            className="gap-2.5 text-base font-bold px-9"
            style={{ boxShadow: "0 0 40px rgba(14,165,233,0.35), 0 4px 20px rgba(0,0,0,0.4)" }}
            onClick={copyIP}
          >
            <Play className="w-5 h-5 fill-white" />
            Main Sekarang
          </Button>

          <Button
            variant="outline"
            size="xl"
            className="gap-2.5 text-base border-white/15 hover:border-sky-400/40"
            onClick={copyIP}
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            {copied ? "Tersalin!" : "Copy IP"}
          </Button>

          <a href={discordUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="secondary"
              size="xl"
              className="gap-2.5 text-base bg-indigo-500/12 border border-indigo-400/30 hover:bg-indigo-500/22"
            >
              <ExternalLink className="w-5 h-5" />
              Discord
            </Button>
          </a>

          <Link href="/store">
            <Button
              variant="gold"
              size="xl"
              className="gap-2.5 text-base font-bold"
              style={{ boxShadow: "0 0 30px rgba(234,179,8,0.2)" }}
            >
              🛒 Store
            </Button>
          </Link>
        </motion.div>

        {/* Server info bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
          className="inline-flex flex-wrap items-center justify-center gap-5 px-8 py-4 rounded-2xl mb-16"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 0 50px rgba(14,165,233,0.07), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
              style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }}
            />
            <span className="text-white/45 text-sm">Online:</span>
            <span className="text-white font-bold text-sm">
              {onlinePlayers !== null ? `${onlinePlayers} pemain` : "Memuat…"}
            </span>
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-white/40 text-sm">IP:</span>
            <button
              onClick={copyIP}
              className="font-mono text-sky-400 font-bold text-sm hover:text-sky-300 transition-colors"
              style={{ textShadow: "0 0 12px rgba(56,189,248,0.4)" }}
            >
              {SITE_CONFIG.serverIp}
            </button>
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3.5">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-white/40">
                <Icon className="w-3.5 h-3.5 text-white/30" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col items-center gap-1.5 text-white/20"
        >
          <span className="text-[9px] tracking-[0.25em] uppercase font-semibold">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
