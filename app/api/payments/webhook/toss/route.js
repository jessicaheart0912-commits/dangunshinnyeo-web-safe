import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ok: true, provider: 'toss', received: body });
}
