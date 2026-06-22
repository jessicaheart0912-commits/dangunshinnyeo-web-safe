'use client';

import { useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';

const initial = {
  me: { name: '', birthDate: '', birthTime: '' },
  partner: { name: '', birthDate: '', birthTime: '' }
};

export default function CompatibilityPage() {
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '궁합 생성 실패');
      setResult(data.report);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function update(group, key, value) {
    setForm({ ...form, [group]: { ...form[group], [key]: value } });
  }

  return (
    <LayoutShell>
      <SectionCard eyebrow="DUO ANALYSIS" title="두 사람의 궁합을 먼저 확인해보세요" accent>
        <p className="lead">이름과 생년월일, 출생시간을 입력하면 궁합 점수를 먼저 확인하고 필요할 때만 상세 해석으로 이어갈 수 있습니다.</p>
        <form className="form-grid" onSubmit={submit}>
          <label>
            내 이름
            <input value={form.me.name} onChange={(e) => update('me', 'name', e.target.value)} required />
          </label>
          <label>
            내 생년월일
            <input type="date" value={form.me.birthDate} onChange={(e) => update('me', 'birthDate', e.target.value)} required />
          </label>
          <label>
            내 출생시간
            <input type="time" value={form.me.birthTime} onChange={(e) => update('me', 'birthTime', e.target.value)} required />
          </label>
          <label>
            상대 이름
            <input value={form.partner.name} onChange={(e) => update('partner', 'name', e.target.value)} required />
          </label>
          <label>
            상대 생년월일
            <input type="date" value={form.partner.birthDate} onChange={(e) => update('partner', 'birthDate', e.target.value)} required />
          </label>
          <label>
            상대 출생시간
            <input type="time" value={form.partner.birthTime} onChange={(e) => update('partner', 'birthTime', e.target.value)} required />
          </label>
          {error ? <p className="error full">{error}</p> : null}
          <button className="primary-button full" disabled={loading}>{loading ? '궁합을 읽는 중...' : '우리 궁합 무료로 확인하기'}</button>
        </form>
      </SectionCard>

      {result ? (
        <SectionCard eyebrow="COMPATIBILITY RESULT" title="궁합 무료 결과">
          <p className="score">{result.score}점</p>
          <p className="lead">{result.summary}</p>
          <div className="split-grid">
            <div className="mini-panel">
              <h3>좋은 점</h3>
              <ul className="bullet-list">{result.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="mini-panel">
              <h3>주의 포인트</h3>
              <ul className="bullet-list blurred">{result.cautions.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
          <a href={`/checkout?product=compatibility_report&compatibilityId=${result.id}`} className="primary-button block-button">우리 궁합 자세히 보기 · 24,900원</a>
        </SectionCard>
      ) : null}
    </LayoutShell>
  );
}
