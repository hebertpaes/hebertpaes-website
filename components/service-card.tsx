import { Service } from '@/content/services'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="card-glass group flex flex-col gap-4 rounded-3xl p-6">
      <span className="w-fit rounded-full border border-white/15 px-3 py-1 text-xs text-brand">{service.badge}</span>
      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
      <p className="text-sm text-slate-300">{service.description}</p>
      <ul className="mt-2 space-y-2 text-sm text-slate-200">
        {service.deliverables.map((deliverable) => (
          <li key={deliverable} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-brand" />
            {deliverable}
          </li>
        ))}
      </ul>
    </div>
  )
}
