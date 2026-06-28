import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const MOCK_REPLIES: Record<string, { id: string; threadId: string; content: string; authorName: string; authorUUID: string | null; isStaff: boolean; createdAt: string }[]> = {
  "1": [
    { id: "r1", threadId: "1", content: "Mantap tipsnya! Gw coba tadi beneran nambah drop rate.", authorName: "IsleQueen", authorUUID: "853c80ef-3c37-49fd-aa49-938b674adae6", isStaff: false, createdAt: new Date("2026-06-25T10:00:00").toISOString() },
    { id: "r2", threadId: "1", content: "Jangan lupa bawa Fortune III biar makin banyak!", authorName: "MaceKing", authorUUID: null, isStaff: false, createdAt: new Date("2026-06-25T12:00:00").toISOString() },
    { id: "r3", threadId: "1", content: "Confirmed, update 1.21.8 memang buff drop rate. Ini disengaja oleh tim dev.", authorName: "SkyForge_Staff", authorUUID: null, isStaff: true, createdAt: new Date("2026-06-26T08:00:00").toISOString() },
  ],
  "2": [
    { id: "r4", threadId: "2", content: "Gw udah nyoba 50x trial chamber baru dapat 1 Heavy Core. Memang rare banget.", authorName: "DiamondFarmer", authorUUID: "069a79f4-44e9-4726-a5be-fca90e38aaf5", isStaff: false, createdAt: new Date("2026-06-24T14:00:00").toISOString() },
    { id: "r5", threadId: "2", content: "Ada cara buat farm Ominous Key lebih cepat? Biar bisa buka Ominous Vault.", authorName: "TrialBuilder", authorUUID: null, isStaff: false, createdAt: new Date("2026-06-25T09:00:00").toISOString() },
  ],
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const thread = await db.forumThread.findUnique({
      where: { id },
      include: { replies: { orderBy: { createdAt: "asc" } } },
    });
    if (thread) {
      await db.forumThread.update({ where: { id }, data: { viewCount: { increment: 1 } } });
      return NextResponse.json(thread);
    }
  } catch { /* fall through to mock */ }

  return NextResponse.json({
    id,
    title: "Thread Diskusi",
    content: "Konten thread ini membahas tips dan trik SkyForge 1.21.8.",
    category: "General",
    authorName: "DiamondFarmer",
    authorUUID: "069a79f4-44e9-4726-a5be-fca90e38aaf5",
    isPinned: false,
    isLocked: false,
    viewCount: 100,
    createdAt: new Date("2026-06-25").toISOString(),
    updatedAt: new Date("2026-06-26").toISOString(),
    replies: MOCK_REPLIES[id] ?? [],
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { content, authorName } = body;
    if (!content || !authorName) {
      return NextResponse.json({ error: "Konten dan nama wajib diisi" }, { status: 400 });
    }
    const reply = await db.forumReply.create({
      data: { threadId: id, content: String(content).trim(), authorName: String(authorName).trim() },
    });
    await db.forumThread.update({ where: { id }, data: { updatedAt: new Date() } });
    return NextResponse.json(reply, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
