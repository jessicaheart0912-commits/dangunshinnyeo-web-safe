import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';

export default function PaymentFailPage() {
  return (
    <LayoutShell>
      <SectionCard title="결제가 완료되지 않았어요">
        <p>사용자가 취소했거나 승인 과정에서 오류가 발생했습니다.</p>
        <div className="button-row">
          <Link href="/checkout" className="primary-button">다시 시도</Link>
          <Link href="/" className="ghost-button">홈으로</Link>
        </div>
      </SectionCard>
    </LayoutShell>
  );
}
