import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const MOCK_ISLANDS = [
  { id: "1", ownerUsername: "StormKing", ownerUUID: "069a79f4-44e9-4726-a5be-fca90e38aaf5", islandName: "Storm Citadel", description: "Island berbentuk kastil besar dengan menara tinggi dan moat penuh air.", islandLevel: 487, islandValue: 12500000, votes: 342, isFeatured: true, month: 6, year: 2026 },
  { id: "2", ownerUsername: "IsleQueen", ownerUUID: "853c80ef-3c37-49fd-aa49-938b674adae6", islandName: "Crystal Paradise", description: "Island dengan dekorasi kristal cantik dan taman bunga warna-warni.", islandLevel: 412, islandValue: 9800000, votes: 289, isFeatured: false, month: 6, year: 2026 },
  { id: "3", ownerUsername: "NightForge", ownerUUID: "61699b2e-d327-4a01-9f1e-0ea8c3f06bc6", islandName: "Obsidian Tower", description: "Menara obsidian menjulang dengan lab enchanting tersembunyi di bawahnya.", islandLevel: 391, islandValue: 8600000, votes: 256, isFeatured: false, month: 6, year: 2026 },
  { id: "4", ownerUsername: "SkyCraft", ownerUUID: "107af014-4e17-4bf4-9b7c-dc3f75049c1e", islandName: "Sky Garden", description: "Taman melayang yang penuh dengan tanaman eksotis dan rumah pohon.", islandLevel: 345, islandValue: 7200000, votes: 198, isFeatured: false, month: 6, year: 2026 },
  { id: "5", ownerUsername: "DragonMage", ownerUUID: "e6b5c840-c20d-47a2-a1d2-6fbba4de4c18", islandName: "Dragon Lair", description: "Sarang naga epik dengan dungeon di bawah tanah dan harta karun tersembunyi.", islandLevel: 329, islandValue: 6700000, votes: 187, isFeatured: false, month: 6, year: 2026 },
  { id: "6", ownerUsername: "AquaLord", ownerUUID: "3c2ead6f-d7ab-4a52-8e1f-c5b76e8fd59a", islandName: "Ocean Depths", description: "Island bawah air dengan struktur koral dan jalan kaca transparan.", islandLevel: 298, islandValue: 5900000, votes: 165, isFeatured: false, month: 6, year: 2026 },
  { id: "7", ownerUsername: "BreezeRider", ownerUUID: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", islandName: "Wind Temple", description: "Kuil angin 1.21.8 dengan Breeze Mob sebagai penjaga dan Wind Charge cannon.", islandLevel: 271, islandValue: 5200000, votes: 143, isFeatured: false, month: 6, year: 2026 },
  { id: "8", ownerUsername: "TrialMaster", ownerUUID: "b2c3d4e5-f6a7-8901-bcde-f12345678901", islandName: "Trial Citadel", description: "Replika Trial Chamber 1.21.8 dengan Vault Block dan Ominous Bottle koleksi.", islandLevel: 254, islandValue: 4800000, votes: 127, isFeatured: false, month: 6, year: 2026 },
];

export async function GET() {
  try {
    const islands = await db.islandShowcase.findMany({
      orderBy: [{ isFeatured: "desc" }, { votes: "desc" }],
    });
    return NextResponse.json(islands.length ? islands : MOCK_ISLANDS);
  } catch {
    return NextResponse.json(MOCK_ISLANDS);
  }
}
