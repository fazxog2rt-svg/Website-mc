"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";

interface Testimonial {
  username: string;
  uuid: string;
  text: string;
}

const TESTIMONIALS_ROW1: Testimonial[] = [
  { username: "StormKing", uuid: "069a79f444e94726a5befca90e38aaf5", text: "Server terbaik yang pernah aku main! Economy systemnya bikin nagih." },
  { username: "IsleQueen", uuid: "853c80ef3c3749fdaa49938b674adae6", text: "Admin responsif, komunitas friendly, update rutin. Highly recommended!" },
  { username: "DragonMage", uuid: "b876ec32e396476ba1158438d83c67d4", text: "Udah 2 tahun main di sini, masih ga bosen karena selalu ada event baru." },
  { username: "AquaLord", uuid: "f78a4d8dd51f4b60a6d93b52a3f5a2e1", text: "Island systemnya paling canggih dibanding server lain. Auto recommend!" },
];

const TESTIMONIALS_ROW2: Testimonial[] = [
  { username: "NightForge", uuid: "ec561538f3fd461daff5086b22154bce", text: "Custom enchantnya gila banget, ada ratusan pilihan yang bikin mind-blown!" },
  { username: "SkyCraft", uuid: "7125ba8b1c864508b92bb5c042ccfe2b", text: "Dungeon bossnya challenging tapi rewarding banget. Best server experience!" },
  { username: "CrystalMine", uuid: "4566e69fc90748ee8d71d7ba5aa00d20", text: "Economy di sini bikin aku belajar trading beneran 😂 SkyForge terbaik!" },
  { username: "FireWarden", uuid: "f7c77d999f154a66a87dc4a51ef30d19", text: "Support ticketnya fast response, masalah langsung kelar dalam hitungan jam." },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="inline-flex shrink-0 items-start gap-3 mx-3 px-5 py-4 rounded-2xl glass border border-white/10 w-72 hover:border-sky-500/30 transition-colors duration-300">
      <div className="shrink-0 w-9 h-9 rounded-full overflow-hidden bg-white/10 border border-white/10">
        <Image
          src={`https://crafatar.com/avatars/${testimonial.uuid}?size=36&overlay`}
          alt={testimonial.username}
          width={36}
          height={36}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-white/60 leading-relaxed mb-2 line-clamp-3">{testimonial.text}</p>
        <p className="text-xs font-bold text-sky-400">— {testimonial.username}</p>
      </div>
    </div>
  );
}

// Duplicate for seamless loop
const ROW1_DOUBLED = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1];
const ROW2_DOUBLED = [...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />

      <div className="relative">
        <div className="container mx-auto px-4 max-w-6xl mb-12">
          <SectionHeader
            badge="Testimoni"
            title="Apa Kata"
            titleGradient="Para Pemain?"
            description="Ribuan pemain telah bergabung dan merasakan sendiri pengalaman bermain di SkyForge."
          />
        </div>

        {/* Row 1 — scrolls left */}
        <div className="relative mb-4 overflow-hidden">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050a14] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050a14] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee">
            {ROW1_DOUBLED.map((t, i) => (
              <TestimonialCard key={`r1-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050a14] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050a14] to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee-reverse">
            {ROW2_DOUBLED.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
