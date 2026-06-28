import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const MOCK_THREADS = [
  { id: "1", title: "Tips farming diamond ore di 1.21.8 Trial Chamber", content: "Setelah update 1.21.8, spawn rate diamond di Trial Chamber naik. Ini tips lengkapnya...", category: "Tips & Tricks", authorName: "DiamondFarmer", authorUUID: "069a79f4-44e9-4726-a5be-fca90e38aaf5", isPinned: true, isLocked: false, viewCount: 1420, replyCount: 38, createdAt: new Date("2026-06-25").toISOString(), updatedAt: new Date("2026-06-27").toISOString() },
  { id: "2", title: "Cara dapat Heavy Core dari Vault Block", content: "Heavy Core adalah item baru 1.21.8 untuk crafting Mace. Berikut cara mendapatkannya...", category: "Guide", authorName: "MaceKing", authorUUID: "853c80ef-3c37-49fd-aa49-938b674adae6", isPinned: false, isLocked: false, viewCount: 987, replyCount: 22, createdAt: new Date("2026-06-24").toISOString(), updatedAt: new Date("2026-06-26").toISOString() },
  { id: "3", title: "[PENTING] Aturan Forum - Baca Dulu!", content: "Sebelum posting, harap baca aturan forum berikut ini agar diskusi tetap kondusif...", category: "Pengumuman", authorName: "Admin", authorUUID: null, isPinned: true, isLocked: true, viewCount: 3891, replyCount: 0, createdAt: new Date("2026-06-01").toISOString(), updatedAt: new Date("2026-06-01").toISOString() },
  { id: "4", title: "Build island dengan tema Tricky Trials 1.21.8", content: "Saya baru selesai build island tema Tricky Trials. Pakai copper bulb dan tuff brick...", category: "Showcase", authorName: "TrialBuilder", authorUUID: "61699b2e-d327-4a01-9f1e-0ea8c3f06bc6", isPinned: false, isLocked: false, viewCount: 654, replyCount: 15, createdAt: new Date("2026-06-23").toISOString(), updatedAt: new Date("2026-06-25").toISOString() },
  { id: "5", title: "Jual Mace +Wind Burst III harga nego", content: "Jual Mace dengan enchant Wind Burst III + Density V. Harga starting 5M SC...", category: "Trading", authorName: "MaceTrader", authorUUID: "107af014-4e17-4bf4-9b7c-dc3f75049c1e", isPinned: false, isLocked: false, viewCount: 432, replyCount: 9, createdAt: new Date("2026-06-22").toISOString(), updatedAt: new Date("2026-06-24").toISOString() },
  { id: "6", title: "Bug report: Wind Charge tidak berfungsi di island orang lain", content: "Saat menggunakan Wind Charge di island orang lain, tidak ada efek. Ini bug atau fitur?", category: "Bug Report", authorName: "BugHunter", authorUUID: "e6b5c840-c20d-47a2-a1d2-6fbba4de4c18", isPinned: false, isLocked: false, viewCount: 312, replyCount: 5, createdAt: new Date("2026-06-21").toISOString(), updatedAt: new Date("2026-06-22").toISOString() },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const threads = await db.forumThread.findMany({
      where: category ? { category } : undefined,
      include: { _count: { select: { replies: true } } },
      orderBy: [{ isPinned: "desc" }, { updatedAt: "desc" }],
    });
    const mapped = threads.map((t: typeof threads[number]) => ({ ...t, replyCount: t._count.replies }));
    return NextResponse.json(mapped.length ? mapped : MOCK_THREADS);
  } catch {
    const filtered = category ? MOCK_THREADS.filter((t) => t.category === category) : MOCK_THREADS;
    return NextResponse.json(filtered);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, category, authorName } = body;
    if (!title || !content || !authorName) {
      return NextResponse.json({ error: "Judul, konten, dan nama wajib diisi" }, { status: 400 });
    }
    const thread = await db.forumThread.create({
      data: {
        title: String(title).trim(),
        content: String(content).trim(),
        category: category ?? "General",
        authorName: String(authorName).trim(),
      },
    });
    return NextResponse.json(thread, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
