import { NextResponse } from 'next/server';
import { getPaymentGuide } from '@/lib/payment';
import { getProduct } from '@/lib/products';
import { getStore, now, uid } from '@/lib/store';

export async function POST(req) {
  const body = await req.json();
  const product = getProduct(body.productCode);
  if (!product) {
    return NextResponse.json({ error: '유효하지 않은 상품입니다.' }, { status: 400 });
  }

  const order = {
    id: uid('order'),
    userId: 'guest-user',
    productCode: product.code,
    productName: product.name,
    orderName: product.name,
    amount: product.price,
    status: 'pending',
    reportId: body.reportId || null,
    compatibilityId: body.compatibilityId || null,
    customerName: body.customerName || '게스트',
    createdAt: now()
  };

  getStore().orders.push(order);
  return NextResponse.json({ order, payment: getPaymentGuide(order) }, { status: 201 });
}
