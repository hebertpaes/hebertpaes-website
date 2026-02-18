import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'
import { ServiceCard } from '@/components/service-card'
import { BlogCard } from '@/components/blog-card'
import { Footer } from '@/components/footer'
import { projects } from '@/content/projects'
import { services } from '@/content/services'
import { posts } from '@/content/posts'
import { FiArrowUpRight } from 'react-icons/fi'

export default function Home() {
  const featuredProjects = projects.slice(0, 3)
  const latestPosts = posts.slice(0, 3)

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-16">
        <section className="grid gap-12 rounded-[40px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-2xl shadow-cyan-500/10 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Full Stack & Cloud</p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Construo experiências digitais com <span className="text-gradient">Next.js 14</span>, dados e automação no Azure.
            </h1>
            <p className="text-base text-slate-300">
              Ajudo startups e equipes corporativas a lançar produtos rápidos, monitoráveis e prontos para crescer — do design de arquitetura ao deploy automatizado.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="#contato"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Agendar conversa <FiArrowUpRight />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition hover:border-white/40"
              >
                Ver portfólio
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[{ label: 'Projetos entregues', value: '35+' }, { label: 'Anos de experiência', value: '10' }, { label: 'NPS médio', value: '92' }].map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-3xl font-semibold text-white">{item.value}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-glass rounded-[32px] p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-brand">Status</span>
                <span className="text-xs text-slate-400">Disponível para março</span>
              </div>
              <p className="text-lg text-slate-200">
                &ldquo;Hebert entrou no projeto, reorganizou nossa arquitetura e entregou o pipeline em menos de 6 semanas.&rdquo;
              </p>
              <p className="text-sm font-semibold text-white">— Andrea Oliveira, CTO na Desbrava</p>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Últimos destaques</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  <li className="flex items-center justify-between">
                    Pipeline IA editorial <span className="text-slate-400">2025</span>
                  </li>
                  <li className="flex items-center justify-between">
                    Hub de propostas dinâmicas <span className="text-slate-400">2024</span>
                  </li>
                  <li className="flex items-center justify-between">
                    Radar ESG industrial <span className="text-slate-400">2023</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="grid gap-10 md:grid-cols-[1.2fr,0.8fr]">
          <div className="card-glass rounded-[32px] p-8">
            <SectionHeading
              eyebrow="Sobre mim"
              title="Do discovery ao deploy."
              description="Atuo como parceiro técnico end-to-end: mergulho na dor, desenho a solução, lidero o time e garanto que esteja monitorada e documentada."
            />
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <p>
                Já liderei squads remotos em bancos, govtechs e healthtechs. Meu foco é entregar software elegante, mensurável e que conversa com os indicadores do negócio.
              </p>
              <p>
                Em paralelo, crio conteúdo sobre arquitetura, automação e o choque entre experiência do usuário e constraints de engenharia.
              </p>
            </div>
          </div>
          <div className="card-glass rounded-[32px] p-8 space-y-4">
            <h3 className="text-lg font-semibold text-white">Stack favorita</h3>
            <ul className="space-y-2 text-sm text-slate-200">
              {['Next.js 14 + React Server Components', 'Azure Static Web Apps & Functions', 'GitHub Actions', 'PostgreSQL / Cosmos DB', 'Application Insights + Checkly'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="projetos" className="space-y-10">
          <SectionHeading
            eyebrow="Projetos"
            title="Produtos que conectam estratégia e execução"
            description="Alguns estudos mais recentes. Cada projeto nasce com instrumentação, documentação e automação desde o dia um."
          />
          <div className="section-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="text-right">
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
              Ver todos os projetos <FiArrowUpRight />
            </Link>
          </div>
        </section>

        <section id="servicos" className="space-y-10">
          <SectionHeading
            eyebrow="Serviços"
            title="Engajamentos sob medida"
            description="Escolha o formato que faz sentido para seu time: posso atuar como squad líder, consultor mão na massa ou advisor técnico."
          />
          <div className="section-grid">
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </section>

        <section id="blog" className="space-y-10">
          <SectionHeading
            eyebrow="Conteúdo"
            title="Insights e aprendizados de campo"
            description="Artigos sobre arquitetura, automação e liderança técnica. Tudo que eu gostaria que tivessem me contado antes."
          />
          <div className="section-grid">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-right">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
              Ir para o blog <FiArrowUpRight />
            </Link>
          </div>
        </section>

        <section id="contato" className="grid gap-10 md:grid-cols-2">
          <div className="card-glass rounded-[32px] p-8 space-y-6">
            <SectionHeading
              eyebrow="Contato"
              title="Vamos criar o próximo release"
              description="Conte um pouco sobre o desafio e eu retorno em até 1 dia útil com possibilidades de agenda."
            />
            <div className="space-y-3 text-sm text-slate-300">
              <p>✉️ contato@hebertpaes.com</p>
              <p>📍 Remoto • Base em São Paulo</p>
              <p>
                Estou aberto a projetos fixos, pacotes de horas e advisor mensal. Também posso participar de talks internas.
              </p>
            </div>
            <div className="flex gap-4 text-sm text-slate-300">
              <Link href="https://www.linkedin.com/in/hebertpaes" target="_blank" className="underline-offset-4 hover:underline">
                LinkedIn
              </Link>
              <Link href="https://github.com/hebertpaes" target="_blank" className="underline-offset-4 hover:underline">
                GitHub
              </Link>
            </div>
          </div>
          <form
            action="https://formsubmit.co/contato@hebertpaes.com"
            method="POST"
            className="card-glass rounded-[32px] p-8 space-y-4"
          >
            <input type="hidden" name="_captcha" value="false" />
            <label className="space-y-2 text-sm">
              <span>Nome</span>
              <input
                name="nome"
                required
                className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand"
                placeholder="Seu nome"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span>Email corporativo</span>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand"
                placeholder="nome@empresa.com"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span>Conte sobre o projeto</span>
              <textarea
                name="mensagem"
                rows={4}
                required
                className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand"
                placeholder="Objetivos, prazo ideal, stack atual..."
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Enviar mensagem
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}
