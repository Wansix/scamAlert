import { NextRequest, NextResponse } from 'next/server';
import { analyzeScam } from '@/lib/analyzeScam';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  try {
    const result = await analyzeScam(message);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
