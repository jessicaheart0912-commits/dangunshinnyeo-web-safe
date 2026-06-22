import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, service: '단군신녀 웹 MVP' });
}
