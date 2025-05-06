export const metadata = {
  title: '스캠코인 경고 분석기',
  description: '카톡 메시지를 분석하여 스캠코인 위험도를 확인하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  )
}
