import ScamForm from './ScamForm'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <h1 className="text-3xl font-bold mb-8">사기 신고 시스템</h1>
      <ScamForm />
    </main>
  )
} 