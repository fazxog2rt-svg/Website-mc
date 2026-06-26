import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { minecraftUsername, discordUsername, category, title, description, stepsToReproduce, severity } = body;

    if (!category || !title || !description) {
      return NextResponse.json({ error: "Kategori, judul, dan deskripsi wajib diisi" }, { status: 400 });
    }

    const validSeverities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    const validCategories = ["Gameplay", "Website", "Economy", "Other"];

    if (!validCategories.includes(category)) {
      return NextResponse.json({ error: "Kategori tidak valid" }, { status: 400 });
    }

    const report = await db.bugReport.create({
      data: {
        minecraftUsername: minecraftUsername ? String(minecraftUsername).trim() : null,
        discordUsername: discordUsername ? String(discordUsername).trim() : null,
        category: String(category),
        title: String(title).trim(),
        description: String(description).trim(),
        stepsToReproduce: stepsToReproduce ? String(stepsToReproduce).trim() : null,
        severity: validSeverities.includes(severity) ? String(severity) : "MEDIUM",
        status: "OPEN",
      },
    });

    return NextResponse.json({ success: true, id: report.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
