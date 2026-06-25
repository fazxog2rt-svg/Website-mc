import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Calendar, Eye, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "News Article",
};

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const title = id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/news">
          <Button variant="ghost" size="sm" className="mb-8 gap-2 text-white/60 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
            Back to News
          </Button>
        </Link>

        <article className="glass border border-white/10 rounded-3xl overflow-hidden">
          <div className="h-56 bg-gradient-to-br from-sky-600/30 to-purple-600/30 relative">
            <div className="absolute inset-0 bg-dots opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/80 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <Badge variant="default">Update</Badge>
            </div>
          </div>
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />June 20, 2025</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />2,840 views</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">{title}</h1>
            <div className="space-y-4 text-white/70 text-sm leading-relaxed">
              <p>Artikel ini sedang dalam proses penulisan. Konten lengkap akan segera tersedia.</p>
              <p>Ikuti Discord kami untuk mendapatkan notifikasi update terbaru secara real-time.</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
