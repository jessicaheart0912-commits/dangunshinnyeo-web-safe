import { NextResponse } from 'next/server';
import { confirmTossPayment, getPaymentConfig } from '@/lib/payment';
import { getStore, now, uid } from '@/lib/store';

export async function POST(req) {
  const body = await req.json();
  const store = getStore();
  const order = store.orders.find((item) => item.id === body.orderId);
  const { mock, provider } = getPaymentConfig();

  if (!order) {
    return NextResponse.json({ error: '주문을 찾을 수 없습니다.' }, { status: 404 });
  }
  if (Number(body.amount) !== Number(order.amount)) {
    return NextResponse.json({ error: '결제 금액이 주문 금액과 다릅니다.' }, { status: 400 });
  }
  if (order.status === 'paid') {
    const existingEntitlement = store.entitlements.find((item) => item.orderId === order.id);
    return NextResponse.json({ ok: true, order, duplicate: true, entitlement: existingEntitlement || null });
  }

  let providerPayload = null;
  if (!mock && provider === 'toss') {
    try {
      providerPayload = await confirmTossPayment({
        paymentKey: body.paymentKey,
        orderId: body.orderId,
        amount: Number(body.amount)
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  order.status = 'paid';
  order.paidAt = now();

  const payment = {
    id: uid('payment'),
    orderId: order.id,
    paymentKey: body.paymentKey,
    amount: Number(body.amount),
    provider,
    status: 'done',
    providerPayload,
    createdAt: now()
  };

  const entitlement = {
    id: uid('entitlement'),
    orderId: order.id,
    userId: order.userId,
    productCode: order.productCode,
    status: 'active',
    grantedAt: now()
  };

  store.payments.push(payment);
  store.entitlements.push(entitlement);

  return NextResponse.json({ ok: true, order, payment, entitlement });
}
