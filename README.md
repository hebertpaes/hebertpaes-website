# hebertpaes.com

Site oficial de Hebert Paes — full stack developer & cloud architect — construído com **Next.js 14 (App Router)**, Tailwind CSS v4 e design responsivo.

## Páginas
- `/` — homepage com hero, sobre, projetos, serviços, blog e contato integrado
- `/projects` — grid completo do portfólio
- `/services` — ofertas e entregáveis
- `/blog` — artigos; rotas dinâmicas em `/blog/[slug]`
- `/contact` — formulário dedicado
- `/dashboard` — listagem de gravações com player embutido e métricas rápidas
- `/sitemap.xml` e `/robots.txt` — SEO técnico

## Stack
- Next.js 14 + React Server Components
- Tailwind CSS v4 (inline `@theme` no `globals.css`)
- Componentes customizados em `components/`
- Conteúdo mockado em `content/` (inclui `recordings.ts` com metadados das gravações)
- Gerador de sitemap/robots nativo (`app/sitemap.ts`, `app/robots.ts`)

## Desenvolvimento
```bash
npm install
npm run dev
```
Acesse <http://localhost:3000>.

## Boas práticas atendidas
- Metadata avançada (`app/layout.tsx`)
- Design responsivo e acessível (classes utilitárias + contraste)
- Blog em rotas dinâmicas com `generateStaticParams`
- Formulário funcional via formsubmit.co (substitua por backend próprio se preferir)

## Deploy automático (Azure Static Web Apps)
O workflow `/.github/workflows/deploy-azure.yml` faz:
1. Build (`npm run build`) e export (`next export`) quando aplicável
2. Upload do artefato para o Azure Static Web Apps usando `AZURE_STATIC_WEB_APPS_API_TOKEN`
3. Passo extra para rodar testes/lint antes do deploy

Configure os seguintes segredos no GitHub:
- `AZURE_STATIC_WEB_APPS_API_TOKEN`
- `AZURE_STATIC_WEB_APPS_APP_LOCATION` (default `/`)
- `AZURE_STATIC_WEB_APPS_OUTPUT_LOCATION` (default `.next`)

## Próximos passos sugeridos
- Conectar CMS (Contentlayer, Sanity, etc.) para posts reais
- Substituir formsubmit por Azure Functions + Application Insights
- Integrar storage real (Azure Blob/S3) para as gravações do dashboard; basta atualizar `content/recordings.ts` com URLs reais e autenticação personalizada
- Gerar imagem OG real em `public/og-image.png`
