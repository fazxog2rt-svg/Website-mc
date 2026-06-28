"use client";
import React, { useState } from "react";
import { Bug, Send, CheckCircle, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["Gameplay", "Website", "Economy", "Other"];
const severities = [
  { value: "LOW", label: "Low - Gangguan kecil", color: "text-green-400" },
  { value: "MEDIUM", label: "Medium - Mempengaruhi gameplay", color: "text-yellow-400" },
  { value: "HIGH", label: "High - Bug serius", color: "text-orange-400" },
  { value: "CRITICAL", label: "Critical - Server/data rusak", color: "text-red-400" },
];

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    minecraftUsername: "",
    discordUsername: "",
    category: "",
    title: "",
    description: "",
    stepsToReproduce: "",
    severity: "MEDIUM",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim laporan");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Laporan Terkirim!</h2>
          <p className="text-white/60 mb-4">
            Terima kasih telah melaporkan bug ini. Tim kami akan segera menyelidiki dan memperbaikinya.
          </p>
          <div className="glass border border-white/10 rounded-xl px-4 py-3 mb-6 text-sm text-white/60">
            Gunakan <a href="/report/tracker" className="text-sky-400 hover:underline font-semibold">Bug Tracker</a> untuk memantau status laporan kamu.
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Laporkan Bug Lain
            </Button>
            <a href="/report/tracker">
              <Button variant="glow">Cek Status Laporan</Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Bug className="w-3.5 h-3.5" />
            Bug Report
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Laporkan <span className="gradient-text">Bug</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Temukan bug? Bantu kami memperbaikinya dengan melaporkannya di sini. Laporan yang detail sangat membantu!
          </p>
        </div>

        <Card className="border-white/8">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    Username Minecraft (opsional)
                  </label>
                  <Input
                    name="minecraftUsername"
                    value={form.minecraftUsername}
                    onChange={handleChange}
                    placeholder="StevePlayer"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    Username Discord (opsional)
                  </label>
                  <Input
                    name="discordUsername"
                    value={form.discordUsername}
                    onChange={handleChange}
                    placeholder="steve#1234"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    Kategori <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm appearance-none pr-8 focus:outline-none focus:border-sky-500/50"
                    >
                      <option value="" className="bg-[#0d1526]">Pilih kategori</option>
                      {categories.map((c) => (
                        <option key={c} value={c} className="bg-[#0d1526]">{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    Tingkat Keparahan <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="severity"
                      value={form.severity}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm appearance-none pr-8 focus:outline-none focus:border-sky-500/50"
                    >
                      {severities.map((s) => (
                        <option key={s.value} value={s.value} className="bg-[#0d1526]">{s.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                  Judul Bug <span className="text-red-400">*</span>
                </label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ringkasan singkat bug yang ditemukan"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                  Deskripsi <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Jelaskan bug secara detail: apa yang terjadi, apa yang seharusnya terjadi..."
                  required
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 resize-none focus:outline-none focus:border-sky-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                  Langkah untuk Mereproduksi
                </label>
                <textarea
                  name="stepsToReproduce"
                  value={form.stepsToReproduce}
                  onChange={handleChange}
                  placeholder={"1. Buka menu X\n2. Klik tombol Y\n3. Bug terjadi..."}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 resize-none focus:outline-none focus:border-sky-500/50"
                />
              </div>

              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full gap-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-300"
              >
                <Send className="w-4 h-4" />
                {loading ? "Mengirim..." : "Kirim Laporan Bug"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
