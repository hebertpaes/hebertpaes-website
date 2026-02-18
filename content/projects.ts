export type Project = {
  title: string
  slug: string
  description: string
  impact: string
  stack: string[]
  year: string
  link: string
  category: string
}

export const projects: Project[] = [
  {
    title: 'Observatório de Dados Urbanos',
    slug: 'observatorio-dados-urbanos',
    description:
      'Painel interativo que consolida dados públicos e privados para orientar decisões sobre mobilidade e políticas municipais.',
    impact: 'Reduziu o tempo de análise de relatórios de 3 dias para 40 minutos.',
    stack: ['Next.js', 'Azure Functions', 'PostgreSQL', 'Power BI Embedded'],
    year: '2024',
    link: 'https://hebertpaes.com/projects/observatorio-dados-urbanos',
    category: 'Smart Cities',
  },
  {
    title: 'Pipeline de Conteúdo com IA Generativa',
    slug: 'pipeline-conteudo-ia',
    description:
      'Automação que usa IA generativa para criar, revisar e publicar artigos técnicos com validação humana e versionamento.',
    impact: 'Aumentou em 3x a cadência de publicação sem sacrificar qualidade editorial.',
    stack: ['Next.js', 'Azure OpenAI', 'GitHub Actions', 'Azure Static Web Apps'],
    year: '2025',
    link: 'https://hebertpaes.com/projects/pipeline-conteudo-ia',
    category: 'Conteúdo & Automação',
  },
  {
    title: 'Hub de Propostas Interativas',
    slug: 'hub-propostas-interativas',
    description:
      'Ferramenta para consultorias apresentarem propostas vivas com métricas, modelos financeiros e comentários em tempo real.',
    impact: 'Taxa de aprovação de novos projetos subiu 28% após adoção do hub.',
    stack: ['Next.js', 'Azure Cosmos DB', 'Clerk', 'Tailwind'],
    year: '2024',
    link: 'https://hebertpaes.com/projects/hub-propostas-interativas',
    category: 'Vendas Enterprise',
  },
  {
    title: 'Radar ESG para Indústrias',
    slug: 'radar-esg-industrias',
    description:
      'Dashboard que cruza indicadores operacionais com parâmetros ESG e gera alertas automatizados.',
    impact: 'Redução de 35% em não-conformidades durante auditorias externas.',
    stack: ['Next.js', 'Azure Event Grid', 'Kusto', 'D3.js'],
    year: '2023',
    link: 'https://hebertpaes.com/projects/radar-esg-industrias',
    category: 'Sustentabilidade',
  },
]
