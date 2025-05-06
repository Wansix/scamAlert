import { NextResponse } from 'next/server';
import { analyzeScam } from '@/lib/analyzeScam';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: '분석할 메시지가 필요합니다.' },
        { status: 400 }
      );
    }

    const result = await analyzeScam(message);
    
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error analyzing scam:', error);
    return NextResponse.json(
      { error: '메시지 분석 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 