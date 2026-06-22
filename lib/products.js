export const products = [
  {
    code: 'saju_premium_report',
    name: '상세 사주 리포트',
    price: 29900,
    type: 'one_time',
    description: '성향, 재물, 연애, 직업 흐름을 한 번에 보는 상세 해석'
  },
  {
    code: 'compatibility_report',
    name: '궁합 리포트',
    price: 24900,
    type: 'one_time',
    description: '두 사람의 궁합 점수와 관계 포인트 리포트'
  },
  {
    code: 'premium_30d',
    name: '프리미엄 30일',
    price: 55000,
    type: 'pass',
    description: 'AI 해석 확장, 대운·세운 상세, 결과 저장/재열람'
  }
];

export function getProduct(code) {
  return products.find((p) => p.code === code);
}
