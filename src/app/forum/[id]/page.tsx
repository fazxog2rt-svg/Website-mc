"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquare, ArrowLeft, Lock, Pin, Eye, Clock, Shield, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Reply {
  id: string;
  threadId: string;
  content: string;
  authorName: string;
  authorUUID: string | null;
  isStaff: boolean;
  createdAt: string;
}

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
  createdAt: string;
  replies: Reply[];
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

function Avatar({ name, uuid }: { name: string; uuid: string | null }) {
  if (uuid) return (
    <Image src={`https://crafatar.com/avatars/${uuid}?size=40&overlay`} alt={name} width={40} height={40} className="w-10 h-10 rounded-xl border border-white/10" unoptimized />
  );
  return (
    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 font-bold">
      {name[0]?.toUpperCase()}
    </div>
  );
}

export default function ForumThreadPage() {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyForm, setReplyForm] = useState({ content: "", authorName: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/forum/${id}`)
      .then((r) => r.json())
      .then((data) => setThread(data))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (thread?.isLocked) return;
    setSubmitting(true);
    const res = await fetch(`/api/forum/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(replyForm),
    });
    if (res.ok) {
      const newReply = await res.json();
      setThread((prev) => prev ? { ...prev, replies: [...prev.replies, newReply] } : prev);
      setReplyForm({ content: "", authorName: "" });
      toast.success("Reply berhasil dikirim!");
    } else {
      toast.error("Gagal mengirim reply");
    }
    setSubmitting(false);
  };

  if (loading) return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="h-8 w-32 glass rounded-lg animate-pulse mb-8" />
        <div className="h-48 glass rounded-2xl animate-pulse mb-4" />
        {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-24 glass rounded-2xl animate-pulse mb-3" />)}
      </div>
    </div>
  );

  if (!thread) return (
    <div className="min-h-screen py-16 text-center">
      <p className="text-white/40">Thread tidak ditemukan.</p>
      <Link href="/forum"><Button variant="outline" className="mt-4">Kembali ke Forum</Button></Link>
    </div>
  );

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back */}
        <Link href="/forum" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Forum
        </Link>

        {/* Thread header */}
        <div className="mb-2 flex items-center gap-2 flex-wrap">
          {thread.isPinned && <span className="flex items-center gap-1 text-xs text-yellow-400"><Pin className="w-3 h-3" />Disematkan</span>}
          {thread.isLocked && <span className="flex items-center gap-1 text-xs text-white/40"><Lock className="w-3 h-3" />Terkunci</span>}
          <span className="text-xs text-sky-400 bg-sky-400/10 border border-sky-400/20 px-2 py-0.5 rounded-full">{thread.category}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white mb-6">{thread.title}</h1>

        {/* Original Post */}
        <Card className="border-white/10 mb-4">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <Avatar name={thread.authorName} uuid={thread.authorUUID} />
                <div className="text-[10px] text-center text-white/40 mt-1 font-semibold">{thread.authorName}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{timeAgo(thread.createdAt)}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{thread.viewCount} views</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{thread.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        {thread.replies.length > 0 && (
          <div className="space-y-3 mb-6">
            <h2 className="text-sm font-bold text-white/60 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {thread.replies.length} Balasan
            </h2>
            {thread.replies.map((reply, i) => (
              <motion.div key={reply.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className={`${reply.isStaff ? "border-sky-500/30 bg-sky-500/5" : "border-white/8"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0">
                        <Avatar name={reply.authorName} uuid={reply.authorUUID} />
                        <div className="text-[10px] text-center text-white/40 mt-1 font-semibold truncate max-w-[60px]">{reply.authorName}</div>
                        {reply.isStaff && (
                          <div className="flex justify-center mt-0.5">
                            <span className="text-[9px] text-sky-400 flex items-center gap-0.5"><Shield className="w-2.5 h-2.5" />Staff</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-white/40 mb-2">{timeAgo(reply.createdAt)}</div>
                        <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Reply Form */}
        {!thread.isLocked ? (
          <Card className="border-white/10">
            <CardContent className="p-5">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Send className="w-4 h-4 text-sky-400" />
                Tulis Balasan
              </h3>
              <form onSubmit={handleReply} className="space-y-3">
                <Input
                  placeholder="Username Minecraft kamu"
                  value={replyForm.authorName}
                  onChange={(e) => setReplyForm({ ...replyForm, authorName: e.target.value })}
                  required
                  className="glass border-white/10 bg-transparent"
                />
                <textarea
                  value={replyForm.content}
                  onChange={(e) => setReplyForm({ ...replyForm, content: e.target.value })}
                  required
                  rows={4}
                  placeholder="Tulis balasanmu di sini..."
                  className="w-full px-3 py-2 rounded-lg glass border border-white/10 bg-transparent text-white text-sm resize-none focus:outline-none focus:border-sky-500/50 placeholder:text-white/30"
                />
                <div className="flex justify-end">
                  <Button type="submit" variant="glow" size="sm" disabled={submitting} className="gap-2">
                    <Send className="w-3.5 h-3.5" />
                    {submitting ? "Mengirim..." : "Kirim Balasan"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="glass border border-white/10 rounded-2xl px-5 py-4 text-center text-sm text-white/40 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Thread ini telah dikunci oleh moderator
          </div>
        )}
      </div>
    </div>
  );
}
