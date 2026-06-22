import './globals.css';
import { getSiteConfig } from '@/lib/site';

export function generateMetadata() {
  const site = getSiteConfig();
  return {
    title: `${site.brandName} | 프리미엄 사주·궁합`,
    description: '한국 신화와 신비로운 무속 분위기를 담은 프리미엄 사주·궁합 웹서비스',
    metadataBase: new URL('https://example.com')
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
