import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../context/api'

export default function NewsDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/news/${slug}`).then(data => {
      setArticle(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="text-center py-20"><div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div></div>
  if (!article) return <div className="text-center py-20 text-gray-400"><p className="text-6xl mb-4">?</p><p>Article non trouve</p></div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="text-ocean-500 hover:text-ocean-600 mb-6 inline-block">← Retour aux actualites</Link>

      {article.image && (
        <div className="h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
        {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
        {article.isPublished && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">Publie</span>}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

      {article.excerpt && (
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>
      )}

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
        {article.content}
      </div>
    </div>
  )
}
