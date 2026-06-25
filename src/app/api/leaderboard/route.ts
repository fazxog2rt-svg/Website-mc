import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "islandValue";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "10"), 50);

  const validTypes = ["islandValue", "islandLevel", "balance", "skillLevel", "voteCount", "playtime"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid leaderboard type" }, { status: 400 });
  }

  const players = await db.playerProfile.findMany({
    orderBy: { [type]: "desc" },
    take: limit,
    select: {
      uuid: true,
      username: true,
      rank: true,
      balance: true,
      islandLevel: true,
      islandValue: true,
      skillLevel: true,
      voteCount: true,
      playtime: true,
      isOnline: true,
    },
  }).catch(() => []);

  return NextResponse.json(players);
}
