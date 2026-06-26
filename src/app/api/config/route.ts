export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    discordUrl:
      process.env.DISCORD_INVITE_URL ||
      process.env.NEXT_PUBLIC_DISCORD_INVITE ||
      "https://discord.gg/3NAKrYaBgh",
  });
}
