import { NextResponse } from "next/server";
import { getServerStatus } from "@/lib/minecraft-api";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export async function GET() {
  const host = process.env.MINECRAFT_SERVER_HOST ?? "play.skyforge.id";
  const port = parseInt(process.env.MINECRAFT_SERVER_PORT ?? "25565");

  const status = await getServerStatus(host, port);

  return NextResponse.json({
    ...status,
    host,
    timestamp: new Date().toISOString(),
  });
}
