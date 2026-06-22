import PaymentSuccessClient from '@/components/PaymentSuccessClient';

export default function PaymentSuccessPage({ searchParams }) {
  return (
    <PaymentSuccessClient
      orderId={searchParams.orderId || ''}
      paymentKey={searchParams.paymentKey || ''}
      amount={searchParams.amount || ''}
    />
  );
}
