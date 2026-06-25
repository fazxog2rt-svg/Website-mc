# SkyForge - Premium Minecraft Skyblock Portal

> **Forge Your Island, Build Your Legacy.**

A production-ready, full-stack Minecraft Skyblock server portal built with Next.js 15, TypeScript, and a premium glassmorphism UI.

## ✨ Features

- 🏝️ **Landing Page** — Animated hero, floating islands, particle effects, statistics, FAQ
- 🏪 **Store** — Ranks, SkyCoins, Crate Keys, Cosmetics (WhatsApp checkout)
- 🗳️ **Vote** — 6 vote sites, streak rewards, milestone tracking
- 🏆 **Leaderboard** — Real-time Island Value, Balance, Skills, Votes, Playtime
- 👤 **Player Lookup** — Search by Minecraft username, skin viewer, stats
- 📖 **Wiki** — Categorized knowledge base with search
- 📰 **News** — Updates, events, changelogs, maintenance notices
- ⚡ **Features** — Complete feature showcase with 8 categories
- 🌐 **Community** — Discord, Instagram, YouTube, TikTok + gallery
- 📊 **Server Status** — Live ping, player count, TPS, uptime
- 🔐 **Dashboard** — Player profile, skill progress, tickets, purchases
- 🛡️ **Admin Panel** — Analytics, player management, orders, audit logs

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI + custom shadcn pattern |
| Animations | Framer Motion |
| Database | PostgreSQL + Prisma v7 |
| Auth | NextAuth.js v5 (Discord + Microsoft) |
| Forms | React Hook Form + Zod |
| State | React Query |
| Email | Resend |

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <repo-url>
cd skyforge
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/skyforge"
AUTH_SECRET="your-secret"
AUTH_DISCORD_ID="..."
AUTH_DISCORD_SECRET="..."
AUTH_MICROSOFT_ENTRA_ID_ID="..."
AUTH_MICROSOFT_ENTRA_ID_SECRET="..."
NEXT_PUBLIC_SERVER_IP="play.skyforge.id"
NEXT_PUBLIC_WHATSAPP_STORE="https://wa.me/message/BPHTIEBSHUBIF1?src=qr"
```

### 3. Database Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin panel
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Player dashboard
│   ├── features/          # Features showcase
│   ├── leaderboard/       # Player rankings
│   ├── news/              # News & updates
│   ├── player/            # Player lookup
│   ├── community/         # Community hub
│   ├── status/            # Server status
│   ├── store/             # Item store
│   ├── vote/              # Vote sites
│   └── wiki/              # Knowledge base
├── components/
│   ├── home/              # Landing page sections
│   ├── layout/            # Navbar, Footer, StatusBar
│   ├── shared/            # Reusable components
│   └── ui/                # Base UI components
├── lib/                   # Utilities, DB, auth, constants
└── types/                 # TypeScript type definitions
```

## 🎨 Design System

- **Primary**: Sky Blue `#0ea5e9`
- **Secondary**: Purple `#8b5cf6`  
- **Accent**: Gold `#eab308`
- **Background**: Dark Navy `#050a14`
- **Style**: Glassmorphism, glow effects, smooth animations

## 🔧 Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret key |
| `AUTH_DISCORD_ID` | Discord OAuth client ID |
| `AUTH_DISCORD_SECRET` | Discord OAuth secret |
| `AUTH_MICROSOFT_ENTRA_ID_ID` | Microsoft OAuth client ID |
| `AUTH_MICROSOFT_ENTRA_ID_SECRET` | Microsoft OAuth secret |
| `NEXT_PUBLIC_SERVER_IP` | Minecraft server IP |
| `NEXT_PUBLIC_WHATSAPP_STORE` | WhatsApp store link |

## 📝 License

© 2025 SkyForge. All rights reserved.
