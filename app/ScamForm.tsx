'use client';

import { useState } from 'react';

export default function ScamForm() {
  const [inputText, setInputText] = useState('');
  const [aiResult, setAiResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAiResult(null);
    setError(null);

    try {
      const res = await fetch('/api/analyze-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText }),
      });

      if (!res.ok) throw new Error('분석 중 오류가 발생했습니다.');

      const data = await res.json();
      setAiResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-emerald-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-red-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-emerald-100';
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
      <div className="w-72 border border-gray-400 text-center">
        <div className="py-2 border-b border-gray-400">사기 신고 시스템</div>
        <div className="py-2">소개</div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-4">
        <div className="w-full bg-yellow-200 flex flex-col items-center p-4">
          <div className="text-gray-700 mb-2">입력 폼.</div>
          <textarea
            className="w-full bg-yellow-200 border-none outline-none resize-none text-center text-gray-700" style={{ height: '300px' }}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-lime-400 w-40 py-2 text-gray-700 font-medium text-base hover:brightness-105 transition-all"
          disabled={loading}
        >
          {loading ? '분석 중...' : '버튼.'}
        </button>
      </form>

      {/* 에러 메시지 */}
      {error && (
        <div className="flex items-start gap-3 animate-fade-in">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-red-600 text-lg font-bold shadow">
              !
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl shadow p-4 text-red-700 text-base">
            {error}
          </div>
        </div>
      )}

      {/* 결과 메시지 */}
      {aiResult && (
        <div className="flex items-end gap-3 animate-fade-in">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              🤖
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 max-w-[90%]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-base font-semibold text-indigo-600">AI 분석 결과</span>
              <span className={`px-4 py-1 rounded-full text-sm font-bold ${getScoreBgColor(aiResult.score)} ${getScoreColor(aiResult.score)}`}>
                {aiResult.score}점
              </span>
            </div>
            <ul className="mt-2 space-y-2 text-gray-700 text-base">
              {aiResult.reasons.map((reason: string, idx: number) => (
                <li key={idx} className="pl-3 relative before:content-['💡'] before:absolute before:-left-3 before:text-indigo-400">
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}