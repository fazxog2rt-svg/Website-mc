import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  User, BarChart3, ShoppingBag, Bell, Ticket, Gift, Users, LogOut,
  ChevronRight, Home
} from "lucide-react";

const sidebarItems = [
  { label: "Overview", href: "/dashboard", icon: BarChart3 },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Purchases", href: "/dashboard/purchases", icon: ShoppingBag },
  { label: "Vote", href: "/dashboard/vote", icon: Gift },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Support", href: "/dashboard/tickets", icon: Ticket },
  { label: "Referral", href: "/dashboard/referral", icon: Users },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 shrink-0 hidden md:block">
            <div className="glass border border-white/10 rounded-2xl p-3 sticky top-28">
              <div className="px-3 py-2 mb-3">
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Dashboard</p>
              </div>
              <nav className="space-y-0.5">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200 group"
                  >
                    <item.icon className="w-4 h-4 group-hover:text-sky-400 transition-colors" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-white/10 mt-3 pt-3">
                <form action="/api/auth/signout" method="POST">
                  <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
