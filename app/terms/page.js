import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';
import { getSiteConfig } from '@/lib/site';

export default function TermsPage() {
  const site = getSiteConfig();

  return (
    <LayoutShell>
      <SectionCard eyebrow="TERMS OF SERVICE" title="이용약관" accent>
        <p className="lead">본 약관은 {site.brandName} 웹서비스의 이용과 관련한 기본 조건을 정합니다.</p>
      </SectionCard>

      <SectionCard title="1. 서비스 성격">
        <ul className="bullet-list">
          <li>본 서비스는 사주/궁합 콘텐츠 및 해석 정보를 제공합니다.</li>
          <li>제공 결과는 참고용 콘텐츠이며 의료, 법률, 투자 판단을 대체하지 않습니다.</li>
        </ul>
      </SectionCard>

      <SectionCard title="2. 구매 및 이용">
        <ul className="bullet-list">
          <li>이용자는 상품 상세 내용과 가격을 확인한 뒤 구매합니다.</li>
          <li>결제 완료 후 해당 상품 또는 권한이 즉시 부여될 수 있습니다.</li>
          <li>비정상 사용, 부정 결제, 권리 침해 시 이용 제한이 있을 수 있습니다.</li>
        </ul>
      </SectionCard>

      <SectionCard title="3. 책임 제한">
        <ul className="bullet-list">
          <li>서비스 결과 해석 및 활용에 대한 최종 판단은 이용자 본인에게 있습니다.</li>
          <li>천재지변, 시스템 장애, 외부 PG 이슈 등으로 인한 일시적 중단이 발생할 수 있습니다.</li>
        </ul>
      </SectionCard>

      <SectionCard title="4. 사업자 정보">
        <ul className="bullet-list">
          <li>상호: {site.businessName}</li>
          <li>대표자: {site.businessOwner}</li>
          <li>사업자등록번호: {site.businessNumber}</li>
          <li>통신판매업신고번호: {site.mailOrderNumber}</li>
          <li>주소: {site.address}</li>
        </ul>
      </SectionCard>
    </LayoutShell>
  );
}
