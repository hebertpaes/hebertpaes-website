import React, { useEffect, useMemo, useRef, useState } from "react";

// =============================================================
// PREVIEW-ONLY FILE (safe to render here)
// =============================================================
// Este arquivo mostra uma PRÉVIA funcional do layout (Home + Auth + cards de blog)
// sem dependências do Next.js. Os handlers apenas simulam requisições.
// Ao final você pode copiar e colar os componentes no seu projeto Next.js (App Router).

// ------------------------
// Dados fictícios p/ prévia
// ------------------------
// IMPORTANTE: usamos **apenas** estas 3 imagens inline (data URLs)
// para evitar prompts de permissão no preview e garantir carregamento.
const STABLE_IMAGES = {
  hp1: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
       <defs><linearGradient id='g1' x1='0' x2='1'><stop offset='0%' stop-color='#a78bfa'/><stop offset='100%' stop-color='#60a5fa'/></linearGradient></defs>
       <rect width='800' height='450' fill='url(#g1)'/>
       <text x='50%' y='50%'  dominant-baseline='middle' text-anchor='middle' font-family='system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' font-size='28' fill='white' opacity='0.9'>HP • Banner 01</text>
     </svg>`
  )}`,
  hp2: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
       <defs><linearGradient id='g2' x1='0' x2='1'><stop offset='0%' stop-color='#34d399'/><stop offset='100%' stop-color='#10b981'/></linearGradient></defs>
       <rect width='800' height='450' fill='url(#g2)'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' font-size='28' fill='white' opacity='0.9'>HP • Banner 02</text>
     </svg>`
  )}`,
  hp3: `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
       <defs><linearGradient id='g3' x1='0' x2='1'><stop offset='0%' stop-color='#f472b6'/><stop offset='100%' stop-color='#fb7185'/></linearGradient></defs>
       <rect width='800' height='450' fill='url(#g3)'/>
       <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' font-size='28' fill='white' opacity='0.9'>HP • Banner 03</text>
     </svg>`
  )}`,
};

// Fallback local (sem rede) caso o preview negue acesso ou a imagem falhe
const PLACEHOLDER_DATA_URL = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
     <defs><linearGradient id='g' x1='0' x2='1'><stop offset='0%' stop-color='#e2e8f0'/><stop offset='100%' stop-color='#f8fafc'/></linearGradient></defs>
     <rect width='800' height='450' fill='url(#g)'/>
     <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' font-size='20' fill='#475569'>Prévia — imagem não carregada</text>
   </svg>`
)}`;

// UID helper para prévia (fallback se randomUUID não existir)
function uid(){
  try { const c = (globalThis).crypto; if (c?.randomUUID) return c.randomUUID(); } catch {}
  return Math.random().toString(36).slice(2);
}

const samplePosts = [
  { slug: "hello-world", title: "Hello World", excerpt: "Boas-vindas ao blog!", coverImage: STABLE_IMAGES.hp1, publishedAt: new Date().toISOString() },
  { slug: "cloud-run-next", title: "Cloud Run + Next.js", excerpt: "Rodando Next no Google Cloud Run.", coverImage: STABLE_IMAGES.hp2, publishedAt: new Date().toISOString() },
  { slug: "auth-firestore", title: "Auth + Firestore", excerpt: "Sessões seguras, rate limit e auditoria.", coverImage: STABLE_IMAGES.hp3, publishedAt: new Date().toISOString() },
];

// =========================
// PREVIEW: Home + Auth + Blog
// =========================
export default function PreviewHome() {
  const [dark, setDark] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  return (
    <div className={dark ? "dark-mode min-h-screen bg-slate-950 text-slate-100" : "min-h-screen bg-gradient-to-b from-white to-slate-50"}>
      <Header dark={dark} toggle={()=>setDark(v=>!v)} openAuth={()=>setShowAuth(true)} />
      <ContrastStyles />

      {/* Custom Cache Loading Banner (prévia) */}
      <CacheBanner />

      <main className="container mx-auto px-4 max-w-6xl py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <Hero />
        <section id="midia-pip" className="w-full">
          <PodcastPiP />
          <div className="mt-4">
            <CacheControls />
          </div>
        </section>
      </main>

      <section className="container mx-auto px-4 max-w-6xl py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">Últimos artigos</h2>
          <a href="#" className="text-sm underline" onClick={(e)=>e.preventDefault()}>Ver todos</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePosts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      {/* ===== Mídia / Redes (prévia) ===== */}
      <section id="midia" className="container mx-auto px-4 max-w-6xl py-10">
        <MediaSection />
      </section>

      {/* ===== Chat AI (prévia) ===== */}
      <section id="chat" className="container mx-auto px-4 max-w-6xl py-10">
        <ChatPanel />
      </section>

      {/* ===== Administração (prévia) ===== */}
      <section id="admin" className="container mx-auto px-4 max-w-6xl py-12">
        <AdminPanel />
      </section>

      <Footer />

      {/* AUTH POPUP */}
      {showAuth && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={()=>setShowAuth(false)} />
          <div className="relative max-w-3xl w-full">
            <div className="absolute right-3 top-3 z-10">
              <button onClick={()=>setShowAuth(false)} className="rounded-full bg-white/90 px-3 py-1 border">Fechar</button>
            </div>
            <AuthPanel />
          </div>
        </div>
      )}
    </div>
  );
}

function Header({dark, toggle, openAuth}:{dark:boolean; toggle:()=>void; openAuth:()=>void}) {
  return (
    <header className={`sticky top-0 z-30 backdrop-blur border-b ${dark ? "bg-slate-900/70 border-slate-800" : "bg-white/70 border-slate-200/60"}`}> 
      <div className="container mx-auto px-4 max-w-6xl h-14 flex items-center justify-between">
        <a href="#" onClick={(e)=>e.preventDefault()} className="flex items-center gap-2 no-underline">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">HP</span>
          <span className="font-semibold">Hebert Paes</span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <a href="#" onClick={(e)=>{e.preventDefault(); openAuth();}} className="hover:opacity-80">Entrar / Cadastrar</a>
          <a href="#" onClick={(e)=>e.preventDefault()} className="hover:opacity-80">Blog</a>
          <a href="#admin" className="hover:opacity-80">Admin</a>
          <a href="#chat" className="hover:opacity-80">Chat</a>
          <button onClick={toggle} className="ml-2 rounded-full border px-3 py-1 text-xs">{dark ? '☀️ Claro' : '🌙 Escuro'}</button>
        </nav>
      </div>
    </header>
  );
}

function ContrastStyles(){
  return (
    <style>{`
      /* Text contrast */
      .dark-mode{color:#E5E7EB}
      .dark-mode .text-slate-600{color:#D6DEE9 !important}
      .dark-mode .text-slate-500{color:#B8C4D2 !important}
      .dark-mode .text-slate-400{color:#A7B4C3 !important}
      .dark-mode a{color:#E2E8F0}

      /* Cards & surfaces */
      .dark-mode .bg-white, .dark-mode .bg-slate-50{background:#0f172a !important}
      .dark-mode .bg-white/80{background:rgba(15,23,42,.80) !important}
      .dark-mode .bg-white/90{background:rgba(15,23,42,.90) !important}
      .dark-mode .border-slate-200{border-color:#334155 !important}
      .dark-mode .border-slate-300{border-color:#475569 !important}

      /* Inputs */
      .dark-mode input, .dark-mode select, .dark-mode textarea{
        background:#0b1220 !important;
        color:#E5E7EB !important;
        border-color:#475569 !important;
      }
      .dark-mode input::placeholder, .dark-mode textarea::placeholder{color:#9AA7B6 !important; opacity:1}

      /* Chat assistant bubble */
      .dark-mode .bg-white.border{background:#0f172a !important; border-color:#334155 !important}

      /* Hover tweaks */
      .dark-mode .hover\:bg-slate-50:hover{background:#111827 !important}

      /* Post date high-contrast */
      .dark-mode .post-date{color:#C8D2DF !important}
    `}</style>
  );
}

function Hero() {
  // Post com SLIDES no lugar do título + lista
  const slides = [
    {
      id: 'capa',
      title: 'Hello World — Slides',
      subtitle: 'Visão geral do projeto pessoal do Hebert',
      body: (
        <ul className="mt-4 space-y-1 text-sm text-slate-700">
          <li>• Blog + Admin + Chat (prévia local)</li>
          <li>• SEO e feeds prontos (na versão Next.js)</li>
          <li>• Integração com Cloud Run / Firestore</li>
        </ul>
      ),
      image: STABLE_IMAGES.hp1,
    },
    {
      id: 'stack',
      title: 'Stack técnica',
      subtitle: 'Next.js • Cloud Run • Firestore • Cloudflare',
      body: (
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {['Cloud Run + SSL gerenciado','Firestore (ADC)','CI/CD GitHub Actions','Cache via Cloudflare'].map((t)=> (
            <li key={t} className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 bg-white/80">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"/> {t}
            </li>
          ))}
        </ul>
      ),
      image: STABLE_IMAGES.hp2,
    },
    {
      id: 'arquitetura',
      title: 'Arquitetura',
      subtitle: 'Front (Next.js) • API • Banco • Cache/CDN',
      body: (
        <p className="mt-4 text-sm text-slate-700">
          Render estático com revalidação, autenticação por cookies httpOnly, logs e auditoria.
        </p>
      ),
      image: STABLE_IMAGES.hp3,
    },
    {
      id: 'deploy',
      title: 'Deploy & Operação',
      subtitle: 'Pipelines, ambientes e observabilidade',
      body: (
        <ol className="mt-4 list-decimal list-inside text-sm text-slate-700 space-y-1">
          <li>Build com Actions → container</li>
          <li>Deploy no Cloud Run (revisões)</li>
          <li>Cache em CDN + headers corretos</li>
        </ol>
      ),
      image: STABLE_IMAGES.hp1,
    },
  ];

  const [idx, setIdx] = React.useState(0);
  const total = slides.length;
  const go = (d:number) => setIdx((i)=> (i + d + total) % total);

  const s = slides[idx];

  return (
    <section className="space-y-4">
      <article className="rounded-3xl border border-slate-200 bg-white/90 overflow-hidden shadow-xl">
        <div className="relative">
          <div className="aspect-[16/9] sm:aspect-[21/9] bg-slate-100">
            {s.image ? (
              <img src={s.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full" />
            )}
          </div>
          {/* Controles */}
          <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-3">
            <button aria-label="Slide anterior" onClick={()=>go(-1)} className="rounded-full bg-white/90 border shadow px-3 py-2 text-sm">‹</button>
            <button aria-label="Próximo slide" onClick={()=>go(1)} className="rounded-full bg-white/90 border shadow px-3 py-2 text-sm">›</button>
          </div>
          {/* Dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {slides.map((_,i)=> (
              <button key={i} aria-label={`Ir para o slide ${i+1}`} onClick={()=>setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i===idx? 'w-6 bg-slate-900' : 'w-2 bg-slate-400/70'}`}/>
            ))}
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="text-xs text-slate-500">Post em slides</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{s.title}</h1>
          <p className="text-slate-600">{s.subtitle}</p>
          {s.body}
        </div>
      </article>
    </section>
  );
}

// ======= Cache UX (Prévia) =======
const CacheContext = React.createContext<{state: 'miss'|'hit'|'refresh', set:(s:'miss'|'hit'|'refresh')=>void}>({state:'hit', set: () => {}});

function CacheBanner() {
  const [state, setState] = useState<'miss'|'hit'|'refresh'>('hit');
  useEffect(() => {
    setState('hit');
    const t1 = setTimeout(() => setState('refresh'), 800);
    const t2 = setTimeout(() => setState('hit'), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <CacheContext.Provider value={{state, set: setState}}>
      <div className="sticky top-14 z-20">
        {state === 'miss' && (
          <div className="animate-pulse bg-amber-50 border-b border-amber-200 text-amber-800">
            <div className="max-w-6xl mx-auto px-4 py-2 text-sm">Carregando do servidor (cache MISS)…</div>
          </div>
        )}
        {state === 'refresh' && (
          <div className="bg-blue-50 border-b border-blue-200 text-blue-800">
            <div className="max-w-6xl mx-auto px-4 py-2 text-sm">⚡ Conteúdo do cache exibido — atualizando em segundo plano…</div>
          </div>
        )}
        {state === 'hit' && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800">
            <div className="max-w-6xl mx-auto px-4 py-2 text-sm">✅ Conteúdo atendido pelo cache (atualizado)</div>
          </div>
        )}
      </div>
    </CacheContext.Provider>
  );
}

function CacheControls() {
  const ctx = React.useContext(CacheContext);
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-3 text-sm flex items-center gap-3">
      <span className="font-medium">Simular cache:</span>
      <button onClick={()=>ctx.set('miss')} className={`px-2 py-1 rounded-md border ${ctx.state==='miss'?'bg-amber-100 border-amber-300':'border-slate-200'}`}>MISS</button>
      <button onClick={()=>ctx.set('refresh')} className={`px-2 py-1 rounded-md border ${ctx.state==='refresh'?'bg-blue-100 border-blue-300':'border-slate-200'}`}>REFRESH</button>
      <button onClick={()=>ctx.set('hit')} className={`px-2 py-1 rounded-md border ${ctx.state==='hit'?'bg-emerald-100 border-emerald-300':'border-slate-200'}`}>HIT</button>
      <span className="ml-auto opacity-70">(prévia)</span>
    </div>
  );
}

// ======= Podcast PiP (Prévia) =======
function PodcastPiP(){
  const videoRef = useRef(null);
  async function enterPiP(){
    try{
      // Só funciona se houver mídia tocando; na prévia pode não haver stream.
      // Mantemos a chamada como demonstração.
      // @ts-ignore
      if(videoRef.current && document.pictureInPictureEnabled){
        // @ts-ignore
        await videoRef.current.requestPictureInPicture();
      }
    }catch(err){
      console.warn('PiP indisponível no preview', err);
    }
  }
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Podcast / Vídeo (PiP)</h2>
        <div className="flex items-center gap-2 text-sm">
          <button onClick={enterPiP} className="rounded-md border px-3 py-1">Picture-in-Picture</button>
          <button className="rounded-md border px-3 py-1" onClick={(e)=>e.preventDefault()}>Assinar RSS</button>
        </div>
      </div>
      <div className="p-4 sm:p-6 grid grid-cols-1 gap-4">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
          <video ref={videoRef} controls poster={STABLE_IMAGES.hp1} className="w-full h-full object-cover">
            {/* Sem src na prévia (offline). Ao integrar, aponte para um .mp4 do seu bucket. */}
          </video>
        </div>
        <div className="text-sm text-slate-600">
          <p className="font-medium text-slate-800">Episódio #1 — Bem-vindo ao HebertCast</p>
          <p>Descrição curta do episódio. Integre YouTube/Spotify na versão real.</p>
        </div>
      </div>
    </div>
  );
}

// ======= Mídia / Redes (Prévia) =======
function MediaSection(){
  const [selected, setSelected] = useState({ youtube:true, instagram:true, tiktok:false, x:false, facebook:false });
  const toggle = (k)=> setSelected(s=>({ ...s, [k]: !s[k] }));
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center gap-3 flex-wrap">
        <h2 className="text-lg font-semibold mr-auto">Caixa de Mídia & Redes</h2>
        <div className="flex items-center gap-2 text-xs">
          {Object.keys(selected).map((k)=> (
            <label key={k} className="inline-flex items-center gap-1 border rounded-full px-2 py-1 bg-white">
              <input type="checkbox" checked={selected[k]} onChange={()=>toggle(k)} />
              <span className="capitalize">{k}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {selected.youtube && (
          <div className="rounded-xl border bg-white overflow-hidden">
            <div className="aspect-video bg-slate-100">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <div className="p-3 text-sm">YouTube (exemplo)</div>
          </div>
        )}
        {selected.instagram && (
          <div className="rounded-xl border bg-white overflow-hidden">
            <div className="aspect-video bg-slate-100 grid place-items-center text-slate-500 text-sm">Prévia Instagram</div>
            <div className="p-3 text-sm">Instagram (exemplo)</div>
          </div>
        )}
        {selected.tiktok && (
          <div className="rounded-xl border bg-white overflow-hidden">
            <div className="aspect-video bg-slate-100 grid place-items-center text-slate-500 text-sm">Prévia TikTok</div>
            <div className="p-3 text-sm">TikTok (exemplo)</div>
          </div>
        )}
        {selected.x && (
          <div className="rounded-xl border bg-white overflow-hidden">
            <div className="aspect-video bg-slate-100 grid place-items-center text-slate-500 text-sm">Prévia X/Twitter</div>
            <div className="p-3 text-sm">X (exemplo)
            </div>
          </div>
        )}
        {selected.facebook && (
          <div className="rounded-xl border bg-white overflow-hidden">
            <div className="aspect-video bg-slate-100 grid place-items-center text-slate-500 text-sm">Prévia Facebook</div>
            <div className="p-3 text-sm">Facebook (exemplo)</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ======= Admin (Prévia) =======
const sampleUsersAdmin = [
  { id: 'u1', email: 'admin@hebertpaes.com', role: 'admin', createdAt: new Date().toISOString() },
  { id: 'u2', email: 'user@hebertpaes.com', role: 'user', createdAt: new Date().toISOString() },
];
const sampleCategoriesAdmin = [
  { id: 'c1', name: 'Cloud', slug: 'cloud' },
  { id: 'c2', name: 'Dev', slug: 'dev' },
];
const sampleTagsAdmin = [
  { id: 't1', name: 'gcp', slug: 'gcp' },
  { id: 't2', name: 'nextjs', slug: 'nextjs' },
  { id: 't3', name: 'firestore', slug: 'firestore' },
];
const samplePagesAdmin = [
  { id: 'pg1', title: 'Sobre', slug: 'sobre', status: 'published' },
];
const samplePostsAdmin = [
  { id: 'p1', title: 'Hello World', slug: 'hello-world', status: 'published', categories: ['c2'], tags: ['t2'], publishedAt: new Date().toISOString() },
  { id: 'p2', title: 'Cloud Run + Next.js', slug: 'cloud-run-next', status: 'published', categories: ['c1'], tags: ['t1','t2'], publishedAt: new Date().toISOString() },
];

function AdminPanel(){
  const [tab, setTab] = useState('users');
  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white/90 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex items-center gap-3 flex-wrap">
        <h2 className="text-xl font-bold mr-auto">Administração</h2>
        {(['users','posts','categories','tags','pages','blockchain']).map((k) => (
          <button key={k} onClick={()=>setTab(k)}
            className={`px-3 py-1.5 rounded-full border text-sm ${tab===k? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 bg-white'}`}>
            {k==='users'?'Usuários':k==='posts'?'Posts':k==='categories'?'Categorias':k==='tags'?'Tags':k==='pages'?'Páginas':'Blockchain'}
          </button>
        ))}
        <span className="ml-2 text-xs text-slate-500">(prévia)</span>
      </div>
      <div className="p-6">
        {tab==='users' && <UsersAdmin/>}
        {tab==='posts' && <PostsAdmin/>}
        {tab==='categories' && <CategoriesAdmin/>}
        {tab==='tags' && <TagsAdmin/>}
        {tab==='pages' && <PagesAdmin/>}
        {tab==='blockchain' && <BlockchainAdminPreview/>}
      </div>
    </div>
  );
}

function UsersAdmin(){
  const [items, setItems] = useState(sampleUsersAdmin);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  function add(e){ e.preventDefault(); if(!email) return; setItems(prev=>[{ id: uid(), email, role, createdAt: new Date().toISOString() }, ...prev]); setEmail(''); setRole('user'); }
  function del(id){ setItems(prev=>prev.filter(i=>i.id!==id)); }
  return (
    <div>
      <h3 className="font-semibold mb-3">Usuários</h3>
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@exemplo.com" className="flex-1 rounded-xl border px-3 py-2"/>
        <select value={role} onChange={e=>setRole(e.target.value)} className="rounded-xl border px-3 py-2">
          <option value="admin">admin</option>
          <option value="editor">editor</option>
          <option value="user">user</option>
        </select>
        <button className="rounded-xl bg-slate-900 text-white px-4">Adicionar</button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-500"><th className="py-2 pr-4">E-mail</th><th className="py-2 pr-4">Função</th><th className="py-2 pr-4">Criado</th><th></th></tr></thead>
          <tbody>
            {items.map(u=> (
              <tr key={u.id} className="border-t">
                <td className="py-2 pr-4">{u.email}</td>
                <td className="py-2 pr-4">{u.role}</td>
                <td className="py-2 pr-4">{new Date(u.createdAt).toLocaleString()}</td>
                <td className="py-2 text-right"><button onClick={()=>del(u.id)} className="text-red-600 underline">remover</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PostsAdmin(){
  const [items, setItems] = useState(samplePostsAdmin);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('draft');
  const [cats, setCats] = useState('');
  const [tags, setTags] = useState('');
  function add(e){ e.preventDefault(); if(!title||!slug) return; setItems(prev=>[{ id: uid(), title, slug, status, categories: cats.split(',').map(s=>s.trim()).filter(Boolean), tags: tags.split(',').map(s=>s.trim()).filter(Boolean), publishedAt: new Date().toISOString() }, ...prev]); setTitle(''); setSlug(''); setStatus('draft'); setCats(''); setTags(''); }
  function del(id){ setItems(prev=>prev.filter(i=>i.id!==id)); }
  return (
    <div>
      <h3 className="font-semibold mb-3">Posts</h3>
      <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-6 gap-2 mb-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" className="rounded-xl border px-3 py-2 sm:col-span-2"/>
        <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug-exemplo" className="rounded-xl border px-3 py-2"/>
        <select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl border px-3 py-2">
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        <input value={cats} onChange={e=>setCats(e.target.value)} placeholder="categorias (ids, vírgula)" className="rounded-xl border px-3 py-2"/>
        <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags (ids, vírgula)" className="rounded-xl border px-3 py-2"/>
        <button className="rounded-xl bg-slate-900 text-white px-4 py-2 sm:col-span-6">Adicionar</button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-500"><th className="py-2 pr-4">Título</th><th className="py-2 pr-4">Slug</th><th className="py-2 pr-4">Status</th><th className="py-2 pr-4">Categorias</th><th className="py-2 pr-4">Tags</th><th></th></tr></thead>
          <tbody>
            {items.map(p=> (
              <tr key={p.id} className="border-t">
                <td className="py-2 pr-4">{p.title}</td>
                <td className="py-2 pr-4">{p.slug}</td>
                <td className="py-2 pr-4">{p.status}</td>
                <td className="py-2 pr-4">{(p.categories||[]).join(', ')}</td>
                <td className="py-2 pr-4">{(p.tags||[]).join(', ')}</td>
                <td className="py-2 text-right"><button onClick={()=>del(p.id)} className="text-red-600 underline">remover</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoriesAdmin(){
  const [items, setItems] = useState(sampleCategoriesAdmin);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  function add(e){ e.preventDefault(); if(!name||!slug) return; setItems(prev=>[{ id: uid(), name, slug }, ...prev]); setName(''); setSlug(''); }
  function del(id){ setItems(prev=>prev.filter(i=>i.id!==id)); }
  return (
    <div>
      <h3 className="font-semibold mb-3">Categorias</h3>
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" className="rounded-xl border px-3 py-2"/>
        <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug" className="rounded-xl border px-3 py-2"/>
        <button className="rounded-xl bg-slate-900 text-white px-4">Adicionar</button>
      </form>
      <ul className="divide-y">
        {items.map(c => (
          <li key={c.id} className="py-2 flex items-center justify-between"><span>{c.name} <span className="text-slate-400">/ {c.slug}</span></span><button onClick={()=>del(c.id)} className="text-red-600 underline">remover</button></li>
        ))}
      </ul>
    </div>
  );
}

function TagsAdmin(){
  const [items, setItems] = useState(sampleTagsAdmin);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  function add(e){ e.preventDefault(); if(!name||!slug) return; setItems(prev=>[{ id: uid(), name, slug }, ...prev]); setName(''); setSlug(''); }
  function del(id){ setItems(prev=>prev.filter(i=>i.id!==id)); }
  return (
    <div>
      <h3 className="font-semibold mb-3">Tags</h3>
      <form onSubmit={add} className="flex flex-col sm:flex-row gap-2 mb-4">
        <input value={name} onChange={e=>setName(e.target value)} placeholder="Nome" className="rounded-xl border px-3 py-2"/>
        <input value={slug} onChange={e=>setSlug(e.target value)} placeholder="slug" className="rounded-xl border px-3 py-2"/>
        <button className="rounded-xl bg-slate-900 text-white px-4">Adicionar</button>
      </form>
      <ul className="divide-y">
        {items.map(t => (
          <li key={t.id} className="py-2 flex items-center justify-between"><span>{t.name} <span className="text-slate-400">/ {t.slug}</span></span><button onClick={()=>del(t.id)} className="text-red-600 underline">remover</button></li>
        ))}
      </ul>
    </div>
  );
}

function PagesAdmin(){
  const [items, setItems] = useState(samplePagesAdmin);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('draft');
  function add(e){ e.preventDefault(); if(!title||!slug) return; setItems(prev=>[{ id: uid(), title, slug, status }, ...prev]); setTitle(''); setSlug(''); setStatus('draft'); }
  function del(id){ setItems(prev=>prev.filter(i=>i.id!==id)); }
  return (
    <div>
      <h3 className="font-semibold mb-3">Páginas</h3>
      <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" className="rounded-xl border px-3 py-2"/>
        <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug" className="rounded-xl border px-3 py-2"/>
        <select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-xl border px-3 py-2">
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        <button className="rounded-xl bg-slate-900 text-white px-4">Adicionar</button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-500"><th className="py-2 pr-4">Título</th><th className="py-2 pr-4">Slug</th><th className="py-2 pr-4">Status</th><th></th></tr></thead>
          <tbody>
            {items.map(p=> (
              <tr key={p.id} className="border-t">
                <td className="py-2 pr-4">{p.title}</td>
                <td className="py-2 pr-4">{p.slug}</td>
                <td className="py-2 pr-4">{p.status}</td>
                <td className="py-2 text-right"><button onClick={()=>del(p.id)} className="text-red-600 underline">remover</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ======= Blockchain (Prévia) =======
function BlockchainAdminPreview(){
  const [pub, setPub] = useState();
  const [prv, setPrv] = useState();
  const [slug, setSlug] = useState('hello-world');
  const [hash, setHash] = useState('sha256-do-conteudo');
  const [mempool, setMempool] = useState([]);
  const [blocks, setBlocks] = useState([]);

  function generateKeys(){
    setPub('-----BEGIN PUBLIC KEY-----\nPREVIEW-PUBLIC-KEY\n-----END PUBLIC KEY-----');
    setPrv('-----BEGIN PRIVATE KEY-----\nPREVIEW-PRIVATE-KEY\n-----END PRIVATE KEY-----');
  }
  function addTx(e){ e.preventDefault(); setMempool(prev=>[{ id: Math.random().toString(36).slice(2), type:'notarizePost', payload:{ slug, contentHash: hash }, timestamp: Date.now() }, ...prev]); }
  function mine(){ if(mempool.length===0) return; const tx = mempool.slice(0,5); const block = { height: blocks.length, hash: Math.random().toString(16).slice(2), tx, timestamp: Date.now() }; setBlocks(prev=>[block, ...prev]); setMempool(prev=>prev.slice(tx.length)); }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-4 bg-white/90">
        <h3 className="font-semibold mb-2">Chave do proponente (prévia)</h3>
        <p className="text-sm text-slate-600 mb-3">Gere um par de chaves para assinar blocos (apenas demonstração — a versão real fica no servidor).</p>
        <div className="flex gap-2 mb-3">
          <button onClick={generateKeys} className="rounded-xl bg-slate-900 text-white px-4 py-2">Gerar chaves</button>
          {pub && <button onClick={()=>navigator.clipboard.writeText(pub)} className="rounded-xl border px-3">Copiar pública</button>}
          {prv && <button onClick={()=>navigator.clipboard.writeText(prv)} className="rounded-xl border px-3">Copiar privada</button>}
        </div>
        {pub && (<pre className="text-xs whitespace-pre-wrap p-2 bg-slate-50 rounded border mb-2">{pub}</pre>)}
        {prv && (<pre className="text-xs whitespace-pre-wrap p-2 bg-slate-50 rounded border">{prv}</pre>)}
      </div>

      <div className="rounded-2xl border p-4 bg-white/90">
        <h3 className="font-semibold mb-2">Enviar transação (notarizar post)</h3>
        <form onSubmit={addTx} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug" className="rounded-xl border px-3 py-2"/>
          <input value={hash} onChange={e=>setHash(e.target.value)} placeholder="sha256 do conteúdo" className="rounded-xl border px-3 py-2 sm:col-span-2"/>
          <button className="rounded-xl bg-indigo-600 text-white px-4 py-2">Enviar</button>
        </form>
      </div>

      <div className="rounded-2xl border p-4 bg-white/90">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Mempool</h3>
          <button onClick={mine} className="rounded-xl bg-emerald-600 text-white px-3 py-1.5">Minerar bloco</button>
        </div>
        <ul className="divide-y text-sm">
          {mempool.map(m => (
            <li key={m.id} className="py-2 flex items-center justify-between"><span>{m.payload.slug}</span><span className="text-slate-500">{new Date(m.timestamp).toLocaleTimeString()}</span></li>
          ))}
          {mempool.length===0 && <li className="py-2 text-slate-500">(vazio)</li>}
        </ul>
      </div>

      <div className="rounded-2xl border p-4 bg-white/90">
        <h3 className="font-semibold mb-2">Blocos</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-slate-500"><th className="py-2 pr-4">Altura</th><th className="py-2 pr-4">Hash</th><th className="py-2 pr-4">TX</th><th className="py-2 pr-4">Quando</th></tr></thead>
            <tbody>
              {blocks.map(b => (
                <tr key={b.hash} className="border-t">
                  <td className="py-2 pr-4">{b.height}</td>
                  <td className="py-2 pr-4 font-mono text-xs break-all">{b.hash}</td>
                  <td className="py-2 pr-4">{b.tx?.length ?? 0}</td>
                  <td className="py-2 pr-4">{new Date(b.timestamp).toLocaleString()}</td>
                </tr>
              ))}
              {blocks.length===0 && (
                <tr><td colSpan={4} className="py-2 text-slate-500">(nenhum bloco ainda)</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ======= Chat (Prévia) =======
function ChatBubble({msg}){
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser?'justify-end':''}`}>
      <div className={`${isUser?'bg-slate-900 text-white':'bg-white border'} max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap`}>
        {!isUser && <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">assistant</div>}
        {msg.content}
      </div>
    </div>
  );
}

function ChatPanel(){
  const [model,setModel] = useState('gpt');
  const [messages,setMessages] = useState([{id:uid(), role:'assistant', content:'Olá! Sou seu agente de chat. Como posso ajudar?'}]);
  const [input,setInput] = useState('');
  const [streamingId,setStreamingId]= useState();
  const bottomRef = useRef(null);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[messages, streamingId]);

  function send(text){
    const content = (text ?? input).trim();
    if(!content) return;
    const um = {id:uid(), role:'user', content};
    setMessages(prev=>[...prev, um]);
    setInput('');
    const aid = uid();
    setStreamingId(aid);
    const target = [
      `(${model.toUpperCase()}) Entendi: "${content}".`,
      '',
      'Resumo:',
      '- Este é um chat de prévia local.',
      '- Nenhuma chamada externa é feita.',
      '',
      'Próximos passos:',
      '1) Conectar sua API real (Gemini/GPT/Meta/DeepSeek/etc).',
      '2) Proteger com autenticação.',
      '3) Registrar logs e latência.',
      '',
      'Dica: use o agente de busca integrado em /agente_busca_integrado.html para levantar fontes.'
    ].join('\n');
    let i=0; let t;
    const tick = () => {
      i += Math.max(3, Math.floor(target.length/40));
      const partial = target.slice(0,i);
      setMessages(prev=>{
        const others = prev.filter(m=>m.id!==aid);
        const current = prev.find(m=>m.id===aid);
        const a = current ?? {id:aid, role:'assistant', content:''};
        a.content = partial;
        return [...others, a];
      });
      if(i < target.length) { t = setTimeout(tick, 30); } else { setStreamingId(undefined); }
    };
    t = setTimeout(tick, 120);
  }

  function onSubmit(e){ e.preventDefault(); send(); }
  function clear(){ setMessages([{id:uid(), role:'assistant', content:'Conversa limpa. O que deseja saber agora?'}]); }

  const quick = [
    'Como publicar Next.js no Cloud Run?',
    'O que é ISR e como cachear no Cloudflare?',
    'Gere um robots.txt e sitemap para meu blog.'
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center gap-2 flex-wrap">
        <h2 className="text-lg font-semibold mr-auto">Chat AI (prévia)</h2>
        <label className="text-sm">Modelo:&nbsp;
          <select value={model} onChange={e=>setModel(e.target.value)} className="border rounded-md px-2 py-1">
            <option value="gpt">GPT</option>
            <option value="gemini">Gemini</option>
            <option value="meta">Meta</option>
            <option value="deepseek">DeepSeek</option>
            <option value="mistral">Mistral</option>
            <option value="manus">Manus</option>
          </select>
        </label>
        <button onClick={clear} className="text-sm border rounded-md px-3 py-1">Limpar</button>
      </div>

      <div className="p-4 sm:p-6 max-h-[60vh] overflow-auto space-y-3 bg-gradient-to-b from-white/60 to-white">
        {messages.map(m => <ChatBubble key={m.id} msg={m} />)}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 sm:px-6 pb-4">
        <div className="flex gap-2 flex-wrap mb-2">
          {quick.map(q => (
            <button key={q} onClick={()=>send(q)} className="text-xs px-2 py-1 rounded-full border hover:bg-slate-50">{q}</button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Pergunte algo (prévia, sem chamadas externas)…" className="flex-1 rounded-xl border px-3 py-2"/>
          <button className="rounded-xl bg-slate-900 text-white px-4">Enviar</button>
        </form>
        <p className="text-xs text-slate-500 mt-2">Esta é uma simulação local de chat (sem rede). A versão real deve chamar suas APIs/LLMs.</p>
      </div>
    </div>
  );
}

function Footer(){
  return (
    <footer className="border-t border-slate-200 mt-16 py-8">
      <div className="container mx-auto px-4 max-w-6xl text-center text-sm text-slate-600">
        <p>© 2024 Hebert Paes. Plataforma pessoal com Next.js e Cloud Run.</p>
      </div>
    </footer>
  );
}
