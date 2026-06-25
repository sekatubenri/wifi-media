import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'

const CATEGORIES = [
  { key: 'hikari', label: '光回線', emoji: '🔌', desc: '速度重視ならコレ' },
  { key: 'wifi', label: 'ポケットWi-Fi', emoji: '📶', desc: '持ち運びOK' },
  { key: 'homerouter', label: 'ホームルーター', emoji: '🏠', desc: '工事不要で快適' },
  { key: 'sim', label: '格安SIM', emoji: '📱', desc: 'スマホ代を節約' },
]

export default function Home() {
  const articles = getAllArticles()

  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-600 to-emerald-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            あなたに最適な<br className="md:hidden" />ネット回線が見つかる。
          </h1>
          <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
            光回線・ポケットWi-Fi・ホームルーター・格安SIMを<br className="hidden md:block" />
            料金・速度・キャンペーンで徹底比較。
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/category/${cat.key}`}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <h3 className="font-bold text-sm text-gray-900 mt-2">{cat.label}</h3>
              <p className="text-xs text-gray-400 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <span className="w-1 h-6 bg-emerald-600 rounded-full"></span>
          最新記事
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 h-32 flex items-center justify-center">
                <span className="text-4xl opacity-30">📡</span>
              </div>
              <div className="p-5">
                <span className="inline-block text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full mb-3">
                  {article.categoryLabel}
                </span>
                <h3 className="font-bold text-gray-900 text-sm leading-relaxed mb-3 line-clamp-3 group-hover:text-emerald-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
