import { projects } from '@/content/projects'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'

export const metadata = {
  title: 'Projetos',
  description: 'Estudos completos e resultados alcançados com clientes dos últimos anos.',
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="mx-auto max-w-6xl px-6 py-16 space-y-12">
        <SectionHeading
          eyebrow="Portfólio"
          title="Seleção de projetos e produtos"
          description="Cada entrega inclui estratégia, implementação, documentação e monitoramento contínuo."
        />
        <div className="section-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
