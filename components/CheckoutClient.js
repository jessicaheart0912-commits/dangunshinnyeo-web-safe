'use client';

import { useEffect, useMemo, useState } from 'react';
import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';

const fallbackProducts = {
  saju_premium_report: { code: 'saju_premium_report', name: '상세 사주 리포트', price: 29900 },
  compatibility_report: { code: 'compatibility_report', name: '궁합 리포트', price: 24900 },
  premium_30d: { code: 'premium_30d', name: '프리미엄 30일', price: 55000 }
};

function loadTossSdk() {
  return new Promise((resolve, reject) => {
    if (window.TossPayments) return resolve(window.TossPayments);
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1/payment';
    script.async = true;
    script.onload = () => resolve(window.TossPayments);
    script.onerror = () => reject(new Error('토스페이먼츠 SDK 로드에 실패했습니다.'));
    document.body.appendChild(script);
  });
}

export default function CheckoutClient({ presetProduct = 'saju_premium_report', reportId, compatibilityId, paymentConfig }) {
  const [selected, setSelected] = useState(presetProduct);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    setSelected(presetProduct);
  }, [presetProduct]);

  const product = useMemo(() => fallbackProducts[selected], [selected]);
  const externalLink = paymentConfig?.payappLinks?.[selected] || '';

  async function createOrder() {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productCode: selected,
        reportId,
        compatibilityId,
        customerName: '게스트'
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '주문 생성 실패');
    setLatestOrder(data.order);
    return data.order;
  }

  async function handleMockOrder() {
    const order = await createOrder();
    const confirmRes = await fetch('/api/payments/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: order.id,
        paymentKey: `mock_${order.id}`,
        amount: order.amount
      })
    });
    const confirmData = await confirmRes.json();
    if (!confirmRes.ok) throw new Error(confirmData.error || '결제 승인 실패');
    window.location.href = `/payment/success?orderId=${order.id}`;
  }

  async function handleTossOrder() {
    if (!paymentConfig?.clientKey) {
      throw new Error('토스 실결제 키가 설정되지 않았습니다.');
    }

    const order = await createOrder();
    const TossPayments = await loadTossSdk();
    const toss = TossPayments(paymentConfig.clientKey);
    await toss.requestPayment('카드', {
      amount: order.amount,
      orderId: order.id,
      orderName: order.orderName,
      customerName: order.customerName || '게스트',
      successUrl: `${window.location.origin}${paymentConfig.successPath}`,
      failUrl: `${window.location.origin}${paymentConfig.failPath}`
    });
  }

  async function handlePayappOrder() {
    if (!externalLink) {
      throw new Error('페이앱 상품별 결제링크가 아직 연결되지 않았습니다.');
    }
    const order = await createOrder();
    window.open(externalLink, '_blank', 'noopener,noreferrer');
    setMessage(`주문번호 ${order.id}가 생성되었습니다. 새 창에서 결제를 진행한 뒤 고객센터 또는 관리자에서 주문번호 기준으로 확인하세요.`);
  }

  async function handleOrder() {
    setSubmitting(true);
    setMessage('');
    try {
      if (paymentConfig?.mode === 'live' && paymentConfig?.provider === 'toss') {
        await handleTossOrder();
      } else if (paymentConfig?.mode === 'live' && paymentConfig?.provider === 'payapp') {
        await handlePayappOrder();
      } else {
        await handleMockOrder();
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <LayoutShell>
      <SectionCard eyebrow="PREMIUM CHECKOUT" title="열어볼 해석 상품 선택" accent>
        <div className="option-list">
          {Object.values(fallbackProducts).map((item) => (
            <button key={item.code} type="button" className={`option-card ${selected === item.code ? 'selected' : ''}`} onClick={() => setSelected(item.code)}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.price.toLocaleString()}원</span>
              </div>
              <span className="mini-chip">선택</span>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard eyebrow="PAYMENT GUIDE" title="결제 안내">
        <p className="lead"><strong>{paymentConfig?.provider === 'toss' ? '토스페이먼츠' : paymentConfig?.provider === 'payapp' ? '페이앱' : '포트원/기타'}</strong> · <strong>{paymentConfig?.mode === 'live' ? '실결제 모드' : '목업 모드'}</strong></p>
        <p className="lead">결제 후 바로 이용 안내를 확인할 수 있습니다.</p>
        <ul className="bullet-list">
          <li>{paymentConfig?.message}</li>
          <li>실서비스에서는 환불, 결제 확인, 권한 부여 프로세스를 함께 운영해야 합니다.</li>
          <li>{paymentConfig?.provider === 'payapp' ? '버튼을 누르면 안전한 결제 페이지로 이동합니다.' : '현재 MVP는 토스 기준 실결제 포인트와 목업 흐름을 함께 제공합니다.'}</li>
        </ul>
        <div className="payment-trust-row">
          <span>상품별 결제링크</span>
          <span>주문번호 생성</span>
          <span>빠른 판매 시작</span>
        </div>
        {paymentConfig?.provider === 'payapp' && paymentConfig?.mode === 'live' ? (
          <div className="info-banner">
            <strong>현재 선택 상품 링크</strong>
            <span>{externalLink ? '연결 완료 · 실제 판매 가능' : '미연결 - 환경변수에 URL 입력 필요'}</span>
          </div>
        ) : null}
        {latestOrder ? (
          <div className="mini-panel">
            <h3>최근 생성 주문</h3>
            <p className="lead">주문번호: {latestOrder.id}</p>
            <p className="lead">상품: {latestOrder.productName}</p>
          </div>
        ) : null}
        {message ? <p className="error">{message}</p> : null}
        <button className="primary-button block-button" disabled={submitting} onClick={handleOrder}>
          {submitting ? '결제 준비 중...' : selected === 'saju_premium_report' ? '29,900원 결제하고 해석 열기' : selected === 'compatibility_report' ? '24,900원 결제하고 궁합 보기' : '55,000원 결제하고 시작하기'}
        </button>
      </SectionCard>
    </LayoutShell>
  );
}
