"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wifi, WifiOff, Users, Zap, Clock, Server } from "lucide-react";

interface StatusData {
  online: boolean;
  players: { online: number; max: number };
  version?: string;
  ping?: number;
  motd?: string;
}

export default function ServerStatusBar() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uptime] = useState<number>(99.8);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/server-status");
        if (res.ok) {
          const data = await res.json();
          setStatus(data);
        }
      } catch {
        setStatus({ online: false, players: { online: 0, max: 0 } });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 h-8 glass-strong border-b border-white/5 flex items-center">
        <div className="container mx-auto px-4 max-w-7xl flex items-center gap-4">
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-3 w-20 rounded bg-white/10 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-40 glass-strong border-b border-white/5">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-6 h-8 overflow-x-auto scrollbar-hide text-xs">
          {/* Status */}
          <div className="flex items-center gap-1.5 shrink-0">
            {status?.online ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-medium">Online</span>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span className="text-red-400 font-medium">Offline</span>
              </>
            )}
          </div>

          <div className="w-px h-4 bg-white/10 shrink-0" />

          {/* Players */}
          <div className="flex items-center gap-1.5 shrink-0 text-white/60">
            <Users className="w-3 h-3 text-sky-400" />
            <span>
              <span className="text-white font-medium">{status?.players.online ?? 0}</span>
              <span className="text-white/40">/{status?.players.max ?? 0}</span>
              <span className="ml-1">players</span>
            </span>
          </div>

          <div className="w-px h-4 bg-white/10 shrink-0" />

          {/* Version */}
          {status?.version && (
            <>
              <div className="flex items-center gap-1.5 shrink-0 text-white/60">
                <Server className="w-3 h-3 text-purple-400" />
                <span>{status.version}</span>
              </div>
              <div className="w-px h-4 bg-white/10 shrink-0" />
            </>
          )}

          {/* Uptime */}
          <div className="flex items-center gap-1.5 shrink-0 text-white/60">
            <Clock className="w-3 h-3 text-gold-400" />
            <span>Uptime: <span className="text-white font-medium">{uptime}%</span></span>
          </div>

          <div className="w-px h-4 bg-white/10 shrink-0" />

          {/* MOTD */}
          {status?.motd && (
            <div className="flex items-center gap-1.5 shrink-0 text-white/40 truncate max-w-xs">
              <span className="truncate">{status.motd}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
