import { NextResponse } from 'next/server';
import { generateCompatibility } from '@/lib/saju';
import { getStore, now, uid } from '@/lib/store';

export async function POST(req) {
  const body = await req.json();
  if (!body?.me?.name || !body?.partner?.name) {
    return NextResponse.json({ error: '두 사람의 정보가 필요합니다.' }, { status: 400 });
  }
  const generated = generateCompatibility(body.me, body.partner);
  const report = {
    id: uid('compatibility'),
    input: body,
    ...generated,
    createdAt: now()
  };
  getStore().compatibilityReports.push(report);
  return NextResponse.json({ report }, { status: 201 });
}
