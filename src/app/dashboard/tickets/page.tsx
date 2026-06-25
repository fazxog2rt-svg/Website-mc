import React from "react";
import type { Metadata } from "next";
import { Ticket, Plus, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Support Tickets" };

const mockTickets = [
  { id: "TK-001", subject: "Island not loading correctly", category: "Bug Report", status: "OPEN", priority: "HIGH", createdAt: "2025-06-22" },
  { id: "TK-002", subject: "Missing rank after purchase", category: "Store", status: "IN_PROGRESS", priority: "URGENT", createdAt: "2025-06-20" },
  { id: "TK-003", subject: "Question about coop system", category: "Question", status: "RESOLVED", priority: "LOW", createdAt: "2025-06-15" },
  { id: "TK-004", subject: "Auction House glitch", category: "Bug Report", status: "CLOSED", priority: "MEDIUM", createdAt: "2025-06-10" },
];

const statusConfig = {
  OPEN: { label: "Open", variant: "success" as const, icon: AlertCircle },
  IN_PROGRESS: { label: "In Progress", variant: "warning" as const, icon: Clock },
  RESOLVED: { label: "Resolved", variant: "default" as const, icon: CheckCircle },
  CLOSED: { label: "Closed", variant: "secondary" as const, icon: XCircle },
};

const priorityConfig = {
  LOW: "secondary" as const,
  MEDIUM: "default" as const,
  HIGH: "warning" as const,
  URGENT: "destructive" as const,
};

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white mb-1">Support Tickets</h1>
          <p className="text-white/50 text-sm">Manage your support requests.</p>
        </div>
        <Button variant="default" size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          New Ticket
        </Button>
      </div>

      <div className="space-y-3">
        {mockTickets.map((ticket) => {
          const statusInfo = statusConfig[ticket.status as keyof typeof statusConfig];
          const StatusIcon = statusInfo.icon;
          return (
            <Card key={ticket.id} className="border-white/8 card-hover">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Ticket className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <span className="text-xs text-white/30 font-mono mr-2">{ticket.id}</span>
                        <span className="font-bold text-white text-sm">{ticket.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant={priorityConfig[ticket.priority as keyof typeof priorityConfig]}>{ticket.priority}</Badge>
                        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                      <span>{ticket.category}</span>
                      <span>•</span>
                      <span>{ticket.createdAt}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
