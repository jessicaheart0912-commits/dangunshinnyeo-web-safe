export function getSiteConfig() {
  return {
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME || '단군신녀',
    serviceEmail: process.env.NEXT_PUBLIC_SERVICE_EMAIL || 'support@example.com',
    kakaoChannel: process.env.NEXT_PUBLIC_KAKAO_CHANNEL || '@dangunshinnyeo',
    businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || '단군신녀',
    businessOwner: process.env.NEXT_PUBLIC_BUSINESS_OWNER || '대표자명',
    businessNumber: process.env.NEXT_PUBLIC_BUSINESS_NUMBER || '000-00-00000',
    mailOrderNumber: process.env.NEXT_PUBLIC_MAIL_ORDER_NUMBER || '제0000-서울-0000호',
    address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '사업장 주소를 입력하세요',
    phone: process.env.NEXT_PUBLIC_SERVICE_PHONE || '고객센터 번호를 입력하세요'
  };
}
