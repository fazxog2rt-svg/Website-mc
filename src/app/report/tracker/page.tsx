"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bug, Clock, CheckCircle2, AlertCircle, XCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ReportStatus {
  id: string;
  title: string;
  category: string;
  severity: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  OPEN: { label: "Menunggu Tinjau", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  IN_PROGRESS: { label: "Sedang Ditangani", icon: RefreshCw, color: "text-sky-400", bg: "bg-sky-400/10 border-sky-400/20" },
  RESOLVED: { label: "Sudah Diselesaikan", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  CLOSED: { label: "Ditutup", icon: XCircle, color: "text-white/40", bg: "bg-white/5 border-white/10" },
  WONT_FIX: { label: "Tidak Akan Diperbaiki", icon: XCircle, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
};

const SEVERITY_COLORS: Record<string, string> = {
  LOW: "text-green-400",
  MEDIUM: "text-yellow-400",
  HIGH: "text-orange-400",
  CRITICAL: "text-red-400",
};

const DEMO_REPORTS: Record<string, ReportStatus> = {
  "demo-open": { id: "demo-open", title: "Wind Charge tidak berfungsi di island orang lain", category: "Gameplay", severity: "MEDIUM", status: "OPEN", createdAt: "2026-06-21T10:00:00Z", updatedAt: "2026-06-21T10:00:00Z" },
  "demo-wip": { id: "demo-wip", title: "Vault Block tidak spawn loot 1.21.8", category: "Gameplay", severity: "HIGH", status: "IN_PROGRESS", createdAt: "2026-06-20T08:00:00Z", updatedAt: "2026-06-25T14:00:00Z" },
  "demo-done": { id: "demo-done", title: "Mace tidak menghitung fall damage bonus", category: "Gameplay", severity: "HIGH", status: "RESOLVED", createdAt: "2026-06-15T09:00:00Z", updatedAt: "2026-06-22T16:00:00Z" },
};

export default function ReportTrackerPage() {
  const [reportId, setReportId] = useState("");
  const [result, setResult] = useState<ReportStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportId.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    if (DEMO_REPORTS[reportId.trim()]) {
      setResult(DEMO_REPORTS[reportId.trim()]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/report?id=${encodeURIComponent(reportId.trim())}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Laporan tidak ditemukan");
      } else {
        setResult(await res.json());
      }
    } catch {
      setError("Terjadi kesalahan koneksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/report" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Laporan Bug
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Bug className="w-3.5 h-3.5" />
            Bug Tracker
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Cek Status <span className="gradient-text">Laporan</span>
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Masukkan ID laporan yang kamu terima setelah submit bug report untuk melihat status penanganan.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <Input
            placeholder="Masukkan ID laporan (contoh: demo-wip)"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            className="glass border-white/10 bg-transparent"
          />
          <Button type="submit" variant="glow" disabled={loading} className="shrink-0 gap-2">
            <Search className="w-4 h-4" />
            {loading ? "Mencari..." : "Cari"}
          </Button>
        </form>

        {/* Demo hint */}
        <div className="glass border border-white/10 rounded-xl px-4 py-3 mb-6 text-xs text-white/40">
          <p className="font-semibold text-white/50 mb-1">Contoh ID untuk demo:</p>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(DEMO_REPORTS).map((key) => (
              <button key={key} onClick={() => setReportId(key)} className="text-sky-400 hover:underline">
                {key}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="border-red-500/30 bg-red-500/5">
                <CardContent className="p-5 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-white text-sm">Laporan tidak ditemukan</div>
                    <div className="text-xs text-white/50 mt-0.5">{error}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Card className="border-white/15">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="text-xs text-white/40 mb-1 font-mono">#{result.id}</div>
                      <h2 className="text-white font-bold text-lg leading-snug">{result.title}</h2>
                    </div>
                    {(() => {
                      const cfg = STATUS_CONFIG[result.status] ?? STATUS_CONFIG.OPEN;
                      const Icon = cfg.icon;
                      return (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shrink-0 ${cfg.bg} ${cfg.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {cfg.label}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="glass rounded-xl p-3">
                      <div className="text-[10px] text-white/40 mb-1">Kategori</div>
                      <div className="text-sm font-semibold text-white">{result.category}</div>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <div className="text-[10px] text-white/40 mb-1">Severity</div>
                      <div className={`text-sm font-semibold ${SEVERITY_COLORS[result.severity] ?? "text-white"}`}>{result.severity}</div>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <div className="text-[10px] text-white/40 mb-1">Dilaporkan</div>
                      <div className="text-sm font-semibold text-white">{new Date(result.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</div>
                    </div>
                    <div className="glass rounded-xl p-3">
                      <div className="text-[10px] text-white/40 mb-1">Terakhir Update</div>
                      <div className="text-sm font-semibold text-white">{new Date(result.updatedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <div className="text-xs text-white/40 font-semibold mb-3 uppercase tracking-wider">Timeline</div>
                    <div className="space-y-2">
                      {[
                        { status: "Laporan diterima", date: result.createdAt, done: true },
                        { status: "Dalam antrian review", date: result.createdAt, done: result.status !== "OPEN" },
                        { status: "Sedang ditangani tim dev", date: result.updatedAt, done: ["IN_PROGRESS", "RESOLVED", "CLOSED"].includes(result.status) },
                        { status: "Diperbaiki & di-deploy", date: result.updatedAt, done: result.status === "RESOLVED" },
                      ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${step.done ? "bg-emerald-400 border-emerald-400" : "border-white/20"}`} />
                          <span className={`text-xs ${step.done ? "text-white" : "text-white/30"}`}>{step.status}</span>
                          {step.done && <span className="text-[10px] text-white/30 ml-auto">{new Date(step.date).toLocaleDateString("id-ID")}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
