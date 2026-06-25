import React from "react";
import Link from "next/link";
import {
  LayoutDashboard, Users, ShoppingBag, CreditCard, Newspaper,
  Calendar, Settings, Shield, FileText, BarChart3, LogOut, Bell,
  Sword, MessageSquare
} from "lucide-react";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Players", href: "/admin/players", icon: Users },
  { label: "Store", href: "/admin/store", icon: ShoppingBag },
  { label: "Orders", href: "/admin/orders", icon: CreditCard },
  { label: "News", href: "/admin/news", icon: Newspaper },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Tickets", href: "/admin/tickets", icon: MessageSquare },
  { label: "Moderation", href: "/admin/moderation", icon: Shield },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#030710]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center">
              <Sword className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-black gradient-text">SkyForge</div>
              <div className="text-[9px] text-red-400 font-bold uppercase tracking-widest">Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {adminNav.map((item) => (
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

        <div className="p-3 border-t border-white/5">
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
