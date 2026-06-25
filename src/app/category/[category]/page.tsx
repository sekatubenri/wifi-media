import { getArticlesByCategory, getCategoryLabel } from '@/lib/articles'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const label = getCategoryLabel(category)
  return {
    title: `${label}の記事一覧`,
    description: `${label}に関する記事一覧。転職成功に役立つ情報を掲載。`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const label = getCategoryLabel(category)
  const articles = getArticlesByCategory(category)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <span className="w-1 h-6 bg-blue-700 rounded-full"></span>
        {label}
      </h1>

      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">記事はまだありません。</p>
          <Link href="/" className="text-blue-700 text-sm mt-4 inline-block hover:underline">← トップに戻る</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 h-28 flex items-center justify-center">
                <span className="text-3xl opacity-30">📄</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-sm leading-relaxed mb-3 line-clamp-3 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link href="/" className="text-blue-700 text-sm font-medium hover:underline">← トップに戻る</Link>
      </div>
    </div>
  )
}
