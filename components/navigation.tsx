import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'

const links = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/projects', label: 'Projetos' },
  { href: '/services', label: 'Serviços' },
  { href: '/blog', label: 'Blog' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contact', label: 'Contato' },
]

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-wide">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 font-mono text-brand">
            HP
          </span>
          <div className="leading-tight">
            <p className="text-xs uppercase text-slate-400">Full Stack & Cloud</p>
            <p>Hebert Paes</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20 md:inline-flex"
        >
          Vamos conversar
        </Link>
        <button className="inline-flex items-center justify-center rounded-full border border-white/15 p-2 text-white md:hidden" aria-label="Abrir menu">
          <FiMenu size={20} />
        </button>
      </div>
    </header>
  )
}
