import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'

const CATEGORIES = [
  { key: 'hikari', label: '光回線', icon: '🔌', desc: '速度重視ならコレ', color: 'from-blue-500 to-cyan-500' },
  { key: 'wifi', label: 'ポケットWi-Fi', icon: '📶', desc: '持ち運びOK', color: 'from-emerald-500 to-green-600' },
  { key: 'homerouter', label: 'ホームルーター', icon: '🏠', desc: '工事不要で快適', color: 'from-orange-500 to-amber-500' },
  { key: 'sim', label: '格安SIM', icon: '📱', desc: 'スマホ代を節約', color: 'from-purple-500 to-violet-600' },
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
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center group"
            >
              <div className={`bg-gradient-to-br ${cat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <span className="text-xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors">{cat.label}</h3>
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
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
