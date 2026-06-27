"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface StatItem {
  numericValue: number;
  suffix: string;
  label: string;
  color: string;
  decimals?: number;
  display?: string;
}

const STATS: StatItem[] = [
  { numericValue: 1247, suffix: "", label: "Pemain Terdaftar", color: "from-sky-400 to-blue-500" },
  { numericValue: 3891, suffix: "", label: "Islands Dibuat", color: "from-green-400 to-emerald-500" },
  { numericValue: 0, suffix: "", label: "Server Uptime", color: "from-purple-400 to-violet-500", display: "24/7" },
  { numericValue: 99.8, suffix: "%", label: "Uptime Bulanan", color: "from-yellow-400 to-amber-500", decimals: 1 },
];

function CountUp({ target, suffix, decimals, run, display }: { target: number; suffix: string; decimals: number; run: boolean; display?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run || target === 0) return;
    let start = 0;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [run, target]);

  if (display) return <span>{display}</span>;
  if (decimals > 0) return <span>{count.toFixed(decimals)}{suffix}</span>;
  return <span>{Math.floor(count).toLocaleString("id-ID")}{suffix}</span>;
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-purple-500/5 to-sky-500/5" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass border-2 border-white/8 rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
              style={{ boxShadow: "2px 2px 0 rgba(255,255,255,0.04)" }}
            >
              <div className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                <CountUp
                  target={stat.numericValue}
                  suffix={stat.suffix}
                  decimals={stat.decimals ?? 0}
                  run={inView}
                  display={stat.display}
                />
              </div>
              <p className="text-sm text-white/50 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
