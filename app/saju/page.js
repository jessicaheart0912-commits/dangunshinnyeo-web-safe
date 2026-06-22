'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';

const initialState = {
  name: '',
  gender: 'female',
  birthDate: '',
  birthTime: '',
  calendarType: 'solar',
  isLeapMonth: false,
  birthPlace: '서울'
};

export default function SajuPage() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '리포트 생성 실패');
      router.push(`/result/${data.report.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LayoutShell>
      <SectionCard eyebrow="FREE ENTRY" title="당신의 사주 문을 여는 입력" accent>
        <p className="lead">
          강렬한 메인 비주얼 톤을 그대로 이어받아, 입력 단계도 프리미엄 의식처럼 느껴지도록 구성했습니다.
        </p>
        <div className="info-banner">
          <strong>무료 제공</strong>
          <span>기본 성향 · 오늘의 운세 미리보기 · 결제 전 맛보기 해석</span>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            이름
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="홍길동" required />
          </label>
          <label>
            성별
            <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option value="female">여성</option>
              <option value="male">남성</option>
            </select>
          </label>
          <label>
            생년월일
            <input type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} required />
          </label>
          <label>
            출생시간
            <input type="time" value={form.birthTime} onChange={(e) => setForm({ ...form, birthTime: e.target.value })} required />
          </label>
          <label>
            양력/음력
            <select value={form.calendarType} onChange={(e) => setForm({ ...form, calendarType: e.target.value })}>
              <option value="solar">양력</option>
              <option value="lunar">음력</option>
            </select>
          </label>
          <label>
            출생지역
            <input value={form.birthPlace} onChange={(e) => setForm({ ...form, birthPlace: e.target.value })} placeholder="서울" />
          </label>
          <label className="checkbox-row full mystic-check">
            <input type="checkbox" checked={form.isLeapMonth} onChange={(e) => setForm({ ...form, isLeapMonth: e.target.checked })} />
            윤달 여부
          </label>
          {error ? <p className="error full">{error}</p> : null}
          <button className="primary-button full" disabled={loading}>{loading ? '기운을 읽는 중...' : '무료 풀이 열기'}</button>
        </form>
      </SectionCard>
    </LayoutShell>
  );
}
