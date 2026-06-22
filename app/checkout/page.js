import CheckoutClient from '@/components/CheckoutClient';
import { getPaymentGuide } from '@/lib/payment';
import { getProduct } from '@/lib/products';

export default function CheckoutPage({ searchParams }) {
  const paymentConfig = getPaymentGuide();
  const presetProduct = searchParams.product || 'saju_premium_report';
  const product = getProduct(presetProduct);

  return (
    <CheckoutClient
      presetProduct={presetProduct}
      reportId={searchParams.reportId || ''}
      compatibilityId={searchParams.compatibilityId || ''}
      paymentConfig={{ ...paymentConfig, defaultAmount: product?.price || 0 }}
    />
  );
}
