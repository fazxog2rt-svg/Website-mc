import React from "react";
import type { Metadata } from "next";
import {
  Users, ShoppingBag, CreditCard, TrendingUp, Activity, MessageSquare,
  Shield, Clock, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Admin Dashboard" };

const metrics = [
  { label: "Total Players", value: "15,234", change: "+12.5%", up: true, icon: Users, color: "text-sky-400", bg: "bg-sky-400/10" },
  { label: "Revenue (Month)", value: "Rp 8.2M", change: "+23.1%", up: true, icon: CreditCard, color: "text-green-400", bg: "bg-green-400/10" },
  { label: "Active Orders", value: "47", change: "-5.2%", up: false, icon: ShoppingBag, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { label: "Open Tickets", value: "12", change: "+2", up: false, icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-400/10" },
];

const recentOrders = [
  { id: "ORD-001", user: "StormKing", product: "MVP+ Rank", amount: "Rp 350,000", status: "COMPLETED" },
  { id: "ORD-002", user: "IsleQueen", product: "15,000 SkyCoins", amount: "Rp 175,000", status: "PENDING" },
  { id: "ORD-003", user: "NightForge", product: "Epic Keys x1", amount: "Rp 25,000", status: "COMPLETED" },
  { id: "ORD-004", user: "SkyCraft", product: "VIP Rank", amount: "Rp 50,000", status: "PROCESSING" },
  { id: "ORD-005", user: "DragonMage", product: "Mount Bundle", amount: "Rp 75,000", status: "COMPLETED" },
];

const orderStatusVariant = {
  COMPLETED: "success" as const,
  PENDING: "warning" as const,
  PROCESSING: "default" as const,
  FAILED: "destructive" as const,
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Admin Dashboard</h1>
        <p className="text-white/50 text-sm">Overview of SkyForge server metrics.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} className="border-white/8">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${m.bg} flex items-center justify-center`}>
                  <m.icon className={`w-4.5 h-4.5 ${m.color}`} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-bold ${m.up ? "text-green-400" : "text-red-400"}`}>
                  {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {m.change}
                </div>
              </div>
              <div className={`text-xl font-black ${m.color}`}>{m.value}</div>
              <div className="text-xs text-white/40 mt-0.5">{m.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Orders */}
        <Card className="border-white/8">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-base">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-2">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/30 font-mono">{order.id}</span>
                      <span className="text-sm text-white font-medium truncate">{order.user}</span>
                    </div>
                    <div className="text-xs text-white/50">{order.product}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-white">{order.amount}</div>
                    <Badge variant={orderStatusVariant[order.status as keyof typeof orderStatusVariant]} className="text-[9px]">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-white/8">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Ban Player", icon: Shield, color: "text-red-400", href: "/admin/moderation" },
                { label: "Broadcast", icon: Activity, color: "text-yellow-400", href: "/admin/broadcast" },
                { label: "Add Product", icon: ShoppingBag, color: "text-sky-400", href: "/admin/store" },
                { label: "Create Post", icon: MessageSquare, color: "text-green-400", href: "/admin/news" },
                { label: "View Logs", icon: Clock, color: "text-purple-400", href: "/admin/audit-logs" },
                { label: "Site Settings", icon: Shield, color: "text-orange-400", href: "/admin/settings" },
              ].map(({ label, icon: Icon, color, href }) => (
                <a key={label} href={href} className="flex items-center gap-2.5 p-3 rounded-xl glass border border-white/8 hover:border-white/15 transition-all duration-200 group">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-xs text-white/60 group-hover:text-white transition-colors">{label}</span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
