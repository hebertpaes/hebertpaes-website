export type Service = {
  title: string
  description: string
  deliverables: string[]
  badge: string
}

export const services: Service[] = [
  {
    title: 'Arquitetura e Cloud Readiness',
    description:
      'Blueprint completo para levar produtos ao Azure com segurança, observabilidade e custos sob controle.',
    deliverables: ['Landing Zone Azure', 'Pipelines IaC', 'Playbook de custeio'],
    badge: 'Cloud',
  },
  {
    title: 'Desenvolvimento Full Stack',
    description:
      'Aplicações modernas em Next.js 14 + React Server Components integradas a APIs, bancos e serviços de IA.',
    deliverables: ['Design System', 'APIs escaláveis', 'Testes e2e'],
    badge: 'Product',
  },
  {
    title: 'Automação de Dados & AI Ops',
    description:
      'Pipelines que conectam dados, modelos e insights acionáveis com monitoramento contínuo.',
    deliverables: ['ETL/ELT', 'Model serving', 'Observabilidade'],
    badge: 'Data',
  },
  {
    title: 'Consultoria e Mentoria Técnica',
    description:
      'Acompanhamento semanal com squads para destravar decisões arquiteturais e acelerar entregas.',
    deliverables: ['Sessões remotas', 'Revisão de código', 'Roadmap trimestral'],
    badge: 'Advisory',
  },
]
