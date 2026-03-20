# FactoryTalk Optix — Apresentação Técnica

Site de apresentação técnica interativa da plataforma FactoryTalk Optix, construído com Next.js 14, TypeScript e Tailwind CSS.

## Stack

- **Next.js 14** (App Router)
- **TypeScript 5**
- **Tailwind CSS 3**
- **Framer Motion** (animações)
- **Recharts** (gráficos HMI)
- **Supabase** (opcional — simulação local por padrão)
- **Vercel** (deploy)

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Hero + Overview + Pilares + Casos de uso |
| `/features` | 6 abas técnicas: Colaboração, NetLogic C#, Protocolos, Deploy, Dados, Segurança |
| `/architecture` | Diagrama SVG interativo com 4 camadas (Cloud/Edge/Machine/Field) |
| `/portfolio` | Suite de 5 produtos com specs e comparativo |
| `/demo` | HMI simulado, OPC UA Browser, Alarmes, NetLogic preview |
| `/resources` | Docs, downloads, changelog |

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

## Variáveis de ambiente (opcionais)

Copie `.env.local.example` para `.env.local` e preencha com suas credenciais Supabase.
O site funciona completamente sem Supabase, usando simulação de dados local.

## Deploy

Deploy automático via Vercel ao fazer push para `main`.

---

> ⚠ Apresentação técnica independente, não oficial.  
> FactoryTalk® e Optix® são marcas registradas da Rockwell Automation, Inc.
