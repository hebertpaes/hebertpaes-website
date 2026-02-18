export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
  tags: string[]
  content: string[]
}

export const posts: Post[] = [
  {
    slug: 'design-sistemas-inteligentes',
    title: 'Design de sistemas inteligentes centrados no negócio',
    excerpt:
      'Como conectar fundamentos de arquitetura com expectativas reais das áreas de negócio na era da IA generativa.',
    date: '2025-01-15',
    readingTime: '7 min',
    tags: ['Arquitetura', 'IA', 'Produto'],
    content: [
      'Transformar IA em valor concreto exige mais do que entrosar APIs. Envolve alinhar dados, compliance e timing de negócio.',
      'Para projetos corporativos, começo sempre por mapear decisões irreversíveis: onde os dados vivem, quem governa o conhecimento e quais são os limites de risco aceitos.',
      'Com isso em mãos, o design passa a ser um exercício de priorizar jornadas que entregam sinais rápidos de valor. Dá para pilotar modelos menores, monitorar o custo por resposta e, só depois, escalar.',
    ],
  },
  {
    slug: 'observabilidade-para-frontends',
    title: 'Observabilidade prática para front-ends que importam',
    excerpt:
      'Ferramentas e indicadores que vão além de logs básicos para entender como usuários realmente percebem sua aplicação.',
    date: '2024-11-02',
    readingTime: '6 min',
    tags: ['Observabilidade', 'Frontend', 'Azure'],
    content: [
      'Quando um front fica lento, quase nunca é culpa de um único componente. Costuma ser a soma de fontes de dados, caching e cortes visuais que pioram a experiência.',
      'Adotar RUM com Application Insights, sintetizar KPIs em dashboards e criar alertas baseados em percentis é o combo mínimo para dormir tranquilo.',
      'Também recomendo instrumentar eventos customizados. Assim você entende quais features derrubam métricas antes que o suporte descubra.',
    ],
  },
  {
    slug: 'playbook-deploy-azure-static-web-apps',
    title: 'Meu playbook de deploy no Azure Static Web Apps',
    excerpt:
      'Checklist enxuto para quem quer pipelines de Next.js rápidos em ambientes corporativos sem abrir mão de backup e métricas.',
    date: '2024-08-19',
    readingTime: '5 min',
    tags: ['DevOps', 'Azure SWA', 'Next.js'],
    content: [
      'Azure Static Web Apps é perfeito para sites híbridos com APIs serverless. O segredo está em tratar o deploy como parte do produto.',
      'Eu sempre salvo o `out/` como artefato, empurro para Blob Storage e só depois aciono o upload para o SWA. Isso cria uma trilha auditável.',
      'Feche com alertas conectados ao Checkly e Slack. Deploy é só o começo do ciclo de vida.',
    ],
  },
]

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug)
