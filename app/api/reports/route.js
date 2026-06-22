import { NextResponse } from 'next/server';
import { generateBasicReading } from '@/lib/saju';
import { getStore, now, uid } from '@/lib/store';

export async function POST(req) {
  const body = await req.json();
  if (!body.name || !body.birthDate || !body.birthTime) {
    return NextResponse.json({ error: '이름, 생년월일, 출생시간은 필수입니다.' }, { status: 400 });
  }

  const reading = generateBasicReading(body);
  const report = {
    id: uid('report'),
    input: body,
    ...reading,
    createdAt: now()
  };

  getStore().reports.push(report);
  return NextResponse.json({ report }, { status: 201 });
}

export async function GET(req) {
  const id = new URL(req.url).searchParams.get('id');
  const report = getStore().reports.find((item) => item.id === id);
  if (!report) {
    return NextResponse.json({ error: '리포트를 찾을 수 없습니다.' }, { status: 404 });
  }
  return NextResponse.json({ report });
}
