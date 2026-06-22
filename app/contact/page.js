import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';
import { getSiteConfig } from '@/lib/site';

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <LayoutShell>
      <SectionCard eyebrow="CUSTOMER SUPPORT" title="고객센터 안내" accent>
        <p className="lead">결제, 환불, 이용 문의는 아래 채널로 접수해 주세요.</p>
      </SectionCard>

      <SectionCard title="문의 채널">
        <ul className="bullet-list">
          <li>이메일: {site.serviceEmail}</li>
          <li>카카오채널: {site.kakaoChannel}</li>
          <li>전화: {site.phone}</li>
        </ul>
      </SectionCard>

      <SectionCard title="운영 정보">
        <ul className="bullet-list">
          <li>상호: {site.businessName}</li>
          <li>대표자: {site.businessOwner}</li>
          <li>사업장 주소: {site.address}</li>
        </ul>
      </SectionCard>
    </LayoutShell>
  );
}
