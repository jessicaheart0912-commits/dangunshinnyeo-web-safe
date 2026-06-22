const payappLinks = {
  saju_premium_report: process.env.NEXT_PUBLIC_PAYAPP_URL_SAJU_PREMIUM_REPORT || '',
  compatibility_report: process.env.NEXT_PUBLIC_PAYAPP_URL_COMPATIBILITY_REPORT || '',
  premium_30d: process.env.NEXT_PUBLIC_PAYAPP_URL_PREMIUM_30D || ''
};

export function getPaymentConfig() {
  const provider = process.env.NEXT_PUBLIC_PAYMENT_PROVIDER || 'toss';
  const mock = (process.env.NEXT_PUBLIC_MOCK_PAYMENT || 'true') === 'true';
  return { provider, mock };
}

export function getPaymentGuide() {
  const { provider, mock } = getPaymentConfig();
  const base = {
    provider,
    mode: mock ? 'mock' : 'live',
    successPath: '/payment/success',
    failPath: '/payment/fail'
  };

  if (mock) {
    return {
      ...base,
      message: '현재는 목업 결제 모드입니다. 실결제를 사용하려면 결제수단 환경변수를 설정하세요.'
    };
  }

  if (provider === 'toss') {
    return {
      ...base,
      clientKey: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || '',
      message: '토스페이먼츠 결제창 연동 상태입니다.'
    };
  }

  if (provider === 'payapp') {
    return {
      ...base,
      payappLinks,
      message: '페이앱 링크결제 우선 오픈 모드입니다. 상품별 결제링크를 연결해 빠르게 판매를 시작할 수 있습니다.'
    };
  }

  return {
    ...base,
    storeId: process.env.PORTONE_STORE_ID || '',
    message: '포트원 결제창 연동 상태입니다.'
  };
}

export function getExternalPaymentLink(productCode) {
  return payappLinks[productCode] || '';
}

export async function confirmTossPayment({ paymentKey, orderId, amount }) {
  const secretKey = process.env.TOSS_SECRET_KEY;
  if (!secretKey) {
    throw new Error('TOSS_SECRET_KEY가 설정되지 않았습니다.');
  }

  const encodedKey = Buffer.from(`${secretKey}:`).toString('base64');
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
    cache: 'no-store'
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.message || '토스페이먼츠 승인에 실패했습니다.');
  }
  return payload;
}
