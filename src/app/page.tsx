'use client';

import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    reasons: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      alert('메시지를 입력해주세요!');
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const res = await fetch('/api/analyze-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText }),
      });
      const data = await res.json();
      if (data.result) {
        setAnalysisResult(data.result);
      } else {
        setError('AI 분석 결과를 받아올 수 없습니다.');
      }
    } catch (e) {
      setError('분석 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-8">스캠코인 경고 분석기</h1>
          
          <div className="flex flex-col gap-3 mb-8 w-full max-w-xl">
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">의심되는 메시지를 입력하세요</label>
            <div className="text-gray-400 text-sm">카톡 메시지를 붙여넣어주세요...</div>
            <textarea
              id="message"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-48"
            />
            <button
              onClick={handleAnalyze}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors self-end"
            >
            분석하기
          </button>

          {loading && <div className="mt-8 text-blue-500">AI 분석 중...</div>}
          {error && <div className="mt-8 text-red-500">{error}</div>}
          {analysisResult && (
            <div className="mt-8 p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">AI 분석 결과</h2>
              <div className="mb-4">
                <span className="font-semibold">사기 위험 점수:</span>
                <span className={`ml-2 px-3 py-1 rounded-full ${
                  analysisResult.score >= 80 ? 'bg-red-500' :
                  analysisResult.score >= 50 ? 'bg-yellow-500' :
                  'bg-green-500'
                } text-white`}>
                  {analysisResult.score}점
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">분석 내용(사유):</h3>
                <ul className="list-disc pl-5">
                  {analysisResult.reasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {/* 초기 안내 메시지 */}
          {!analysisResult && !loading && !error && (
            <div className="mt-8 text-gray-500">분석할 메시지를 입력하고 "분석" 버튼을 눌러주세요.</div>
          )}
        </div>
      </div>
    </main>
  );
}
