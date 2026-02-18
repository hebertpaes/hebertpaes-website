import { Post } from '@/content/posts'
import Link from 'next/link'
import { FiArrowUpRight } from 'react-icons/fi'
import { formatDate } from '@/lib/utils'

export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="card-glass flex flex-col gap-4 rounded-3xl p-6">
      <div className="text-sm text-slate-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time> • {post.readingTime}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{post.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{post.excerpt}</p>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-200">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-brand-secondary"
      >
        Ler artigo <FiArrowUpRight />
      </Link>
    </article>
  )
}
