export type Recording = {
  id: string
  title: string
  customer: string
  duration: string
  recordedAt: string
  size: string
  thumbnail: string
  videoUrl: string
  tags: string[]
}

export const recordings: Recording[] = [
  {
    id: 'rec-001',
    title: 'Discovery Workshop - Plataforma ESG',
    customer: 'NovaBio Industriais',
    duration: '48:12',
    recordedAt: '2025-12-14T14:00:00Z',
    size: '1.2 GB',
    thumbnail: '/thumbnails/workshop-esg.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    tags: ['Workshop', 'ESG', 'Discovery'],
  },
  {
    id: 'rec-002',
    title: 'Demo Hub de Propostas Dinâmicas',
    customer: 'UpNext Ventures',
    duration: '32:19',
    recordedAt: '2025-11-02T10:30:00Z',
    size: '860 MB',
    thumbnail: '/thumbnails/demo-propostas.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    tags: ['Demo', 'Vendas', 'Next.js'],
  },
  {
    id: 'rec-003',
    title: 'Revisão Arquitetura IA Editorial',
    customer: 'Editora Horizonte',
    duration: '55:47',
    recordedAt: '2025-10-09T16:00:00Z',
    size: '1.6 GB',
    thumbnail: '/thumbnails/ia-editorial.jpg',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    tags: ['Arquitetura', 'IA', 'Azure'],
  },
]
