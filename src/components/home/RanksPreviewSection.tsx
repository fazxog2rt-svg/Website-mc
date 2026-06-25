"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Crown, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/SectionHeader";
import { RANKS, SITE_CONFIG } from "@/lib/constants";

export default function RanksPreviewSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader
          badge="Store"
          title="Choose Your"
          titleGradient="Rank"
          description="Dukung server dan dapatkan privilege eksklusif dengan rank premium SkyForge."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RANKS.map((rank, i) => (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className={`h-full card-hover relative overflow-hidden group ${i === 2 ? "border-yellow-500/30 glow-gold" : "border-white/8"}`}>
                {i === 2 && (
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500" />
                )}
                {i === 2 && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2 py-0.5 rounded-full">
                    <Crown className="w-3 h-3" />
                    Popular
                  </div>
                )}
                <CardContent className="p-6">
                  <div
                    className="text-2xl font-black mb-1"
                    style={{ color: rank.color }}
                  >
                    [{rank.name}]
                  </div>
                  <div className="text-2xl font-black text-white mb-4">
                    Rp {rank.price.toLocaleString("id-ID")}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {rank.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-xs text-white/60">
                        <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <a href={SITE_CONFIG.storeWhatsApp} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant={i === 2 ? "gold" : "outline"}
                      size="sm"
                      className="w-full gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Buy via WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href={SITE_CONFIG.storeWhatsApp} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="gap-2">
              View All Products
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
