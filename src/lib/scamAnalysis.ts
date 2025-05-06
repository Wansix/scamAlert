export const analyzeScamMessage = (message: string) => {
  // 분석할 키워드들
  const scamKeywords = [
    '스캠', 'rug', 'pull', 'exit', 'dump', 'run', 'scam coin',
    'pump', 'dump', 'moon', '1000x', '100x', '10x', 'ape',
    'diamond', 'gem', 'hidden', 'secret', 'presale', 'private sale',
    'whitelist', 'early bird', 'first come', 'limited', 'exclusive'
  ];

  // 위험 점수 계산
  let riskScore = 0;
  const keywordsFound = [];

  scamKeywords.forEach(keyword => {
    if (message.toLowerCase().includes(keyword)) {
      keywordsFound.push(keyword);
      riskScore += 10;
    }
  });

  // 긴급성 표현이 있는지 확인
  if (message.toLowerCase().includes('now') || 
      message.toLowerCase().includes('immediately') ||
      message.toLowerCase().includes('hurry') ||
      message.toLowerCase().includes('urgent')) {
    riskScore += 15;
    keywordsFound.push('Urgency');
  }

  // 위험 점수를 100점 만점으로 정규화
  riskScore = Math.min(riskScore, 100);

  return {
    riskScore,
    keywordsFound,
    analysis: getAnalysisSummary(riskScore)
  };
};

const getAnalysisSummary = (score: number) => {
  if (score >= 80) {
    return '매우 위험한 스캠 의심. 투자하지 않는 것이 좋습니다.';
  } else if (score >= 50) {
    return '주의가 필요한 스캠 의심. 신중하게 검토해야 합니다.';
  } else {
    return '상대적으로 안전한 것으로 보입니다. 하지만 항상 주의가 필요합니다.';
  }
};
