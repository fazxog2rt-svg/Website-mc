import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { minecraftUsername, discordUsername, age, timezone, experience, whyJoin, availability } = body;

    if (!minecraftUsername || !discordUsername || !experience || !whyJoin) {
      return NextResponse.json({ error: "Field wajib tidak boleh kosong" }, { status: 400 });
    }

    const application = await db.staffApplication.create({
      data: {
        minecraftUsername: String(minecraftUsername).trim(),
        discordUsername: String(discordUsername).trim(),
        age: age ? Number(age) : null,
        timezone: timezone ? String(timezone).trim() : null,
        experience: String(experience).trim(),
        whyJoin: String(whyJoin).trim(),
        availability: availability ? String(availability).trim() : null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, id: application.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
