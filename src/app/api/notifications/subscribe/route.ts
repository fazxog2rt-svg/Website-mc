import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { endpoint, keys } = body;
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return NextResponse.json({ error: "Data subscription tidak lengkap" }, { status: 400 });
    }
    await db.pushSubscription.upsert({
      where: { endpoint },
      create: { endpoint, p256dhKey: keys.p256dh, authKey: keys.auth },
      update: { p256dhKey: keys.p256dh, authKey: keys.auth },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    await db.pushSubscription.delete({ where: { endpoint: body.endpoint } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
