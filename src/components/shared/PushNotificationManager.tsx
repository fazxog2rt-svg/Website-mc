"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from(rawData.split("").map((c) => c.charCodeAt(0)));
}

export default function PushNotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [showPrompt, setShowPrompt] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const dismissed = sessionStorage.getItem("push_dismissed");
    if (dismissed) return;

    const savedPerm = Notification.permission;
    setPermission(savedPerm);

    if (savedPerm === "granted") {
      setSubscribed(true);
      return;
    }
    if (savedPerm === "denied") return;

    const timer = setTimeout(() => setShowPrompt(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const subscribe = async () => {
    if (!("serviceWorker" in navigator)) return;
    setLoading(true);
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") {
        setShowPrompt(false);
        return;
      }

      if (VAPID_PUBLIC_KEY) {
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
        await fetch("/api/notifications/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sub),
        });
      }

      setSubscribed(true);
      setShowPrompt(false);
      toast.success("Notifikasi diaktifkan! Kamu akan diberitahu tentang event dan maintenance SkyForge.");
    } catch {
      toast.error("Gagal mengaktifkan notifikasi");
    } finally {
      setLoading(false);
    }
  };

  const dismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("push_dismissed", "1");
  };

  if (!mounted || typeof window === "undefined" || !("Notification" in window)) return null;

  return (
    <>
      <AnimatePresence>
        {showPrompt && !subscribed && permission === "default" && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50"
          >
            <div className="glass-strong border border-white/15 rounded-2xl p-4 shadow-2xl shadow-black/40">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-sky-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white mb-0.5">Aktifkan Notifikasi</div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Dapatkan notifikasi event, maintenance, dan update SkyForge 1.21.8 langsung ke device kamu.
                  </p>
                </div>
                <button onClick={dismiss} className="text-white/30 hover:text-white transition-colors mt-0.5">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={dismiss} className="flex-1 text-xs">
                  Nanti Saja
                </Button>
                <Button variant="glow" size="sm" onClick={subscribe} disabled={loading} className="flex-1 text-xs gap-1.5">
                  <Bell className="w-3.5 h-3.5" />
                  {loading ? "Mengaktifkan..." : "Aktifkan"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button when subscribed */}
      {subscribed && (
        <button
          title="Notifikasi aktif"
          className="fixed bottom-4 right-4 w-11 h-11 rounded-full glass-strong border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10 transition-colors z-40"
        >
          <Bell className="w-4.5 h-4.5" />
        </button>
      )}
    </>
  );
}
