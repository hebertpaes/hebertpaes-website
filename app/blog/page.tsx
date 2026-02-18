import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SectionHeading } from '@/components/section-heading'
import { posts } from '@/content/posts'
import { BlogCard } from '@/components/blog-card'

export const metadata = {
  title: 'Blog',
  description: 'Artigos sobre arquitetura, automação e liderança técnica escritos por Hebert Paes.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <SectionHeading
          eyebrow="Blog"
          title="Notas de campo"
          description="A cada projeto registro aprendizados que ajudam o próximo time a acelerar decisões."
        />
        <div className="section-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
