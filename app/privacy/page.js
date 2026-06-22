import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';
import { getSiteConfig } from '@/lib/site';

export default function PrivacyPage() {
  const site = getSiteConfig();

  return (
    <LayoutShell>
      <SectionCard eyebrow="PRIVACY POLICY" title="개인정보처리방침" accent>
        <p className="lead">{site.brandName}는 서비스 제공을 위해 필요한 최소한의 개인정보만 수집·이용합니다.</p>
      </SectionCard>

      <SectionCard title="1. 수집 항목">
        <ul className="bullet-list">
          <li>이름, 생년월일, 출생시간, 출생지역, 성별</li>
          <li>결제 시 주문정보, 결제 승인 정보, 구매 상품 정보</li>
          <li>문의 접수 시 이메일 또는 연락처</li>
        </ul>
      </SectionCard>

      <SectionCard title="2. 수집 및 이용 목적">
        <ul className="bullet-list">
          <li>사주/궁합 리포트 생성 및 결과 제공</li>
          <li>결제 처리, 주문 확인, 환불 및 고객 응대</li>
          <li>서비스 품질 개선 및 부정 이용 방지</li>
        </ul>
      </SectionCard>

      <SectionCard title="3. 보관 기간">
        <ul className="bullet-list">
          <li>주문 및 결제 정보: 관련 법령 또는 내부 정책에 따른 보관</li>
          <li>리포트 정보: 회원 또는 게스트 보관 정책에 따라 관리</li>
          <li>불필요한 정보는 목적 달성 후 지체 없이 파기</li>
        </ul>
      </SectionCard>

      <SectionCard title="4. 제3자 제공 및 처리위탁">
        <p className="lead">결제 처리를 위해 PG사(예: 토스페이먼츠) 등 필요한 범위 내에서 정보가 처리될 수 있습니다.</p>
      </SectionCard>

      <SectionCard title="5. 이용자 문의">
        <ul className="bullet-list">
          <li>상호: {site.businessName}</li>
          <li>대표자: {site.businessOwner}</li>
          <li>이메일: {site.serviceEmail}</li>
          <li>고객센터: {site.phone}</li>
          <li>주소: {site.address}</li>
        </ul>
      </SectionCard>
    </LayoutShell>
  );
}
