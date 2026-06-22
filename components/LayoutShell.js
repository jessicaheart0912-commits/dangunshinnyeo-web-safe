import Link from 'next/link';
import { getSiteConfig } from '@/lib/site';

const nav = [
  { href: '/', label: '홈' },
  { href: '/saju', label: '사주 해석' },
  { href: '/compatibility', label: '궁합' },
  { href: '/checkout', label: '결제' },
  { href: '/mypage', label: '마이' }
];

export default function LayoutShell({ children }) {
  const site = getSiteConfig();

  return (
    <div className="app-shell-wrap">
      <div className="bg-aura aura-left" />
      <div className="bg-aura aura-right" />
      <div className="app-shell">
        <header className="topbar glass-card">
          <div>
            <p className="eyebrow">KOREAN MYTH · MYSTIC FORTUNE</p>
            <Link href="/" className="brand">{site.brandName}</Link>
          </div>
          <div className="topbar-actions">
            <span className="topbar-chip">모바일 웹 MVP</span>
            <Link href="/admin" className="ghost-button small">운영</Link>
          </div>
        </header>
        <main className="content">{children}</main>

        <footer className="site-footer card">
          <div className="footer-links">
            <Link href="/terms">이용약관</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/refund">환불정책</Link>
            <Link href="/contact">고객센터</Link>
          </div>
          <div className="footer-meta">
            <strong>{site.businessName}</strong>
            <span>대표자 {site.businessOwner}</span>
            <span>사업자등록번호 {site.businessNumber}</span>
            <span>통신판매업신고번호 {site.mailOrderNumber}</span>
            <span>{site.address}</span>
            <span>문의 {site.serviceEmail}</span>
          </div>
          <p className="footer-disclaimer">본 서비스의 사주 및 궁합 콘텐츠는 참고용 정보이며, 의료·법률·투자 판단을 대체하지 않습니다.</p>
        </footer>

        <nav className="bottom-nav">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
