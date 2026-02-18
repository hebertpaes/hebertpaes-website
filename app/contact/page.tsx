import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SectionHeading } from '@/components/section-heading'

export const metadata = {
  title: 'Contato',
  description: 'Conecte-se para discutir projetos, consultorias ou mentorias com Hebert Paes.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-4xl px-6 py-16 space-y-10">
        <SectionHeading
          eyebrow="Contato"
          title="Fale com Hebert"
          description="Envie contexto sobre seu desafio. Respondo em até um dia útil com próximos passos."
          alignment="center"
        />
        <div className="card-glass rounded-[32px] p-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Email</p>
              <p className="text-lg font-semibold text-white">contato@hebertpaes.com</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Disponibilidade</p>
              <p className="text-lg font-semibold text-white">Próxima janela: março/2026</p>
            </div>
          </div>
          <form action="https://formsubmit.co/contato@hebertpaes.com" method="POST" className="space-y-4">
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Novo projeto via hebertpaes.com" />
            <label className="space-y-2 text-sm">
              <span>Nome completo</span>
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
                type="email"
                name="email"
                required
                className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand"
                placeholder="nome@empresa.com"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span>Nome da empresa</span>
              <input
                name="empresa"
                className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand"
                placeholder="Org, startup, área"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span>Descreva o desafio</span>
              <textarea
                name="mensagem"
                rows={5}
                required
                className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand"
                placeholder="Objetivos, prazo, stack atual, stakeholders..."
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
