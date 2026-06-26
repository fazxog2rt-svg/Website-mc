"use client";
import React from "react";
import Link from "next/link";
import { Sword, ExternalLink, MessageCircle, Camera, PlayCircle, Music2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useDiscordUrl } from "@/hooks/useDiscordUrl";

const staticFooterLinks = {
  Server: [
    { label: "Features", href: "/features" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Player Profile", href: "/player" },
    { label: "Live Status", href: "/status" },
  ],
  Store: [
    { label: "Ranks", href: "/store/ranks" },
    { label: "Cosmetics", href: "/store/cosmetics" },
    { label: "SkyCoins", href: "/store/coins" },
    { label: "Bundles", href: "/store/bundles" },
  ],
  Support: [
    { label: "Wiki", href: "/wiki" },
    { label: "FAQ", href: "/wiki/faq" },
    { label: "Rules", href: "/wiki/rules" },
    { label: "Support Ticket", href: "/dashboard/tickets" },
  ],
};

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Footer() {
  const discordUrl = useDiscordUrl();
  const footerLinks = {
    ...staticFooterLinks,
    Community: [
      { label: "Discord", href: discordUrl, external: true },
      { label: "Instagram", href: SITE_CONFIG.instagramUrl, external: true },
      { label: "YouTube", href: SITE_CONFIG.youtubeUrl, external: true },
      { label: "TikTok", href: SITE_CONFIG.tiktokUrl, external: true },
    ],
  };
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030710] to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 max-w-7xl py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-4 w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
                <Sword className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xl font-black gradient-text">SkyForge</p>
                <p className="text-[9px] text-white/40 font-medium tracking-widest uppercase">Skyblock Premium</p>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-xs">
              {SITE_CONFIG.tagline} Server Minecraft Skyblock Premium terbaik di Indonesia dengan pengalaman bermain kelas dunia.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: MessageCircle, href: discordUrl, label: "Discord", color: "hover:text-indigo-400 hover:bg-indigo-400/10" },
                { icon: Camera, href: SITE_CONFIG.instagramUrl, label: "Instagram", color: "hover:text-pink-400 hover:bg-pink-400/10" },
                { icon: PlayCircle, href: SITE_CONFIG.youtubeUrl, label: "YouTube", color: "hover:text-red-400 hover:bg-red-400/10" },
                { icon: Music2, href: SITE_CONFIG.tiktokUrl, label: "TikTok", color: "hover:text-white hover:bg-white/10" },
              ].map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className={cn(`p-2.5 rounded-xl glass border border-white/10 text-white/50 transition-all duration-200 ${color}`)}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors duration-200 group"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Server IP banner */}
        <div className="glass border border-white/10 rounded-2xl p-4 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-1">Server IP</p>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-white">{SITE_CONFIG.serverIp}</span>
              <span className="text-xs text-white/40">Java: {SITE_CONFIG.serverPort} · Bedrock: {SITE_CONFIG.bedrockPort}</span>
            </div>
          </div>
          <button
            onClick={() => navigator.clipboard?.writeText(SITE_CONFIG.serverIp)}
            className="px-4 py-2 rounded-xl glass border border-sky-500/30 text-sky-400 text-sm font-medium hover:bg-sky-500/10 transition-all duration-200 flex items-center gap-2"
          >
            Copy IP
          </button>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} SkyForge. All rights reserved. Not affiliated with Mojang or Microsoft.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
