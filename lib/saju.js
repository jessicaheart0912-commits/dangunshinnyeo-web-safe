function hash(str) {
  return Array.from(str).reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

const elements = ['목', '화', '토', '금', '수'];
const tones = ['차분함', '직관적임', '결단력', '신중함', '유연함'];
const fortunes = ['상승 흐름', '변화 주의', '기회 포착', '재정 정비', '관계 확장'];

export function generateBasicReading(input) {
  const seed = hash(JSON.stringify(input));
  const dominant = elements[seed % elements.length];
  const weak = elements[(seed + 2) % elements.length];
  const tone = tones[seed % tones.length];
  const today = fortunes[(seed + new Date().getDate()) % fortunes.length];

  return {
    summary: `${input.name || '사용자'}님은 ${tone}이 강하고 ${dominant}의 기운이 두드러집니다.`,
    basic: [
      `타고난 기질은 ${tone} 중심으로 나타나며 중요한 순간에 몰입도가 높습니다.`,
      `${dominant} 기운이 강해 추진력과 회복력이 좋지만 ${weak} 기운은 보완이 필요합니다.`,
      '사람과의 관계에서는 처음엔 신중하지만, 신뢰가 쌓이면 깊게 연결되는 타입입니다.'
    ],
    todayPreview: `오늘은 ${today}의 흐름이 보이므로 중요한 결정은 오후에 정리하는 편이 좋습니다.`,
    premium: [
      '재물운: 단기 수익보다 안정적 구조를 만드는 선택이 유리합니다.',
      '연애운: 감정 표현을 아끼지 않을수록 좋은 반응을 얻을 수 있습니다.',
      '직업운: 역할 확장과 협업 기회가 들어오는 시기입니다.',
      '건강운: 수면 패턴과 소화 관리에 신경 쓰면 컨디션 차이가 줄어듭니다.'
    ],
    metadata: {
      dominantElement: dominant,
      weakElement: weak,
      tone
    }
  };
}

export function generateCompatibility(a, b) {
  const seed = hash(JSON.stringify(a) + JSON.stringify(b));
  const score = 60 + (seed % 36);

  return {
    score,
    summary: score >= 80 ? '강한 끌림과 상호 보완성이 높은 궁합입니다.' : score >= 70 ? '일상 궁합이 무난하고 대화가 중요한 관계입니다.' : '서로의 리듬 차이를 이해하면 안정성이 높아지는 궁합입니다.',
    strengths: [
      '목표를 향해 함께 움직일 때 시너지가 큽니다.',
      '감정 표현 방식만 맞추면 갈등 회복이 빠릅니다.'
    ],
    cautions: [
      '감정이 누적되기 전에 기대치를 언어로 맞추는 것이 중요합니다.',
      '결정 속도가 다를 수 있으니 일정과 약속은 미리 정리하는 편이 좋습니다.'
    ]
  };
}

export function getPremiumByCode(code) {
  if (code === 'compatibility_report') {
    return ['관계 균형, 갈등 포인트, 장기 안정성, 대화 방식, 데이트/결혼 관점 상세 분석'];
  }
  if (code === 'premium_30d') {
    return ['AI 채팅 30일 확장', '대운·세운 확장 해석', '모든 리포트 재열람'];
  }
  return ['상세 사주 원문', '오행 분석', '재물·연애·직업·건강 심층 해석'];
}
