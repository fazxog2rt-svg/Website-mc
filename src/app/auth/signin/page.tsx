import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sword, MessageCircle, Monitor } from "lucide-react";

export const metadata: Metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Sword className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-2xl font-black gradient-text">SkyForge</p>
              <p className="text-[10px] text-white/40 tracking-widest uppercase">Skyblock Premium</p>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white mb-2">Welcome Back!</h1>
          <p className="text-white/50 text-sm">Sign in to access your player dashboard.</p>
        </div>

        {/* Sign in card */}
        <div className="glass border border-white/10 rounded-3xl p-8">
          <div className="space-y-3">
            {/* Discord */}
            <form action="/api/auth/signin/discord" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-white hover:bg-indigo-500/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">Continue with Discord</div>
                  <div className="text-xs text-white/50">Recommended for Discord members</div>
                </div>
              </button>
            </form>

            {/* Microsoft */}
            <form action="/api/auth/signin/microsoft-entra-id" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl bg-blue-500/20 border border-blue-500/30 text-white hover:bg-blue-500/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">Continue with Microsoft</div>
                  <div className="text-xs text-white/50">Use your Minecraft account</div>
                </div>
              </button>
            </form>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/40">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-sky-400 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-sky-400 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          Having trouble?{" "}
          <a href="https://discord.gg/skyforge" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
