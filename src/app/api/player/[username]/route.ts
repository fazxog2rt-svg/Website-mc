import { NextRequest, NextResponse } from "next/server";
import { getPlayerByUsername } from "@/lib/minecraft-api";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const mojangInfo = await getPlayerByUsername(username);
  if (!mojangInfo) {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }

  const dbProfile = await db.playerProfile.findUnique({
    where: { uuid: mojangInfo.uuid },
    include: { stats: true },
  }).catch(() => null);

  return NextResponse.json({
    ...mojangInfo,
    profile: dbProfile,
  });
}
