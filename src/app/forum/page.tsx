"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Pin, Lock, Eye, Clock, Plus, Search, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Thread {
  id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  authorUUID: string | null;
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = ["Semua", "Pengumuman", "Tips & Tricks", "Guide", "Showcase", "Trading", "Bug Report", "General"];

const CATEGORY_COLORS: Record<string, string> = {
  "Pengumuman": "text-red-400 bg-red-400/10 border-red-400/20",
  "Tips & Tricks": "text-sky-400 bg-sky-400/10 border-sky-400/20",
  "Guide": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Showcase": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Trading": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Bug Report": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "General": "text-white/50 bg-white/5 border-white/10",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

export default function ForumPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [showNewThread, setShowNewThread] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", category: "General", authorName: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchThreads = async (cat?: string) => {
    setLoading(true);
    const url = cat && cat !== "Semua" ? `/api/forum?category=${encodeURIComponent(cat)}` : "/api/forum";
    const res = await fetch(url);
    const data = await res.json();
    setThreads(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchThreads(activeCategory); }, [activeCategory]);

  const filtered = search
    ? threads.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.authorName.toLowerCase().includes(search.toLowerCase()))
    : threads;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/forum", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      setShowNewThread(false);
      setForm({ title: "", content: "", category: "General", authorName: "" });
      fetchThreads(activeCategory);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            Forum Komunitas 1.21.8
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Forum <span className="gradient-text">Diskusi</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Diskusi tips, build, trading, dan segala hal tentang SkyForge 1.21.8 bersama komunitas.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              placeholder="Cari thread..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 glass border-white/10 bg-transparent"
            />
          </div>
          <Button onClick={() => setShowNewThread(true)} variant="glow" className="gap-2 shrink-0">
            <Plus className="w-4 h-4" />
            Buat Thread Baru
          </Button>
        </div>

        {/* New Thread Form */}
        {showNewThread && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Card className="border-sky-500/30">
              <CardContent className="p-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-sky-400" />
                  Thread Baru
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input placeholder="Nama Minecraft kamu" value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} required className="glass border-white/10 bg-transparent" />
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2 rounded-lg glass border border-white/10 bg-transparent text-white text-sm">
                      {["General", "Tips & Tricks", "Guide", "Showcase", "Trading", "Bug Report"].map((c) => <option key={c} value={c} className="bg-[#050a14]">{c}</option>)}
                    </select>
                  </div>
                  <Input placeholder="Judul thread" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="glass border-white/10 bg-transparent" />
                  <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={4} placeholder="Isi thread kamu..." className="w-full px-3 py-2 rounded-lg glass border border-white/10 bg-transparent text-white text-sm resize-none focus:outline-none focus:border-sky-500/50 placeholder:text-white/30" />
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowNewThread(false)}>Batal</Button>
                    <Button type="submit" variant="glow" size="sm" disabled={submitting}>{submitting ? "Posting..." : "Post Thread"}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${activeCategory === cat ? "bg-sky-500/20 border border-sky-500/50 text-sky-400" : "glass border border-white/10 text-white/50 hover:text-white"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Threads */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-20 glass rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((thread, i) => (
              <motion.div key={thread.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <Link href={`/forum/${thread.id}`}>
                  <Card className="border-white/8 hover:border-white/20 transition-all duration-200 card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0 mt-0.5">
                          {thread.authorUUID ? (
                            <Image src={`https://crafatar.com/avatars/${thread.authorUUID}?size=36&overlay`} alt={thread.authorName} width={36} height={36} className="w-full h-full object-cover" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/40 text-xs font-bold">{thread.authorName[0]}</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            {thread.isPinned && <Pin className="w-3 h-3 text-yellow-400 shrink-0" />}
                            {thread.isLocked && <Lock className="w-3 h-3 text-white/30 shrink-0" />}
                            <span className="font-semibold text-white text-sm truncate">{thread.title}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[thread.category] ?? CATEGORY_COLORS["General"]}`}>
                              {thread.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-white/40">
                            <span className="font-medium text-white/60">{thread.authorName}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{thread.viewCount}</span>
                            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{thread.replyCount}</span>
                            <span className="flex items-center gap-1 ml-auto"><Clock className="w-3 h-3" />{timeAgo(thread.updatedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-white/40">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Belum ada thread di kategori ini</p>
              </div>
            )}
          </div>
        )}

        {/* Stats bar */}
        <div className="mt-8 flex items-center justify-between glass border border-white/10 rounded-2xl px-5 py-3 text-xs text-white/40">
          <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" />{threads.length} thread aktif</span>
          <span>Forum SkyForge 1.21.8 Edition</span>
        </div>
      </div>
    </div>
  );
}
