import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';
import { getStore } from '@/lib/store';

export default function MyPage() {
  const store = getStore();
  const reports = [...store.reports].reverse().slice(0, 5);
  const orders = [...store.orders].reverse().slice(0, 5);
  const entitlements = [...store.entitlements].reverse().slice(0, 5);

  return (
    <LayoutShell>
      <SectionCard eyebrow="MY PAGE" title="게스트의 신탁 보관함" accent>
        <p className="lead">사주 결과, 주문 내역, 프리미엄 권한을 한 화면에서 확인하는 단군신녀 톤의 마이페이지입니다.</p>
        <div className="tag-row">
          <span className="tag">최근 해석 {reports.length}건</span>
          <span className="tag">주문 {orders.length}건</span>
          <span className="tag">활성 권한 {entitlements.length}건</span>
        </div>
      </SectionCard>

      <SectionCard eyebrow="REPORT ARCHIVE" title="최근 리포트">
        {reports.length ? (
          <ul className="bullet-list">
            {reports.map((item) => <li key={item.id}>{item.input.name} · {item.createdAt.slice(0, 10)} · {item.summary}</li>)}
          </ul>
        ) : <p className="muted">아직 생성된 리포트가 없습니다.</p>}
      </SectionCard>

      <SectionCard eyebrow="ORDER HISTORY" title="최근 주문">
        {orders.length ? (
          <ul className="bullet-list">
            {orders.map((item) => <li key={item.id}>{item.productName} · {item.amount.toLocaleString()}원 · {item.status}</li>)}
          </ul>
        ) : <p className="muted">결제 내역이 없습니다.</p>}
      </SectionCard>

      <SectionCard eyebrow="PREMIUM STATUS" title="권한 상태">
        {entitlements.length ? (
          <ul className="bullet-list">
            {entitlements.map((item) => <li key={item.id}>{item.productCode} · {item.status}</li>)}</ul>
        ) : <p className="muted">활성 권한이 없습니다.</p>}
      </SectionCard>
    </LayoutShell>
  );
}
