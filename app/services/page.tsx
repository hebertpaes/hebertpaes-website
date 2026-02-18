import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SectionHeading } from '@/components/section-heading'
import { services } from '@/content/services'
import { ServiceCard } from '@/components/service-card'

export const metadata = {
  title: 'Serviços',
  description: 'Engajamentos flexíveis que equilibram estratégia e execução técnica.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <SectionHeading
          eyebrow="Serviços"
          title="Modelos de trabalho"
          description="Escolha entre projetos fechados, times dedicados ou mentoria executiva. Todos incluem rituais, dashboards e handover organizado."
        />
        <div className="section-grid">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
