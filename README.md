# KDP Helper Bot

> Meet **Wade** — your friendly AI-style assistant that helps self-publishers on Amazon Kindle Direct Publishing (KDP) go from idea to launch-ready book: pick a book type, find a selling niche, generate AI-ready content and image prompts, and collect KDP resources — all in a guided, step-by-step flow.

A v0-generated Next.js web app with a neon-purple landing page, mock login/signup, a projects dashboard, and a multi-step "New Book Project" wizard. **Client-side only prototype** — all data is mocked locally; there is no backend, database, or real AI call. The prompt generator produces ready-to-paste prompts for external AI tools (ChatGPT, Midjourney, Stable Diffusion, etc.).

Live demo: https://girishlade111.github.io/kdp-helper-bot/

## Features

- **Wade mascot** — animated avatar + speech bubbles guiding you through every screen
- **Landing page** — neon-gradient hero explaining the Create → Prompt → Publish workflow
- **Login / Signup** — styled auth screens with a `?redirect=` flow (simulated, no real auth)
- **Dashboard** — project cards with book type, niche, progress bars, and last-updated info (mock data)
- **New Book Project wizard** (4 steps):
  1. **Book type selector** — Coloring Book, Journal, and more
  2. **Niche selector** — pick a trending selling niche for the chosen book type
  3. **Prompt generator** — generates copyable content prompts *and* image prompts tailored to the book type + niche, with refresh and copy-to-clipboard buttons
  4. **Resources & templates** — KDP specs, publishing checklists, and helpful templates
- **shadcn/ui + Radix** component library, Tailwind styling, dark theme, toast notifications

## Tech Stack

- **Next.js 15** (App Router, static export via `output: 'export'`)
- **React 19**, TypeScript
- **Tailwind CSS 3** + `tailwindcss-animate`
- **shadcn/ui** on Radix UI primitives (accordion, dialog, tabs, toast, tooltip, sidebar, …)
- `lucide-react` icons, `next-themes` (dark mode), `geist` font, `@vercel/analytics`
- No backend — 100% client-side

## Quick Start

Prerequisites: Node.js 18+ (npm recommended; the repo ships a `pnpm-lock.yaml`).

```bash
npm install --legacy-peer-deps   # or: pnpm install
npm run dev                      # dev server on http://localhost:3000
npm run build                    # static export → ./out
npm start                        # serves the production build (Node server)
```

To preview the static export locally:

```bash
npx serve out
```

## Project Structure

```
app/
  page.tsx                 # landing page (hero + feature cards)
  layout.tsx               # root layout, theme provider
  login/page.tsx           # mock login
  signup/page.tsx          # mock signup (Suspense-wrapped useSearchParams)
  dashboard/page.tsx       # projects dashboard (mock data)
  projects/new/page.tsx    # 4-step new-book wizard
components/
  wade-avatar.tsx          # Wade mascot avatar
  wade-speech-bubble.tsx   # Wade's speech bubble
  book-type-selector.tsx    # step 1
  niche-selector.tsx        # step 2
  prompt-generator.tsx      # step 3 (content + image prompt generator)
  resources-templates.tsx   # step 4
  neon-glow.tsx             # decorative glow
  ui/*                      # shadcn/ui primitives
hooks/, lib/               # toast hook, cn() util
public/                    # placeholder images
next.config.mjs            # static export + basePath for GitHub Pages
```

## Environment Variables

None — the app is fully static and runs without any configuration.

## Deployment

The app is a static export, so it can be hosted anywhere that serves static files:

- **GitHub Pages** — live at https://girishlade111.github.io/kdp-helper-bot/ (`gh-pages` branch, built from `next.config.mjs` with `basePath: '/kdp-helper-bot'`). If you deploy to a root domain (Vercel/Netlify) instead, **remove `basePath`** from `next.config.mjs` or asset paths will break.
- **Vercel** — `npm run build && vercel --prod` (the original v0 deployment target).
- **Any static host** — upload the `out/` directory.

## Roadmap ideas

- Real prompt generation via an LLM API (OpenAI / Anthropic) instead of template prompts
- Persist projects in a database (Neon/Supabase) with real authentication
- Export project as a KDP-ready PDF manuscript (trim size, margins, bleed)
- Live niche/trend data (Amazon Best Sellers scraping)

---

Built by Girish Lade — https://ladestack.in
