import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';
import { getStore } from '@/lib/store';

export default function ResultPage({ params }) {
  const store = getStore();
  const report = store.reports.find((item) => item.id === params.id);

  if (!report) {
    return (
      <LayoutShell>
        <SectionCard eyebrow="EMPTY STATE" title="결과를 찾을 수 없어요">
          <p className="lead">세션이 초기화되었거나 잘못된 접근입니다.</p>
          <Link href="/saju" className="primary-button">다시 생성</Link>
        </SectionCard>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell>
      <SectionCard eyebrow="FREE RESULT" title={`${report.input.name}님의 무료 사주 요약`} accent>
        <p className="lead">{report.summary}</p>
        <div className="tag-row">
          <span className="tag">강한 기운 {report.metadata.dominantElement}</span>
          <span className="tag">보완 기운 {report.metadata.weakElement}</span>
          <span className="tag">기질 {report.metadata.tone}</span>
        </div>
      </SectionCard>

      <SectionCard eyebrow="BASIC READING" title="기본 해석">
        <ul className="bullet-list">
          {report.basic.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </SectionCard>

      <SectionCard eyebrow="TODAY PREVIEW" title="오늘 흐름 미리보기">
        <p className="lead">{report.todayPreview}</p>
      </SectionCard>

      <SectionCard eyebrow="PREMIUM PAYWALL" title="여기서부터 당신의 핵심 흐름이 열립니다" accent>
        <p className="lead">무료 결과는 기본 흐름만 보여줍니다. 상세 리포트에서는 연애, 재물, 직업, 관계 흐름을 더 깊게 확인할 수 있어요.</p>
        <ul className="bullet-list blurred">
          {report.premium.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="button-row">
          <Link href={`/checkout?product=saju_premium_report&reportId=${report.id}`} className="primary-button">내 상세 사주 이어서 보기 · 29,900원</Link>
          <Link href={`/checkout?product=premium_30d&reportId=${report.id}`} className="ghost-button">30일 프리미엄 열기 · 55,000원</Link>
        </div>
      </SectionCard>
    </LayoutShell>
  );
}
