'use client';

import { useState } from 'react';
import ScamForm from '../../app/ScamForm'

export default function Home() {
  return (
    <main className="flex items-start justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex flex-col items-center w-full max-w-md gap-8">
        <h1 className="text-4xl font-bold text-center">사기 신고 시스템</h1>
        <ScamForm />
      </div>
    </main>
  )
}
