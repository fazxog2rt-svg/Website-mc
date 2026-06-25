import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Wiki Article",
};

export default async function WikiArticlePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const title = slug[slug.length - 1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/wiki">
          <Button variant="ghost" size="sm" className="mb-8 gap-2 text-white/60 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
            Back to Wiki
          </Button>
        </Link>

        <div className="glass border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{slug.slice(0, -1).join(" / ")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-6">{title}</h1>

          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3.5 h-3.5" />
              Last updated: June 2025
            </div>
          </div>

          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-white/70 leading-relaxed mb-4">
              This wiki article is currently being written by our team. Check back soon for the full guide!
            </p>
            <p className="text-white/50 text-sm">
              In the meantime, join our{" "}
              <a href="https://discord.gg/skyforge" className="text-sky-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Discord server
              </a>{" "}
              and ask in #help for immediate assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
