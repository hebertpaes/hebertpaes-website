import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts, getPostBySlug } from '@/content/posts'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `https://hebertpaes.com/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-3xl px-6 py-16 space-y-8">
        <div className="space-y-4">
          <Link href="/blog" className="text-sm text-slate-400 hover:text-white">
            ← Voltar para o blog
          </Link>
          <p className="text-sm text-slate-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
          </p>
          <h1 className="text-4xl font-semibold text-white">{post.title}</h1>
          <div className="flex flex-wrap gap-2 text-xs text-slate-200">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <article className="prose-custom space-y-4 text-lg">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </main>
      <Footer />
    </div>
  )
}
