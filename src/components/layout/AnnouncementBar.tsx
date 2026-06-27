"use client";
import React, { useState, useEffect } from "react";
import { X, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ANNOUNCEMENTS = [
  "🎉 Double XP Weekend aktif sampai Minggu!",
  "⚔️ Season 3 dimulai 1 Juli — siapkan strategimu!",
  "🏆 Event PvP Tournament — hadiah 500.000 SkyCoins!",
  "✨ Update 2.4.0 sudah live — cek changelog!",
];

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("announcement-dismissed");
    if (stored === "true") setDismissed(true);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("announcement-dismissed", "true");
  };

  if (!mounted || dismissed) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-sky-600 to-purple-600 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-9">
          <div className="shrink-0 flex items-center gap-1.5 text-white/80">
            <Megaphone className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 text-center overflow-hidden mx-3 h-9 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-white text-xs font-semibold tracking-wide block"
              >
                {ANNOUNCEMENTS[index]}
              </motion.span>
            </AnimatePresence>
          </div>
          <button
            onClick={handleDismiss}
            className="shrink-0 text-white/80 hover:text-white transition-colors p-0.5 rounded"
            aria-label="Tutup pengumuman"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
