"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Sword, ShoppingBag, Vote, BookOpen,
  Newspaper, Trophy, Users, Home, Zap, LogIn, Shield,
  Mountain, MessageSquare, Heart, Gift, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Features",
    href: "/features",
    icon: Zap,
    children: [
      { label: "Skyblock Islands", href: "/features/islands", icon: Sword },
      { label: "Economy", href: "/features/economy", icon: ShoppingBag },
      { label: "Skills & Progression", href: "/features/skills", icon: Trophy },
      { label: "Custom Enchants", href: "/features/enchants", icon: Zap },
      { label: "Pets & Minions", href: "/features/pets", icon: Users },
      { label: "Dungeons", href: "/features/dungeons", icon: Shield },
    ],
  },
  {
    label: "Store",
    href: "/store",
    icon: ShoppingBag,
    children: [
      { label: "Semua Produk", href: "/store", icon: ShoppingBag },
      { label: "Beli Rank", href: "/store/ranks", icon: Trophy },
      { label: "Gift Rank", href: "/store/gift", icon: Gift },
      { label: "Wishlist", href: "/store/wishlist", icon: Heart },
      { label: "SkyCoins", href: "/store/coins", icon: Zap },
    ],
  },
  { label: "Vote", href: "/vote", icon: Vote },
  { label: "Wiki", href: "/wiki", icon: BookOpen },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  {
    label: "Komunitas",
    href: "/community",
    icon: Users,
    children: [
      { label: "Community", href: "/community", icon: Users },
      { label: "Forum", href: "/forum", icon: MessageSquare },
      { label: "Island Showcase", href: "/island-showcase", icon: Mountain },
      { label: "Events", href: "/events", icon: Newspaper },
      { label: "Bazaar", href: "/economy/bazaar", icon: BarChart3 },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPlayers = () => {
      fetch("/api/online-players")
        .then((r) => r.json())
        .then((d) => setOnlinePlayers(d.online ?? null))
        .catch(() => null);
    };
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Nav bar row */}
        <div
          className={cn(
            "transition-all duration-500",
            isScrolled
              ? "glass-strong border-b border-white/10 shadow-2xl shadow-black/20"
              : "bg-transparent"
          )}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex items-center justify-between h-16 md:h-18">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-all duration-300 group-hover:scale-110">
                    <Sword className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-sky-400 to-purple-600 opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300" />
                </div>
                <div className="flex flex-col -space-y-0.5">
                  <span className="text-xl font-black gradient-text tracking-tight leading-none">
                    SkyForge
                  </span>
                  <span className="text-[9px] text-white/40 font-medium tracking-widest uppercase leading-none hidden sm:block">
                    Skyblock Premium
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
                {navItems.map((item) => (
                  <div key={item.href} className="relative">
                    {item.children ? (
                      <button
                        onClick={() =>
                          setActiveDropdown(activeDropdown === item.label ? null : item.label)
                        }
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          "text-white/70 hover:text-white hover:bg-white/8"
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            activeDropdown === item.label && "rotate-180"
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          pathname === item.href
                            ? "text-white bg-white/10 shadow-sm"
                            : "text-white/70 hover:text-white hover:bg-white/8"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}

                    <AnimatePresence>
                      {item.children && activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-56 rounded-2xl glass-strong border border-white/10 shadow-2xl p-2"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                            >
                              <child.icon className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard?.writeText(SITE_CONFIG.serverIp)}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-xs text-white/60 hover:text-white hover:border-sky-500/40 transition-all duration-200"
                  title="Click to copy server IP"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {SITE_CONFIG.serverIp}
                  {onlinePlayers !== null && (
                    <>
                      <span className="text-white/20 mx-0.5">·</span>
                      <span className="text-emerald-400 font-semibold">{onlinePlayers}</span>
                      <span className="text-white/40">online</span>
                    </>
                  )}
                </button>

                <Link href="/auth/signin">
                  <Button variant="outline" size="sm" className="hidden md:flex gap-1.5">
                    <LogIn className="w-3.5 h-3.5" />
                    Login
                  </Button>
                </Link>

                <Link href="/store">
                  <Button variant="gold" size="sm" className="hidden md:flex">
                    Store
                  </Button>
                </Link>

                <button
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  className="lg:hidden p-2 rounded-xl glass border border-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {isMobileOpen ? (
                      <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.15 }}>
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.15 }}>
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm glass-strong border-l border-white/10 shadow-2xl pt-24 overflow-y-auto"
          >
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                        : "text-white/70 hover:text-white hover:bg-white/8"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/8 transition-all duration-200"
                        >
                          <child.icon className="w-3.5 h-3.5" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2 border-t border-white/10">
                <Link href="/auth/signin" className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <LogIn className="w-4 h-4" /> Login
                  </Button>
                </Link>
                <Link href="/store" className="block">
                  <Button variant="gold" className="w-full">Store</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
