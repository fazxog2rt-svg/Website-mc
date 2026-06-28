"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Trophy, Star, ArrowRight, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: Date): CountdownValues {
  const calc = () => {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [values, setValues] = useState<CountdownValues>(calc);
  useEffect(() => {
    const t = setInterval(() => setValues(calc()), 1000);
    return () => clearInterval(t);
  });
  return values;
}

const NEXT_EVENT = {
  title: "Summer Festival 2026",
  subtitle: "Event musim panas dengan Breeze Mob Arena & Trial Chamber Race!",
  date: new Date("2026-07-01T00:00:00+07:00"),
  type: "SEASONAL",
  icon: Star,
  color: "from-yellow-400 to-orange-500",
  reward: "Exclusive Summer Pet + 1,000,000 Coins",
  version: "Khusus 1.21.8",
};

export default function EventCountdownSection() {
  const countdown = useCountdown(NEXT_EVENT.date);
  const Icon = NEXT_EVENT.icon;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass border border-orange-500/20 rounded-3xl overflow-hidden"
        >
          <div className={`h-1.5 w-full bg-gradient-to-r ${NEXT_EVENT.color}`} />
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Calendar className="w-3 h-3" />
                  Event Berikutnya · {NEXT_EVENT.version}
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{NEXT_EVENT.title}</h2>
                <p className="text-white/60 text-sm mb-4 max-w-md">{NEXT_EVENT.subtitle}</p>
                <div className="flex items-center gap-2 text-yellow-400 text-xs mb-6">
                  <Trophy className="w-3.5 h-3.5 shrink-0" />
                  <span>{NEXT_EVENT.reward}</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Link href="/events">
                    <Button variant="gold" size="sm" className="gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Lihat Semua Event
                    </Button>
                  </Link>
                  <Link href="/events">
                    <Button variant="outline" size="sm" className="gap-2">
                      Daftar Sekarang
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Countdown */}
              <div className="shrink-0">
                <div className="text-center mb-3">
                  <div className="flex items-center justify-center gap-1 text-xs text-white/40 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    Dimulai dalam
                  </div>
                  <div className="text-xs text-white/30">
                    {NEXT_EVENT.date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "Hari", value: countdown.days },
                    { label: "Jam", value: countdown.hours },
                    { label: "Menit", value: countdown.minutes },
                    { label: "Detik", value: countdown.seconds },
                  ].map(({ label, value }) => (
                    <div key={label} className="glass border border-white/10 rounded-2xl p-3 w-16 text-center">
                      <motion.div
                        key={value}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-black text-white leading-none mb-1"
                      >
                        {String(value).padStart(2, "0")}
                      </motion.div>
                      <div className="text-[10px] text-white/40 uppercase tracking-wider">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming mini list */}
            <div className="mt-6 pt-5 border-t border-white/8">
              <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-3">Event Lain yang Akan Datang</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: "PvP Tournament S4", date: "28–29 Juni", icon: Swords, color: "text-red-400" },
                  { title: "Double XP Weekend", date: "5–6 Juli", icon: Star, color: "text-sky-400" },
                  { title: "Breeze Mob Arena", date: "12 Juli", icon: Calendar, color: "text-purple-400" },
                ].map((ev) => (
                  <div key={ev.title} className="flex items-center gap-2.5 glass rounded-xl px-3 py-2">
                    <ev.icon className={`w-4 h-4 shrink-0 ${ev.color}`} />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{ev.title}</div>
                      <div className="text-[10px] text-white/40">{ev.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
