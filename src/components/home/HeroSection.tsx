"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Copy, Check, ExternalLink, ChevronDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { useDiscordUrl } from "@/hooks/useDiscordUrl";
import { toast } from "sonner";

const MOTD_MESSAGES = [
  "⚡ Forge Your Island, Build Your Legacy!",
  "🏝️ Custom Skyblock with Epic Progression",
  "🎮 Java 1.8 - 1.21 + Bedrock Support",
  "🏆 Top Indonesia Skyblock Server",
];

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [motdIndex, setMotdIndex] = useState(0);
  const discordUrl = useDiscordUrl();

  useEffect(() => {
    const interval = setInterval(() => {
      setMotdIndex((i) => (i + 1) % MOTD_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const copyIP = () => {
    navigator.clipboard?.writeText(SITE_CONFIG.serverIp);
    setCopied(true);
    toast.success("Server IP copied!", { description: SITE_CONFIG.serverIp });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[#050a14]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-900/20 blur-3xl" />
      </div>

      {/* Floating islands illustration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main island */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20"
        >
          <div className="relative w-64 h-40 md:w-96 md:h-56 opacity-20">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-green-600/40 to-stone-800/40 shadow-2xl" />
            <div className="absolute bottom-0 inset-x-8 h-1/2 rounded-b-3xl bg-gradient-to-b from-stone-700/40 to-stone-900/40" />
          </div>
        </motion.div>

        {/* Small floating islands */}
        {[
          { x: "15%", y: "40%", w: "80px", delay: 0, opacity: 0.15 },
          { x: "80%", y: "35%", w: "60px", delay: 1, opacity: 0.12 },
          { x: "75%", y: "65%", w: "50px", delay: 2, opacity: 0.10 },
          { x: "8%", y: "60%", w: "40px", delay: 0.5, opacity: 0.12 },
        ].map((island, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: island.delay }}
            className="absolute"
            style={{ left: island.x, top: island.y }}
          >
            <div
              className="rounded-2xl bg-gradient-to-b from-green-600/30 to-stone-800/30 shadow-xl"
              style={{ width: island.w, height: `calc(${island.w} * 0.6)`, opacity: island.opacity }}
            />
          </motion.div>
        ))}

        {/* Floating particles / clouds */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: "120%", opacity: [0, 0.3, 0.3, 0] }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear",
            }}
            className="absolute"
            style={{ top: `${20 + i * 10}%` }}
          >
            <div className="w-24 md:w-40 h-6 bg-white/5 rounded-full blur-sm" />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 max-w-5xl text-center pt-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>Server Online</span>
          <span className="text-white/30">•</span>
          <span>Skyblock Premium #1 Indonesia</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-none tracking-tighter"
        >
          <span className="text-white">Sky</span>
          <span className="gradient-text">Forge</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-white/60 mb-3 font-medium"
        >
          Forge Your Island, Build Your Legacy.
        </motion.p>

        {/* MOTD ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-6 mb-10 overflow-hidden"
        >
          <motion.p
            key={motdIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-white/50"
          >
            {MOTD_MESSAGES[motdIndex]}
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <Button
            variant="glow"
            size="xl"
            className="gap-3 text-base"
            onClick={copyIP}
          >
            <Play className="w-5 h-5 fill-white" />
            Play Now
          </Button>

          <Button
            variant="outline"
            size="xl"
            className="gap-3 text-base"
            onClick={copyIP}
          >
            {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            {copied ? "Copied!" : "Copy IP"}
          </Button>

          <a href={discordUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="xl" className="gap-3 text-base bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30">
              <ExternalLink className="w-5 h-5" />
              Discord
            </Button>
          </a>

          <Link href="/store">
            <Button variant="gold" size="xl" className="gap-3 text-base">
              Store
            </Button>
          </Link>
        </motion.div>

        {/* Server IP display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-3 px-6 py-3 glass rounded-2xl border border-white/10 mb-12"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-sky-400" />
            <span className="text-white/60 text-sm">Players Online:</span>
            <span className="text-white font-bold">Loading...</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-white/60 text-sm">IP:</span>
          <code className="text-sky-400 font-mono font-bold text-sm">{SITE_CONFIG.serverIp}</code>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs tracking-wider uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
