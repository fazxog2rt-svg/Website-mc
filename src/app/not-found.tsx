import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050a14]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-sky-500/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-purple-500/8 blur-3xl" />
      </div>

      {/* Falling block animation */}
      <div className="relative mb-8 h-40 flex items-center justify-center">
        <div
          className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-500 to-emerald-700 shadow-2xl border-4 border-green-400/30 animate-fall-bounce"
          style={{
            boxShadow: "inset 2px 2px 0 rgba(255,255,255,0.2), inset -2px -2px 0 rgba(0,0,0,0.3)",
          }}
        >
          {/* Grass block face */}
          <div className="w-full h-4 bg-green-400/60 rounded-t-md" />
        </div>
      </div>

      {/* 404 text — pixelated style */}
      <div className="relative z-10 text-center px-4">
        <h1
          className="text-8xl md:text-9xl font-black mb-2 tracking-widest select-none"
          style={{
            background: "linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.15em",
            textShadow: "none",
            fontFeatureSettings: '"ss01"',
            filter: "drop-shadow(0 0 30px rgba(14,165,233,0.4))",
          }}
        >
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          Oops! Kamu tersesat di Void...
        </h2>

        <p className="text-white/50 max-w-md mx-auto mb-10 text-base leading-relaxed">
          Blok yang kamu cari tidak ditemukan. Mungkin sudah di-grief?
          Coba kembali ke spawn atau laporkan kepada admin.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
              boxShadow: "0 0 20px rgba(14,165,233,0.3)",
            }}
          >
            <span>🏠</span>
            Kembali ke Home
          </Link>

          <a
            href="/report"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <span>🐛</span>
            Laporkan Bug
          </a>
        </div>

        {/* Easter egg */}
        <p className="mt-10 text-xs text-white/20 font-mono">
          Error: VOID_FOUND — island_not_found at block (404, 64, 404)
        </p>
      </div>
    </div>
  );
}
