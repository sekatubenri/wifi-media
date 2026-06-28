import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ネット回線ナビ｜光回線・Wi-Fi・格安SIM比較',
    template: '%s｜ネット回線ナビ',
  },
  description: '光回線・ポケットWi-Fi・ホームルーター・格安SIMを徹底比較。料金・速度・キャンペーンからあなたに最適な回線が見つかる。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ネット回線ナビ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9320888355424356" crossOrigin="anonymous" strategy="afterInteractive" />
        <header className="border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white text-sm font-bold px-2.5 py-1 rounded">NET</span>
              <span className="text-xl font-bold text-gray-900">回線ナビ</span>
            </a>
            <nav className="hidden md:flex gap-1 text-sm">
              <a href="/category/hikari" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">光回線</a>
              <a href="/category/wifi" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">ポケットWi-Fi</a>
              <a href="/category/homerouter" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">ホームルーター</a>
              <a href="/category/sim" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">格安SIM</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded">NET</span>
                <span className="text-sm font-bold text-gray-900">回線ナビ</span>
              </div>
              <nav className="flex gap-6 text-xs text-gray-400">
                <a href="/category/hikari" className="hover:text-gray-600">光回線</a>
                <a href="/category/wifi" className="hover:text-gray-600">ポケットWi-Fi</a>
                <a href="/category/homerouter" className="hover:text-gray-600">ホームルーター</a>
                <a href="/category/sim" className="hover:text-gray-600">格安SIM</a>
              </nav>
            </div>
            <nav className="flex justify-center gap-6 text-xs text-gray-400 mt-4">
              <a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a>
              <a href="/contact" className="hover:text-gray-600">お問い合わせ</a>
            </nav>
            <p className="text-center text-xs text-gray-300 mt-4">© 2026 ネット回線ナビ All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
