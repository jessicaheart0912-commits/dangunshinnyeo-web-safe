import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';

export default function RefundPage() {
  return (
    <LayoutShell>
      <SectionCard eyebrow="REFUND POLICY" title="환불정책" accent>
        <p className="lead">단군신녀는 디지털 콘텐츠 특성을 고려하여 아래 기준으로 환불을 처리합니다.</p>
      </SectionCard>

      <SectionCard title="1. 환불 가능 기준">
        <ul className="bullet-list">
          <li>중복 결제 또는 승인 오류가 발생한 경우</li>
          <li>서비스 장애로 구매한 콘텐츠를 정상적으로 제공받지 못한 경우</li>
          <li>관련 법령 또는 별도 고지 기준에 따라 환불이 필요한 경우</li>
        </ul>
      </SectionCard>

      <SectionCard title="2. 환불 제한 기준">
        <ul className="bullet-list">
          <li>리포트 열람 또는 콘텐츠 소비가 완료된 디지털 상품</li>
          <li>이용자의 단순 변심으로 이미 제공이 완료된 맞춤형 해석 상품</li>
        </ul>
      </SectionCard>

      <SectionCard title="3. 환불 접수 방법">
        <ul className="bullet-list">
          <li>주문번호와 함께 고객센터 또는 이메일로 접수</li>
          <li>확인 후 결제수단 기준으로 환불 진행</li>
          <li>환불 소요 기간은 PG사 및 카드사 정책에 따라 달라질 수 있음</li>
        </ul>
      </SectionCard>
    </LayoutShell>
  );
}
