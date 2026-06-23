import Link from 'next/link';
import LayoutShell from '@/components/LayoutShell';
import SectionCard from '@/components/SectionCard';


const services = [
  {
    title: '기본 사주풀이',
    desc: '이름, 생년월일, 출생시간으로 타고난 기운과 흐름을 빠르게 읽어주는 무료 진입 상품',
    badge: '무료 시작',
    href: '/saju'
  },
  {
    title: '오늘의 운세',
    desc: '연애, 금전, 인간관계 흐름을 오늘 기준으로 가볍게 확인하는 재방문형 카드',
    badge: '매일 확인',
    href: '/saju'
  },
  {
    title: '궁합 리포트',
    desc: '두 사람의 기질 충돌과 조화를 감정선 중심으로 풀어주는 전환형 상품',
    badge: '전환 상품',
    href: '/compatibility'
  },
  {
    title: 'AI 채팅 해석',
    desc: '질문을 던질수록 더 깊게 이어지는 프리미엄 해석 경험과 저장 기능',
    badge: '프리미엄',
    href: '/checkout?product=premium_30d'
  }
];

const reviews = [
  {
    name: '김서윤',
    tag: '30대 직장인',
    body: '기존 운세 서비스보다 훨씬 분위기가 강렬했고, 무료 결과만 보고도 결제까지 자연스럽게 넘어갔어요.'
  },
  {
    name: '박도현',
    tag: '베타 사용자',
    body: '단군과 신녀 캐릭터 덕분에 첫 화면에서 브랜드가 확 기억됐고, 궁합 카드가 특히 설득력 있었어요.'
  },
  {
    name: '이하린',
    tag: '콘텐츠 기획자',
    body: '다크한 보라 톤과 금색 포인트가 고급스럽고, CTA 구조가 명확해서 랜딩 완성도가 높아 보였어요.'
  }
];

const plans = [
  {
    name: '상세 사주 리포트',
    price: '₩29,900',
    description: '타고난 성향, 연애, 재물, 일 흐름까지 한 번에 보는 핵심 리포트',
    cta: '/checkout?product=saju_premium_report'
  },
  {
    name: '궁합 리포트',
    price: '₩24,900',
    description: '두 사람의 감정선과 관계 포인트를 깊게 보는 리포트',
    cta: '/checkout?product=compatibility_report'
  },
  {
    name: '프리미엄 30일',
    price: '₩55,000',
    description: '하루 약 1,833원 · AI 확장 해석과 저장/재열람을 포함한 30일 플랜',
    cta: '/checkout?product=premium_30d',
    featured: true
  }
];

const ritualSteps = [
  '생년월일·출생시간 입력',
  '무료 기본 해석 확인',
  '궁합/상세 리포트 결제',
  '마이페이지에서 재열람'
];

export default function HomePage() {
  return (
    <LayoutShell>
      <section className="landing-hero-panel glass-card glass-card--strong">
        <div className="hero-copy">
          <p className="eyebrow">FREE FIRST · MOBILE FAST CHECKOUT</p>
          <div className="hero-badge">무료 결과 확인 후 결제</div>
          <h1 className="hero-title">당신의 사주 흐름,<br />무료로 먼저 확인하고<br />필요한 해석만 깊게 구매하세요</h1>
          <p className="lead hero-lead">
            생년월일과 출생시간으로 기본 성향과 오늘 흐름을 먼저 확인하고,
            원하면 상세 사주 · 궁합 · 프리미엄 해석까지 바로 이어볼 수 있습니다.
          </p>
          <div className="button-row">
            <Link href="/saju" className="primary-button">내 사주 무료로 확인하기</Link>
            <Link href="/compatibility" className="ghost-button">궁합 먼저 확인하기</Link>
          </div>
          <div className="landing-metrics two-columns">
            <div><strong>무료 먼저</strong><span>기본 결과 확인 후 결제 선택</span></div>
            <div><strong>모바일 1분 시작</strong><span>짧은 입력으로 빠르게 진입</span></div>
            <div><strong>대표 해석 상품</strong><span>상세 사주 중심 전환 구조</span></div>
            <div><strong>PayApp Ready</strong><span>링크결제 즉시 판매 구조</span></div>
          </div>
        </div>

        <div className="hero-stage">
          <div className="hero-stage__halo" />
          <div className="hero-stage__card">
            <span className="mini-chip">MAIN HERO VISUAL</span>
            <h3>단군 · 신녀</h3>
            <p>무료 확인에서 결제 전환까지 한 흐름으로 이어지는 모바일 메인 스테이지</p>
            <div className="hero-runes">
              <span>신단수</span>
              <span>금빛 부적</span>
              <span>사주 오행</span>
            </div>
          </div>
        </div>
      </section>

      <SectionCard title="무료로 먼저 확인할 수 있는 항목" eyebrow="SERVICE ENTRY" accent>
        <div className="landing-service-grid">
          {services.map((service) => (
            <Link key={service.title} href={service.href} className="landing-service-card linked-card">
              <span className="service-badge">{service.badge}</span>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="card-link">지금 확인</span>
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="사주 이용 흐름" eyebrow="RITUAL FLOW">
        <div className="ritual-flow-grid">
          {ritualSteps.map((step, index) => (
            <article key={step} className="ritual-card">
              <span className="ritual-index">0{index + 1}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="후기 영역" eyebrow="TESTIMONIALS">
        <div className="landing-review-grid">
          {reviews.map((review) => (
            <article key={review.name} className="landing-review-card">
              <div className="stars">★★★★★</div>
              <p>{review.body}</p>
              <div className="review-user">
                <div className="review-avatar">{review.name[0]}</div>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="가장 많이 선택하는 해석 상품" eyebrow="PREMIUM OFFER" accent>
        <div className="landing-pricing-grid">
          {[plans[0], plans[2], plans[1]].map((plan) => (
            <article key={plan.name} className={`landing-pricing-card ${plan.featured ? 'featured' : ''}`}>
              {plan.featured ? <span className="service-badge">가장 깊은 해석</span> : null}
              {!plan.featured && plan.name === '상세 사주 리포트' ? <span className="service-badge">가장 많이 선택</span> : null}
              {!plan.featured && plan.name === '궁합 리포트' ? <span className="service-badge">연애·관계 특화</span> : null}
              <h3>{plan.name}</h3>
              <strong>{plan.price}</strong>
              <p>{plan.description}</p>
              <Link href={plan.cta} className={plan.name === '상세 사주 리포트' ? 'primary-button block-button' : 'ghost-button block-button'}>
                {plan.name === '상세 사주 리포트' ? '내 상세 해석 열기' : plan.name === '프리미엄 30일' ? '30일 프리미엄 시작하기' : '우리 궁합 자세히 보기'}
              </Link>
            </article>
          ))}
        </div>
        <div className="payment-trust-row">
          <span>카드결제 지원</span>
          <span>간편결제 확장 가능</span>
          <span>승인 검증 구조</span>
          <span>결제 후 권한 즉시 반영</span>
        </div>
      </SectionCard>
    </LayoutShell>
  );
}
