import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Crown, Star, Hammer, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Staff Team",
  description: "Kenali tim staff SkyForge yang berdedikasi melayani komunitas.",
};

interface StaffMember {
  username: string;
  uuid: string;
  role: string;
  description: string;
  isActive: boolean;
}

const staffMembers: StaffMember[] = [
  {
    username: "Notch",
    uuid: "069a79f4-44e9-4726-a5be-fca90e38aaf5",
    role: "Owner",
    description: "Pendiri dan pemilik SkyForge. Memimpin pengembangan server dan visi jangka panjang komunitas.",
    isActive: true,
  },
  {
    username: "Herobrine",
    uuid: "f84c6a84-0e6a-4cdc-bf28-9b4c6afe3b10",
    role: "Co-Owner",
    description: "Co-owner yang mengawasi operasional harian dan koordinasi tim staff.",
    isActive: true,
  },
  {
    username: "Jeb_",
    uuid: "853c80ef-3c37-49fd-aa49-938b674adae6",
    role: "Admin",
    description: "Admin utama yang bertanggung jawab atas manajemen server dan pengembangan fitur baru.",
    isActive: true,
  },
  {
    username: "Dinnerbone",
    uuid: "61699b2e-d327-4a01-9f1e-0ea8c3f06bc6",
    role: "Admin",
    description: "Admin teknis yang mengelola plugin, konfigurasi server, dan infrastruktur.",
    isActive: true,
  },
  {
    username: "Grumm",
    uuid: "e6b5c840-c20d-47a2-a1d2-6fbba4de4c18",
    role: "Moderator",
    description: "Moderator senior yang menjaga ketertiban chat dan menyelesaikan laporan pemain.",
    isActive: true,
  },
  {
    username: "Searge",
    uuid: "107af014-4e17-4bf4-9b7c-dc3f75049c1e",
    role: "Moderator",
    description: "Moderator yang fokus pada penanganan ticket support dan bantuan pemain baru.",
    isActive: true,
  },
  {
    username: "Marc_IRL",
    uuid: "9bba9750-5df5-4d59-a231-4e3310e7a06c",
    role: "Moderator",
    description: "Moderator yang aktif membantu komunitas di Discord dan dalam game.",
    isActive: true,
  },
  {
    username: "KrisJelbring",
    uuid: "7125ba8b-1c86-4d1e-8a70-1e3a2e0b4f90",
    role: "Builder",
    description: "Builder utama yang merancang spawn, dungeon, dan semua struktur custom di server.",
    isActive: true,
  },
  {
    username: "Lydia_Winters",
    uuid: "a1f86b28-f35a-4f58-8e44-e5eeb3e1e5c2",
    role: "Builder",
    description: "Builder spesialis interior yang membuat setiap area terasa hidup dan detail.",
    isActive: true,
  },
  {
    username: "EvilSeph",
    uuid: "3c2ead6f-d7ab-4a52-8e1f-c5b76e8fd59a",
    role: "Builder",
    description: "Builder yang berfokus pada terrain sculpting dan desain landscape island.",
    isActive: true,
  },
];

const roleConfig: Record<string, { color: string; bg: string; border: string; icon: React.ElementType; order: number }> = {
  Owner: { color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20", icon: Crown, order: 0 },
  "Co-Owner": { color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", icon: Crown, order: 1 },
  Admin: { color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20", icon: Shield, order: 2 },
  Moderator: { color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20", icon: Star, order: 3 },
  Builder: { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", icon: Hammer, order: 4 },
};

const roleGroups = ["Owner", "Co-Owner", "Admin", "Moderator", "Builder"];

export default function StaffPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Users className="w-3.5 h-3.5" />
            Tim Staff
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Meet the <span className="gradient-text">Team</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Tim staff berdedikasi yang bekerja keras untuk memberikan pengalaman terbaik di SkyForge.
          </p>
        </div>

        {roleGroups.map((role) => {
          const members = staffMembers.filter((m) => m.role === role && m.isActive);
          if (members.length === 0) return null;
          const cfg = roleConfig[role] ?? roleConfig["Moderator"];
          const RoleIcon = cfg.icon;
          return (
            <div key={role} className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-8 h-8 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center`}>
                  <RoleIcon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <h2 className={`text-lg font-black ${cfg.color}`}>{role}</h2>
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs text-white/30">{members.length} anggota</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                  <StaffCard key={member.username} member={member} cfg={cfg} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StaffCard({
  member,
  cfg,
}: {
  member: StaffMember;
  cfg: { color: string; bg: string; border: string; icon: React.ElementType };
}) {
  const RoleIcon = cfg.icon;
  return (
    <Card className="border-white/8 card-hover group overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10">
              <Image
                src={`https://crafatar.com/avatars/${member.uuid}?size=64&overlay`}
                alt={member.username}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-white group-hover:text-sky-300 transition-colors text-sm truncate">
              {member.username}
            </div>
            <div className={`inline-flex items-center gap-1 text-[10px] font-bold ${cfg.color} ${cfg.bg} border ${cfg.border} px-2 py-0.5 rounded-full mt-1`}>
              <RoleIcon className="w-2.5 h-2.5" />
              {member.role}
            </div>
            <p className="text-xs text-white/45 mt-2 leading-relaxed line-clamp-2">{member.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
