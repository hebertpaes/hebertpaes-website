type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  alignment?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, alignment = 'left' }: SectionHeadingProps) {
  return (
    <div className={`space-y-2 ${alignment === 'center' ? 'text-center mx-auto max-w-3xl' : ''}`}>
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
      {description && <p className="text-base text-slate-300">{description}</p>}
    </div>
  )
}
