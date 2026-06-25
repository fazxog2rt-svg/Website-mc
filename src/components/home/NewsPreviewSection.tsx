"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/SectionHeader";

const mockNews = [
  {
    id: "1",
    title: "Update 2.0 - Dungeon System & New Boss!",
    excerpt: "Dungeon baru telah tiba! Jelajahi 3 dungeon eksklusif dengan boss yang belum pernah ada sebelumnya.",
    category: "Update",
    date: "2025-06-20",
    imageGradient: "from-red-600/30 to-orange-600/30",
    badgeVariant: "destructive" as const,
  },
  {
    id: "2",
    title: "Summer Event 2025 - Kumpulkan Hadiah!",
    excerpt: "Event musim panas telah dimulai! Selesaikan quest spesial dan dapatkan cosmetic eksklusif.",
    category: "Event",
    date: "2025-06-15",
    imageGradient: "from-yellow-600/30 to-amber-600/30",
    badgeVariant: "warning" as const,
  },
  {
    id: "3",
    title: "Patch 1.9.5 - Economy Rebalance",
    excerpt: "Pembaruan besar untuk sistem ekonomi! Bazaar, Auction House, dan harga item telah disesuaikan.",
    category: "Changelog",
    date: "2025-06-10",
    imageGradient: "from-sky-600/30 to-blue-600/30",
    badgeVariant: "default" as const,
  },
];

export default function NewsPreviewSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            badge="News & Updates"
            title="Latest From"
            titleGradient="SkyForge"
            centered={false}
            className="mb-0"
          />
          <Link href="/news">
            <Button variant="outline" size="sm" className="gap-1.5 hidden md:flex">
              All News <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockNews.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/news/${post.id}`}>
                <Card className="card-hover h-full overflow-hidden group border-white/8 hover:border-white/15">
                  <div className={`h-40 bg-gradient-to-br ${post.imageGradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-dots opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a14]/80 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant={post.badgeVariant}>{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-white/40 mb-2">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <h3 className="font-bold text-white text-sm leading-snug mb-2 group-hover:text-sky-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/news">
            <Button variant="outline" className="gap-2">All News <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
