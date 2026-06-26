"use client";
import React, { useState } from "react";
import { Send, CheckCircle, Users, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const timezones = ["WIB (UTC+7)", "WITA (UTC+8)", "WIT (UTC+9)", "Lainnya"];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    minecraftUsername: "",
    discordUsername: "",
    age: "",
    timezone: "",
    experience: "",
    whyJoin: "",
    availability: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: form.age ? parseInt(form.age) : undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim lamaran");
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
          <h2 className="text-3xl font-black text-white mb-3">Lamaran Terkirim!</h2>
          <p className="text-white/60 mb-6">
            Terima kasih telah melamar menjadi staff SkyForge. Tim kami akan meninjau lamaranmu dan menghubungi melalui Discord dalam 3–7 hari kerja.
          </p>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Users className="w-3.5 h-3.5" />
            Staff Application
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Bergabung <span className="gradient-text">Tim Kami</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Tertarik menjadi bagian dari tim staff SkyForge? Isi formulir di bawah ini dan kami akan segera menghubungimu.
          </p>
        </div>

        <Card className="border-white/8">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    Username Minecraft <span className="text-red-400">*</span>
                  </label>
                  <Input
                    name="minecraftUsername"
                    value={form.minecraftUsername}
                    onChange={handleChange}
                    placeholder="SteveBuilder123"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    Username Discord <span className="text-red-400">*</span>
                  </label>
                  <Input
                    name="discordUsername"
                    value={form.discordUsername}
                    onChange={handleChange}
                    placeholder="steve#1234"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    Usia
                  </label>
                  <Input
                    name="age"
                    type="number"
                    min="13"
                    max="99"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="18"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    Timezone
                  </label>
                  <div className="relative">
                    <select
                      name="timezone"
                      value={form.timezone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm appearance-none pr-8 focus:outline-none focus:border-sky-500/50"
                    >
                      <option value="" className="bg-[#0d1526]">Pilih timezone</option>
                      {timezones.map((tz) => (
                        <option key={tz} value={tz} className="bg-[#0d1526]">{tz}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                  Ketersediaan Waktu
                </label>
                <Input
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  placeholder="Contoh: Senin-Jumat 18:00-22:00, Weekend seharian"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                  Pengalaman Staff / Minecraft <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Ceritakan pengalamanmu sebagai staff di server lain atau pengalaman bermain Minecraft..."
                  required
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 resize-none focus:outline-none focus:border-sky-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                  Kenapa Ingin Bergabung? <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="whyJoin"
                  value={form.whyJoin}
                  onChange={handleChange}
                  placeholder="Mengapa kamu ingin menjadi staff SkyForge? Apa yang bisa kamu kontribusikan?"
                  required
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
                variant="glow"
                className="w-full gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? "Mengirim..." : "Kirim Lamaran"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
