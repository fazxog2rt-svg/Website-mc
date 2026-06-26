import { NextResponse } from "next/server";
import { getServerStatus } from "@/lib/minecraft-api";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  const host = process.env.MINECRAFT_SERVER_HOST ?? "play.skyforge.id";
  const port = parseInt(process.env.MINECRAFT_SERVER_PORT ?? "25565");

  try {
    const status = await getServerStatus(host, port);

    if (status.online) {
      return NextResponse.json({
        online: status.players.online,
        max: status.players.max,
        players: status.players.list ?? [],
      });
    }
  } catch {
    // fall through to mock data
  }

  return NextResponse.json({
    online: 12,
    max: 100,
    players: ["Steve", "Alex", "Notch", "Herobrine"],
  });
}
