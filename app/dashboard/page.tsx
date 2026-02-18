import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { recordings } from '@/content/recordings'
import { SectionHeading } from '@/components/section-heading'
import { formatDate } from '@/lib/utils'

export const metadata = {
  title: 'Dashboard de Gravações',
  description: 'Central única com todas as gravações de workshops, demos e revisões técnicas feitas por Hebert Paes.',
}

const stats = [
  {
    label: 'Total de gravações',
    value: `${recordings.length}`,
    detail: 'Desde out/2025',
  },
  {
    label: 'Tempo acumulado',
    value: '2h 56min',
    detail: 'Somatório das sessões listadas',
  },
  {
    label: 'Clientes atendidos',
    value: `${new Set(recordings.map((r) => r.customer)).size}`,
    detail: 'Workshops e demos',
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <SectionHeading
          eyebrow="Dashboard"
          title="Gravações do Hebert"
          description="Acompanhe workshops, demos e revisões com player embutido e metadados essenciais."
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="card-glass rounded-3xl p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.detail}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {recordings.map((recording) => (
            <div key={recording.id} className="card-glass rounded-[32px] p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full md:w-1/3">
                  <video
                    controls
                    preload="metadata"
                    poster={recording.thumbnail}
                    className="aspect-video w-full rounded-2xl border border-white/10"
                  >
                    <source src={recording.videoUrl} type="video/mp4" />
                    Seu navegador não suporta vídeo HTML5.
                  </video>
                </div>
                <div className="flex w-full flex-col gap-4 md:w-2/3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{recording.title}</h3>
                      <p className="text-sm text-slate-400">{recording.customer}</p>
                    </div>
                    <span className="rounded-full border border-white/15 px-4 py-1 text-sm text-slate-200">
                      {recording.duration}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                    <p>
                      Gravado em <time dateTime={recording.recordedAt}>{formatDate(recording.recordedAt)}</time>
                    </p>
                    <p>Tamanho: {recording.size}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                    {recording.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/15 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
