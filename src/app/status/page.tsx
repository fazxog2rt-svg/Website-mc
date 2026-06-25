"use client";
import React, { useState, useEffect } from "react";
import { Server, Users, Zap, Clock, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/constants";

interface StatusData {
  online: boolean;
  players: { online: number; max: number; list?: string[] };
  version?: string;
  motd?: string;
  ping?: number;
  timestamp: string;
}

export default function StatusPage() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/server-status");
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
        setLastRefresh(new Date());
      }
    } catch {
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const uptimePercent = 99.8;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-green-500/30 text-green-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live Status
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Server <span className="gradient-text">Status</span>
          </h1>
          <p className="text-white/60">Real-time monitoring status server SkyForge.</p>
        </div>

        {/* Main status card */}
        <Card className={`mb-8 border-2 ${status?.online ? "border-green-500/30" : "border-red-500/30"}`}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${status?.online ? "bg-green-500/20" : "bg-red-500/20"}`}>
                {status?.online
                  ? <Wifi className="w-10 h-10 text-green-400" />
                  : <WifiOff className="w-10 h-10 text-red-400" />
                }
              </div>
              <div className="text-center md:text-left">
                <div className={`text-4xl font-black mb-1 ${status?.online ? "text-green-400" : "text-red-400"}`}>
                  {loading ? "Checking..." : status?.online ? "Online" : "Offline"}
                </div>
                <div className="text-white/60 text-sm">
                  {status?.motd ?? `${SITE_CONFIG.serverIp} · Premium Skyblock`}
                </div>
              </div>
              <div className="ml-auto">
                <Button variant="outline" size="sm" onClick={fetchStatus} disabled={loading} className="gap-2">
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Players Online", value: `${status?.players.online ?? 0}/${status?.players.max ?? 0}`, color: "text-sky-400" },
            { icon: Server, label: "Version", value: status?.version ?? "Loading...", color: "text-purple-400" },
            { icon: Zap, label: "Ping", value: status?.ping ? `${status.ping}ms` : "N/A", color: "text-green-400" },
            { icon: Clock, label: "Uptime", value: `${uptimePercent}%`, color: "text-yellow-400" },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label} className="border-white/8">
              <CardContent className="p-5 text-center">
                <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                <div className={`text-xl font-black ${color} mb-1`}>{value}</div>
                <div className="text-xs text-white/40">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Server info */}
        <Card className="border-white/10 mb-6">
          <CardContent className="p-6">
            <h3 className="font-bold text-white mb-4">Server Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Java IP", value: `${SITE_CONFIG.serverIp}:${SITE_CONFIG.serverPort}` },
                { label: "Bedrock IP", value: `${SITE_CONFIG.serverIp}:${SITE_CONFIG.bedrockPort}` },
                { label: "Java Versions", value: "1.8 - 1.21" },
                { label: "Bedrock", value: "Bedrock Edition Support" },
                { label: "Location", value: "Indonesia (Jakarta)" },
                { label: "Last Checked", value: lastRefresh.toLocaleTimeString("id-ID") },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm text-white/50">{label}</span>
                  <span className="text-sm font-medium text-white font-mono">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-white/30">Status diperbarui setiap 30 detik. Last update: {lastRefresh.toLocaleTimeString("id-ID")}</p>
      </div>
    </div>
  );
}
