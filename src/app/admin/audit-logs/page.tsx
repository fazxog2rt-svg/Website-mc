import React from "react";
import type { Metadata } from "next";
import { FileText, Shield, ShoppingBag, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Audit Logs" };

const logs = [
  { id: "1", action: "PLAYER_BAN", actor: "Admin#1", target: "BadPlayer123", time: "2025-06-25 14:30:22", type: "moderation" },
  { id: "2", action: "ORDER_COMPLETED", actor: "System", target: "ORD-047", time: "2025-06-25 13:15:08", type: "store" },
  { id: "3", action: "SETTINGS_UPDATED", actor: "Admin#1", target: "site.maintenance", time: "2025-06-25 11:00:00", type: "settings" },
  { id: "4", action: "PRODUCT_CREATED", actor: "Admin#1", target: "Epic Crate Keys x5", time: "2025-06-24 16:45:33", type: "store" },
  { id: "5", action: "PLAYER_UNMUTE", actor: "Moderator#2", target: "NaughtyPlayer", time: "2025-06-24 15:20:11", type: "moderation" },
  { id: "6", action: "POST_PUBLISHED", actor: "Admin#1", target: "Update 2.0 Blog Post", time: "2025-06-24 12:00:00", type: "content" },
];

const typeConfig: Record<string, { variant: "destructive" | "success" | "warning" | "default"; icon: React.ElementType }> = {
  moderation: { variant: "destructive", icon: Shield },
  store: { variant: "success", icon: ShoppingBag },
  settings: { variant: "warning", icon: Settings },
  content: { variant: "default", icon: FileText },
};

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white mb-1">Audit Logs</h1>
        <p className="text-white/50 text-sm">Complete history of all admin actions.</p>
      </div>
      <Card className="border-white/8">
        <CardContent className="p-5">
          <div className="space-y-1">
            {logs.map((log) => {
              const config = typeConfig[log.type] ?? typeConfig.content;
              const Icon = config.icon;
              return (
                <div key={log.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                  <div className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs text-sky-400 font-mono">{log.action}</code>
                      <Badge variant={config.variant} className="text-[9px]">{log.type}</Badge>
                    </div>
                    <div className="text-xs text-white/50 mt-0.5">
                      <span className="text-white/70">{log.actor}</span>{" → "}<span>{log.target}</span>
                    </div>
                  </div>
                  <div className="text-xs text-white/30 font-mono shrink-0">{log.time}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
