import { NextResponse } from "next/server";
import { getCurrentAdmin, ensureDefaultAdmin } from "@/lib/auth";

export async function GET() {
  await ensureDefaultAdmin();
  const admin = await getCurrentAdmin();

  if (!admin) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user: admin });
}
