import { Project } from '@/content/projects'
import { FiArrowUpRight } from 'react-icons/fi'
import Link from 'next/link'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card-glass flex flex-col gap-4 rounded-3xl p-6 transition hover:-translate-y-1 hover:border-white/40">
      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>{project.category}</span>
        <span>{project.year}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{project.description}</p>
      </div>
      <p className="text-sm text-slate-400">{project.impact}</p>
      <div className="flex flex-wrap gap-2 text-xs text-slate-200">
        {project.stack.map((item) => (
          <span key={item} className="rounded-full border border-white/15 px-3 py-1">
            {item}
          </span>
        ))}
      </div>
      <Link
        href={project.link}
        className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:text-brand-secondary"
      >
        Ver estudo completo <FiArrowUpRight />
      </Link>
    </div>
  )
}
