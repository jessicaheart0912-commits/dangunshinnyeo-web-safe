'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';

export default function PaymentSuccessClient({ orderId, paymentKey, amount }) {
  const [state, setState] = useState({ status: 'loading', data: null, error: '' });

  useEffect(() => {
    async function confirm() {
      if (!orderId) {
        setState({ status: 'error', error: '주문번호가 없습니다.', data: null });
        return;
      }
      if (!paymentKey || !amount) {
        setState({ status: 'done', data: null, error: '' });
        return;
      }
      try {
        const res = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, paymentKey, amount: Number(amount) })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || '결제 승인 실패');
        setState({ status: 'done', data, error: '' });
      } catch (error) {
        setState({ status: 'error', data: null, error: error.message });
      }
    }
    confirm();
  }, [orderId, paymentKey, amount]);

  return (
    <LayoutShell>
      <SectionCard accent>
        <p className="eyebrow">결제 완료</p>
        <h1>{state.status === 'loading' ? '승인 확인 중...' : '구매가 정상 처리되었어요'}</h1>
        <p className="lead">주문번호: {orderId || '-'}</p>
      </SectionCard>

      <SectionCard title="구매 정보">
        {state.status === 'loading' ? <p>PG 승인 결과를 서버에서 확인하고 있습니다.</p> : null}
        {state.status === 'error' ? <p className="error">{state.error}</p> : null}
        {state.status === 'done' ? (
          <>
            <p>결제키: {paymentKey || `mock_${orderId}`}</p>
            <p>결제금액: {amount ? Number(amount).toLocaleString() : state.data?.order?.amount?.toLocaleString?.() || 0}원</p>
            <p>권한 상태: {state.data?.entitlement?.status || 'active'}</p>
          </>
        ) : null}
      </SectionCard>

      <div className="button-row">
        <Link href="/mypage" className="primary-button">마이페이지 보기</Link>
        <Link href="/" className="ghost-button">홈으로</Link>
      </div>
    </LayoutShell>
  );
}
