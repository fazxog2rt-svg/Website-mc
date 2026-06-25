import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BarChart3, Star, Coins, Mountain, Clock, Vote, Trophy, Bell,
  ShoppingBag, Ticket, ChevronRight, Gift
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const metadata: Metadata = { title: "Dashboard" };

const quickStats = [
  { label: "Rank", value: "MVP+", icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { label: "Balance", value: "125,000", suffix: " coins", icon: Coins, color: "text-sky-400", bg: "bg-sky-400/10" },
  { label: "Island Level", value: "42", icon: Mountain, color: "text-green-400", bg: "bg-green-400/10" },
  { label: "Playtime", value: "320h", icon: Clock, color: "text-purple-400", bg: "bg-purple-400/10" },
];

const recentActivity = [
  { type: "purchase", title: "Bought MVP+ Rank", time: "2 hours ago", icon: ShoppingBag },
  { type: "vote", title: "Voted on MinecraftServerList.com", time: "5 hours ago", icon: Trophy },
  { type: "reward", title: "Claimed Daily Reward", time: "8 hours ago", icon: Gift },
  { type: "ticket", title: "Support ticket #123 resolved", time: "1 day ago", icon: Ticket },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="glass border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Welcome back! 👋</h1>
            <p className="text-white/50 text-sm">Here&apos;s what&apos;s happening with your account.</p>
          </div>
          <Badge variant="gold" className="text-sm px-3 py-1">MVP+</Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="border-white/8">
            <CardContent className="p-4">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-4.5 h-4.5 ${stat.color}`} />
              </div>
              <div className={`text-xl font-black ${stat.color}`}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Skill Progress */}
        <Card className="border-white/8">
          <CardContent className="p-6">
            <h3 className="font-bold text-white mb-4">Skill Progress</h3>
            <div className="space-y-3">
              {[
                { skill: "Mining", level: 45, max: 50, color: "from-yellow-400 to-amber-500" },
                { skill: "Farming", level: 38, max: 50, color: "from-green-400 to-emerald-500" },
                { skill: "Combat", level: 32, max: 50, color: "from-red-400 to-rose-500" },
                { skill: "Fishing", level: 28, max: 50, color: "from-sky-400 to-blue-500" },
              ].map(({ skill, level, max, color }) => (
                <div key={skill}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white/70">{skill}</span>
                    <span className="text-white/40">{level}/{max}</span>
                  </div>
                  <Progress value={(level / max) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-white/8">
          <CardContent className="p-6">
            <h3 className="font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.title} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center shrink-0">
                    <activity.icon className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white truncate">{activity.title}</div>
                    <div className="text-xs text-white/40">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card className="border-white/8">
        <CardContent className="p-6">
          <h3 className="font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Vote Now", href: "/vote", icon: Trophy, color: "text-yellow-400" },
              { label: "Visit Store", href: "/store", icon: ShoppingBag, color: "text-sky-400" },
              { label: "Open Ticket", href: "/dashboard/tickets", icon: Ticket, color: "text-purple-400" },
              { label: "Leaderboard", href: "/leaderboard", icon: BarChart3, color: "text-green-400" },
            ].map(({ label, href, icon: Icon, color }) => (
              <Link key={label} href={href}>
                <div className="glass border border-white/10 rounded-xl p-3 text-center hover:border-white/20 transition-all duration-200 group cursor-pointer">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-1.5 group-hover:scale-110 transition-transform`} />
                  <span className="text-xs text-white/60 group-hover:text-white transition-colors">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
