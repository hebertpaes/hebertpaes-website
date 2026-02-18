import Link from 'next/link'

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hebertpaes/' },
  { label: 'GitHub', href: 'https://github.com/hebertpaes' },
  { label: 'Email', href: 'mailto:contato@hebertpaes.com' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Hebert Paes. Todos os direitos reservados.</p>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
