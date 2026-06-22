import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';
import { getStore } from '@/lib/store';

export default function AdminPage() {
  const store = getStore();
  const paidOrders = store.orders.filter((order) => order.status === 'paid');
  const sales = paidOrders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <LayoutShell>
      <SectionCard eyebrow="ADMIN DASHBOARD" title="단군신녀 관리자" accent>
        <p className="lead">결제 전환과 콘텐츠 사용 흐름을 관리하는 운영용 대시보드 목업입니다.</p>
      </SectionCard>

      <div className="stats-grid">
        <div className="stat-card"><span>리포트</span><strong>{store.reports.length}</strong></div>
        <div className="stat-card"><span>궁합</span><strong>{store.compatibilityReports.length}</strong></div>
        <div className="stat-card"><span>주문</span><strong>{store.orders.length}</strong></div>
        <div className="stat-card"><span>매출</span><strong>{sales.toLocaleString()}원</strong></div>
      </div>

      <SectionCard eyebrow="LATEST ORDERS" title="최근 주문">
        {store.orders.length ? (
          <ul className="bullet-list">
            {[...store.orders].reverse().slice(0, 10).map((item) => (
              <li key={item.id}>{item.id} · {item.productName} · {item.status} · {item.amount.toLocaleString()}원</li>
            ))}
          </ul>
        ) : <p className="muted">주문이 없습니다.</p>}
      </SectionCard>
    </LayoutShell>
  );
}
